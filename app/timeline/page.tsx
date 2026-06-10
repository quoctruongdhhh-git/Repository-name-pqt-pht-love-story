'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { getAllEntries } from '@/lib/diary-storage';
import { getTimelineItems } from '@/lib/timeline-items';
import type { TimelineItem } from '@/lib/timeline-items';

const HEART = '\u2665';
const BUTTERFLY = '\ud83e\udd8b';
const BACK = '\u2190';
const ADD_MILESTONE = 'Th\u00eam c\u1ed9t m\u1ed1c';
const PAGE_TITLE = 'H\u00e0nh Tr\u00ecnh C\u1ee7a Ch\u00fang Ta';
const PAGE_SUBTITLE = 'M\u1ed7i c\u1ed9t m\u1ed1c l\u00e0 m\u1ed9t trang nh\u1ecf trong cu\u1ed1n nh\u1eadt k\u00fd t\u00ecnh y\u00eau.';
const PHOTO_FALLBACK = 'Kho\u1ea3nh kh\u1eafc ch\u01b0a c\u00f3 \u1ea3nh';
const CONTINUE_JOURNEY = 'Ti\u1ebfp t\u1ee5c cu\u1ed9c h\u00e0nh tr\u00ecnh c\u1ee7a ch\u00fang ta';
const OUR_MEMORIES = 'K\u00fd \u1ee9c c\u1ee7a ch\u00fang ta';
const BACK_HOME = 'Quay l\u1ea1i trang ch\u1ee7';
const EMOTION_LINES = [
  'N\u01a1i c\u00e2u chuy\u1ec7n b\u1eaft \u0111\u1ea7u b\u1eb1ng m\u1ed9t nh\u1ecbp tim r\u1ea5t kh\u1ebd.',
  'M\u1ed9t ng\u00e0y b\u00ecnh th\u01b0\u1eddng, nh\u01b0ng tr\u1edf th\u00e0nh m\u1ed9t k\u00fd \u1ee9c r\u1ea5t ri\u00eang.',
  'C\u00f3 nh\u1eefng kho\u1ea3nh kh\u1eafc nh\u1ecf l\u00e0m m\u00ecnh nh\u1edb m\u00e3i.',
  'T\u1eeb \u0111\u00e2y, h\u00e0nh tr\u00ecnh c\u00f3 th\u00eam m\u1ed9t l\u00fd do \u0111\u1ec3 m\u1ec9m c\u01b0\u1eddi.',
];

const futureCards = [
  {
    icon: '\ud83c\udf38',
    title: 'Chuy\u1ebfn du l\u1ecbch ti\u1ebfp theo',
  },
  {
    icon: '\ud83c\udfe1',
    title: 'Ng\u00f4i nh\u00e0 nh\u1ecf c\u1ee7a ch\u00fang ta',
  },
  {
    icon: '\ud83d\udc8d',
    title: 'M\u1ed9t ng\u00e0y th\u1eadt \u0111\u1eb7c bi\u1ec7t',
  },
];

const butterflies = [
  { left: '7%', top: '28%', delay: '0s', duration: '18s', size: 'text-3xl', opacity: 'opacity-42', drift: '28vw' },
  { left: '18%', top: '62%', delay: '4s', duration: '22s', size: 'text-2xl', opacity: 'opacity-34', drift: '22vw' },
  { left: '72%', top: '24%', delay: '2.4s', duration: '20s', size: 'text-3xl', opacity: 'opacity-38', drift: '-24vw' },
  { left: '84%', top: '58%', delay: '6.2s', duration: '24s', size: 'text-2xl', opacity: 'opacity-32', drift: '-20vw' },
  { left: '42%', top: '78%', delay: '8s', duration: '26s', size: 'text-xl', opacity: 'opacity-30', drift: '18vw' },
  { left: '5%', top: '46%', delay: '1.2s', duration: '19s', size: 'text-2xl', opacity: 'opacity-36', drift: '30vw' },
  { left: '12%', top: '82%', delay: '7.1s', duration: '23s', size: 'text-xl', opacity: 'opacity-28', drift: '26vw' },
  { left: '24%', top: '18%', delay: '3.4s', duration: '21s', size: 'text-2xl', opacity: 'opacity-32', drift: '20vw' },
  { left: '31%', top: '52%', delay: '9s', duration: '25s', size: 'text-3xl', opacity: 'opacity-30', drift: '-18vw' },
  { left: '38%', top: '34%', delay: '5.6s', duration: '20s', size: 'text-xl', opacity: 'opacity-36', drift: '16vw' },
  { left: '48%', top: '16%', delay: '10.2s', duration: '24s', size: 'text-2xl', opacity: 'opacity-30', drift: '-22vw' },
  { left: '54%', top: '68%', delay: '2.8s', duration: '22s', size: 'text-xl', opacity: 'opacity-32', drift: '21vw' },
  { left: '60%', top: '42%', delay: '6.8s', duration: '19s', size: 'text-3xl', opacity: 'opacity-28', drift: '-26vw' },
  { left: '66%', top: '84%', delay: '11.4s', duration: '27s', size: 'text-xl', opacity: 'opacity-26', drift: '-20vw' },
  { left: '76%', top: '12%', delay: '8.6s', duration: '21s', size: 'text-2xl', opacity: 'opacity-34', drift: '-18vw' },
  { left: '80%', top: '76%', delay: '13s', duration: '25s', size: 'text-xl', opacity: 'opacity-28', drift: '-24vw' },
  { left: '88%', top: '34%', delay: '4.8s', duration: '18s', size: 'text-3xl', opacity: 'opacity-32', drift: '-30vw' },
  { left: '92%', top: '66%', delay: '15s', duration: '26s', size: 'text-2xl', opacity: 'opacity-26', drift: '-22vw' },
  { left: '44%', top: '92%', delay: '16.2s', duration: '28s', size: 'text-xl', opacity: 'opacity-24', drift: '18vw' },
  { left: '57%', top: '7%', delay: '12s', duration: '23s', size: 'text-2xl', opacity: 'opacity-30', drift: '-16vw' },
];

export default function TimelinePage() {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);

  useEffect(() => {
    const loadTimeline = async () => {
      const entries = await getAllEntries();
      const allTimelineItems = getTimelineItems(entries);

      setTimelineItems(
        allTimelineItems.filter((item) => item.id.startsWith('memory-'))
      );
    };

    loadTimeline();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff3ff] pb-16 text-white">
      <CinematicBackground />

      <header className="sticky top-0 z-50 border-b border-white/45 bg-gradient-to-r from-[#b68ee5]/72 via-[#d7a4df]/68 to-[#f1abc7]/72 shadow-[0_12px_40px_rgba(126,34,206,0.12)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
          <Link href="/">
            <button className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xl text-rose-100 shadow-lg shadow-rose-950/20 transition hover:bg-white/18">
              {BACK}
            </button>
          </Link>

          <div className="min-w-0 text-center">
            <h1 className="text-xl font-black tracking-wide text-white drop-shadow-[0_3px_12px_rgba(88,28,135,0.34)] md:text-3xl">
              {PAGE_TITLE}
            </h1>
            <p className="mt-1 hidden text-sm font-semibold text-white/88 drop-shadow-[0_2px_8px_rgba(88,28,135,0.2)] sm:block">{PAGE_SUBTITLE}</p>
          </div>

          <Link href="/create">
            <button className="rounded-full bg-rose-400/90 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-rose-500/25 transition hover:-translate-y-0.5 hover:bg-rose-300 sm:text-sm">
              {ADD_MILESTONE}
            </button>
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4">
        <section className="relative py-12 md:py-20">
          <TimelinePath />

          <div className="relative z-10 space-y-12 md:space-y-24">
            {timelineItems.map((memory, index) => (
              <div
                key={memory.id}
                className="grid items-center gap-5 md:grid-cols-[1fr_118px_1fr] md:gap-10"
              >
                {index % 2 === 0 ? (
                  <>
                    <MemoryImage memory={memory} alignEnd />
                    <TimelineBadge index={index} icon={memory.icon} />
                    <MemoryCard memory={memory} index={index} />
                  </>
                ) : (
                  <>
                    <MemoryCard memory={memory} index={index} alignEnd />
                    <TimelineBadge index={index} icon={memory.icon} />
                    <MemoryImage memory={memory} />
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        <TimelineActions />

        <NextChapterSection />
      </main>

      <style jsx global>{`
        @keyframes heartBeat {
          0%,
          100% {
            transform: scale(1);
          }
          30% {
            transform: scale(1.18);
          }
          52% {
            transform: scale(0.96);
          }
          72% {
            transform: scale(1.1);
          }
        }

        @keyframes lavenderFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          45% {
            transform: translate3d(18px, -22px, 0) scale(1.08);
          }
          75% {
            transform: translate3d(-14px, 14px, 0) scale(0.98);
          }
        }

        @keyframes auroraDrift {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            opacity: 0.62;
          }
          35% {
            transform: translate3d(9vw, -4vh, 0) rotate(7deg) scale(1.1);
            opacity: 0.9;
          }
          70% {
            transform: translate3d(-5vw, 6vh, 0) rotate(-6deg) scale(0.96);
            opacity: 0.72;
          }
        }

        @keyframes shimmerSweep {
          0% {
            transform: translateX(0) rotate(12deg);
            opacity: 0;
          }
          18% {
            opacity: 0.78;
          }
          55% {
            opacity: 0.45;
          }
          100% {
            transform: translateX(330vw) rotate(12deg);
            opacity: 0;
          }
        }

        @keyframes butterflyFloat {
          0% {
            transform: translate3d(0, 0, 0) rotate(-8deg) scale(0.92);
            opacity: 0;
          }
          12% {
            opacity: 0.55;
          }
          34% {
            transform: translate3d(calc(var(--butterfly-drift) * 0.38), -34px, 0) rotate(10deg) scale(1.05);
          }
          62% {
            transform: translate3d(calc(var(--butterfly-drift) * 0.72), 28px, 0) rotate(-12deg) scale(0.96);
            opacity: 0.5;
          }
          100% {
            transform: translate3d(var(--butterfly-drift), -18px, 0) rotate(8deg) scale(1.08);
            opacity: 0;
          }
        }

        @keyframes glitterTrail {
          0% {
            transform: translate3d(0, 0, 0) scale(0.8);
            opacity: 0;
          }
          16% {
            opacity: 1;
          }
          42% {
            transform: translate3d(calc(var(--butterfly-drift) * 0.32 + var(--glitter-x)), calc(var(--glitter-y) + 34px), 0) scale(1.25);
            opacity: 0.95;
          }
          72% {
            transform: translate3d(calc(var(--butterfly-drift) * 0.64 + var(--glitter-x)), calc(var(--glitter-y) + 86px), 0) scale(0.95);
            opacity: 0.58;
          }
          100% {
            transform: translate3d(calc(var(--butterfly-drift) + var(--glitter-x)), calc(var(--glitter-y) + 132px), 0) scale(0.55);
            opacity: 0;
          }
        }

        @keyframes softTwinkle {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.92);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.16);
          }
        }
      `}</style>
    </div>
  );
}

function CinematicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5e9ff] via-[#fff2fb] to-[#fff9fd]" />
      <div className="absolute -left-1/4 top-[8%] h-[52vh] w-[82vw] rounded-full bg-gradient-to-r from-violet-200/70 via-fuchsia-100/58 to-transparent blur-3xl [animation:auroraDrift_16s_ease-in-out_infinite]" />
      <div className="absolute -right-1/4 top-[20%] h-[56vh] w-[82vw] rounded-full bg-gradient-to-l from-pink-200/58 via-violet-100/52 to-transparent blur-3xl [animation:auroraDrift_20s_ease-in-out_infinite_reverse]" />
      <div className="absolute left-[14%] bottom-[6%] h-[44vh] w-[72vw] rounded-full bg-gradient-to-r from-white/72 via-fuchsia-100/50 to-violet-100/42 blur-3xl [animation:auroraDrift_18s_ease-in-out_infinite]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.92),transparent_34%),radial-gradient(circle_at_16%_22%,rgba(221,214,254,0.72),transparent_31%),radial-gradient(circle_at_84%_56%,rgba(251,207,232,0.62),transparent_34%),radial-gradient(circle_at_50%_88%,rgba(245,208,254,0.48),transparent_34%)]" />
      <div className="absolute -left-[35%] top-0 h-full w-[45%] rotate-12 bg-gradient-to-r from-transparent via-white/38 to-transparent blur-2xl [animation:shimmerSweep_9s_ease-in-out_infinite]" />
      <div className="absolute inset-x-0 top-0 h-[52vh] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.66),transparent_42%)]" />
      <div className="absolute left-[6%] top-[12%] h-56 w-56 rounded-full bg-violet-200/56 blur-3xl [animation:lavenderFloat_14s_ease-in-out_infinite]" />
      <div className="absolute right-[4%] top-[28%] h-64 w-64 rounded-full bg-fuchsia-200/48 blur-3xl [animation:lavenderFloat_17s_ease-in-out_infinite_reverse]" />
      <div className="absolute left-[16%] bottom-[16%] h-60 w-60 rounded-full bg-pink-200/50 blur-3xl [animation:lavenderFloat_18s_ease-in-out_infinite]" />
      <div className="absolute right-[20%] bottom-[26%] h-48 w-48 rounded-full bg-indigo-200/42 blur-3xl [animation:lavenderFloat_16s_ease-in-out_infinite_reverse]" />
      <div className="absolute left-[7%] top-[22%] text-4xl text-violet-50/46 [animation:softTwinkle_4.5s_ease-in-out_infinite]">{HEART}</div>
      <div className="absolute right-[10%] top-[44%] text-3xl text-fuchsia-50/40 [animation:softTwinkle_5.8s_ease-in-out_infinite]">{HEART}</div>
      <div className="absolute left-[12%] bottom-[22%] text-5xl text-violet-100/32 [animation:softTwinkle_6.2s_ease-in-out_infinite]">{HEART}</div>
      <div className="absolute right-[18%] top-[18%] h-1.5 w-1.5 rounded-full bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.95)] [animation:softTwinkle_3.4s_ease-in-out_infinite]" />
      <div className="absolute left-[26%] top-[38%] h-1.5 w-1.5 rounded-full bg-violet-100/95 shadow-[0_0_20px_rgba(216,180,254,0.95)] [animation:softTwinkle_4.2s_ease-in-out_infinite]" />
      <div className="absolute right-[34%] bottom-[30%] h-1.5 w-1.5 rounded-full bg-fuchsia-100/90 shadow-[0_0_22px_rgba(244,114,182,0.82)] [animation:softTwinkle_5s_ease-in-out_infinite]" />
      <div className="absolute left-[42%] top-[14%] h-1 w-1 rounded-full bg-white/85 shadow-[0_0_18px_rgba(255,255,255,0.92)] [animation:softTwinkle_3.8s_ease-in-out_infinite]" />
      <div className="absolute right-[46%] bottom-[18%] h-1.5 w-1.5 rounded-full bg-violet-50/90 shadow-[0_0_20px_rgba(237,233,254,0.95)] [animation:softTwinkle_4.8s_ease-in-out_infinite]" />
      <div className="absolute left-[58%] top-[34%] h-2 w-2 rounded-full bg-white/80 shadow-[0_0_22px_rgba(255,255,255,0.95)] [animation:softTwinkle_2.9s_ease-in-out_infinite]" />
      <div className="absolute left-[12%] top-[58%] h-1.5 w-1.5 rounded-full bg-fuchsia-100/85 shadow-[0_0_20px_rgba(244,114,182,0.85)] [animation:softTwinkle_3.2s_ease-in-out_infinite]" />
      <div className="absolute right-[14%] top-[72%] h-1.5 w-1.5 rounded-full bg-violet-100/85 shadow-[0_0_20px_rgba(216,180,254,0.9)] [animation:softTwinkle_3.6s_ease-in-out_infinite]" />
      {butterflies.map((butterfly) => (
        <span key={`${butterfly.left}-${butterfly.top}`}>
          <span
            className={`absolute text-violet-300/80 drop-shadow-[0_0_16px_rgba(216,180,254,0.95)] ${butterfly.size} ${butterfly.opacity}`}
            style={{
              left: butterfly.left,
              top: butterfly.top,
              animation: `butterflyFloat ${butterfly.duration} ease-in-out ${butterfly.delay} infinite`,
              ['--butterfly-drift' as string]: butterfly.drift,
            }}
          >
            {BUTTERFLY}
          </span>
          {[0, 1, 2, 3, 4].map((sparkle) => (
            <span
              key={`${butterfly.left}-${butterfly.top}-sparkle-${sparkle}`}
              className="absolute h-2.5 w-2.5 rounded-full bg-gradient-to-br from-white via-amber-100 to-fuchsia-100 shadow-[0_0_18px_rgba(253,230,138,1),0_0_28px_rgba(244,114,182,0.65)]"
              style={{
                left: butterfly.left,
                top: butterfly.top,
                animation: `glitterTrail ${butterfly.duration} ease-in-out calc(${butterfly.delay} + ${sparkle * 0.32}s) infinite`,
                ['--butterfly-drift' as string]: butterfly.drift,
                ['--glitter-x' as string]: `${sparkle * 10 - 20}px`,
                ['--glitter-y' as string]: `${sparkle * 10 + 16}px`,
              }}
            />
          ))}
        </span>
      ))}
    </div>
  );
}

function TimelinePath() {
  return (
    <>
      <div className="absolute left-5 top-6 bottom-0 z-0 md:hidden">
        <div className="h-full w-2 rounded-full bg-gradient-to-b from-white via-rose-200 to-violet-100 shadow-[0_0_36px_rgba(251,113,133,0.62)]" />
      </div>

      <div className="absolute left-1/2 top-8 bottom-0 z-0 hidden -translate-x-1/2 md:block">
        <div className="absolute left-1/2 top-0 h-full w-28 -translate-x-1/2 rounded-full bg-white/16 blur-2xl" />
        <svg width="240" height="2600" viewBox="0 0 240 2600" className="h-full drop-shadow-[0_0_28px_rgba(244,114,182,0.36)]">
          <defs>
            <filter id="cinematicTimelineGlow" x="-80%" y="-10%" width="260%" height="120%">
              <feGaussianBlur stdDeviation="13" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="timelineRoad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#fff7ed" />
              <stop offset="34%" stopColor="#fbcfe8" />
              <stop offset="68%" stopColor="#ddd6fe" />
              <stop offset="100%" stopColor="#ffe4e6" />
            </linearGradient>
            <linearGradient id="timelineGlowLine" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="48%" stopColor="#f0abfc" />
              <stop offset="100%" stopColor="#c4b5fd" />
            </linearGradient>
          </defs>
          <path
            d="M120 0 C188 155 52 285 120 440 C188 595 52 725 120 880 C188 1035 52 1165 120 1320 C188 1475 52 1605 120 1760 C188 1915 52 2045 120 2200 C188 2355 52 2475 120 2600"
            stroke="#ffffff"
            strokeWidth="76"
            fill="none"
            strokeLinecap="round"
            filter="url(#cinematicTimelineGlow)"
            opacity="0.62"
          />
          <path
            d="M120 0 C188 155 52 285 120 440 C188 595 52 725 120 880 C188 1035 52 1165 120 1320 C188 1475 52 1605 120 1760 C188 1915 52 2045 120 2200 C188 2355 52 2475 120 2600"
            stroke="url(#timelineRoad)"
            strokeWidth="42"
            fill="none"
            strokeLinecap="round"
            opacity="0.82"
          />
          <path
            d="M120 0 C188 155 52 285 120 440 C188 595 52 725 120 880 C188 1035 52 1165 120 1320 C188 1475 52 1605 120 1760 C188 1915 52 2045 120 2200 C188 2355 52 2475 120 2600"
            stroke="url(#timelineGlowLine)"
            strokeWidth="13"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M120 0 C188 155 52 285 120 440 C188 595 52 725 120 880 C188 1035 52 1165 120 1320 C188 1475 52 1605 120 1760 C188 1915 52 2045 120 2200 C188 2355 52 2475 120 2600"
            stroke="#ffffff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.78"
          />
        </svg>
      </div>
    </>
  );
}

function TimelineBadge({ index, icon }: { index: number; icon: string }) {
  return (
    <div className="hidden justify-center md:flex">
      <div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border border-white/50 bg-gradient-to-br from-rose-300 via-rose-500 to-[#6f1d32] text-white shadow-[0_0_40px_rgba(251,113,133,0.55)] ring-8 ring-white/18 transition duration-300 hover:scale-105">
        <div className="absolute inset-0 rounded-full bg-white/15 blur-sm" />
        <div className="relative text-3xl">{icon}</div>
        <div className="relative text-sm font-black tracking-wider">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}

function MemoryImage({
  memory,
  alignEnd = false,
}: {
  memory: TimelineItem;
  alignEnd?: boolean;
}) {
  const imageToneClass =
    memory.id === 'memory-2'
      ? 'object-[50%_78%] brightness-[1.16] contrast-[1.04] saturate-[1.08]'
      : 'object-center';

  return (
    <div className={`pl-9 md:pl-0 ${alignEnd ? 'md:flex md:justify-end' : ''}`}>
      <div className="group w-full max-w-[620px] overflow-hidden rounded-[34px] border border-white/30 bg-white/15 shadow-[0_24px_70px_rgba(67,18,32,0.28)] backdrop-blur transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(251,113,133,0.28)] md:max-w-[500px]">
        {memory.image ? (
          <img
            src={memory.image}
            alt={memory.title}
            className={`h-72 w-full object-cover transition duration-700 group-hover:scale-[1.045] md:h-[360px] ${imageToneClass}`}
          />
        ) : (
          <div className="flex h-72 w-full flex-col items-center justify-center bg-gradient-to-br from-rose-200/70 via-pink-100/80 to-amber-100/70 text-center text-6xl text-rose-600 md:h-[360px]">
            <div>{memory.icon}</div>
            <div className="mt-4 text-sm font-semibold tracking-wide text-rose-700/70">
              {PHOTO_FALLBACK}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MemoryCard({
  memory,
  index,
  alignEnd = false,
}: {
  memory: TimelineItem;
  index: number;
  alignEnd?: boolean;
}) {
  const content = (
    <Card className="w-full border border-white/35 bg-white/78 p-5 text-[#4a1d29] shadow-[0_18px_55px_rgba(67,18,32,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/88 hover:shadow-[0_22px_70px_rgba(244,63,94,0.25)] md:max-w-[370px]">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-black tracking-wide text-rose-500 shadow-sm shadow-rose-200/60">
        <span>{memory.icon}</span>
        <span>{memory.date}</span>
      </div>

      <h2 className="text-2xl font-black leading-tight text-rose-800 md:text-3xl">{memory.title}</h2>

      <p className="mt-3 text-sm font-semibold italic leading-6 text-rose-500/85">
        {getEmotionLine(index)}
      </p>

      <p className="mt-4 line-clamp-4 text-sm leading-7 text-gray-600 md:text-base">
        {memory.desc}
      </p>
    </Card>
  );

  return (
    <div className={`pl-9 md:pl-0 ${alignEnd ? 'md:flex md:justify-end' : ''}`}>
      {memory.href ? (
        <Link href={memory.href} className="block w-full md:max-w-[370px]">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}

function TimelineActions() {
  return (
    <section className="relative z-10 mb-12 rounded-[36px] border border-white/55 bg-white/62 p-5 text-center shadow-[0_22px_80px_rgba(109,40,217,0.14)] backdrop-blur-xl md:p-7">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/create"
          className="mx-auto flex min-h-14 w-full max-w-xl items-center justify-center rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400 px-6 py-4 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_18px_50px_rgba(168,85,247,0.34)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(217,70,239,0.34)] sm:text-base"
        >
          {CONTINUE_JOURNEY}
        </Link>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link
            href="/album"
            className="rounded-full border border-white/70 bg-gradient-to-r from-violet-500 via-fuchsia-400 to-rose-400 px-5 py-3 text-sm font-black text-white shadow-[0_14px_38px_rgba(168,85,247,0.32),0_0_22px_rgba(244,114,182,0.22)] ring-1 ring-white/40 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_56px_rgba(168,85,247,0.4),0_0_30px_rgba(244,114,182,0.32)]"
          >
            {OUR_MEMORIES}
          </Link>
          <Link
            href="/"
            className="rounded-full border border-rose-100 bg-white/82 px-5 py-3 text-sm font-black text-rose-600 shadow-sm shadow-rose-100/70 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-rose-200/60"
          >
            {BACK_HOME}
          </Link>
        </div>
      </div>
    </section>
  );
}

function NextChapterSection() {
  return (
    <section className="relative z-10 mb-12 mt-2 text-center">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[42px] border border-white/45 bg-gradient-to-br from-[#fff7ed]/90 via-[#fff1f2]/88 to-[#ffe4e6]/90 px-6 py-12 text-[#4a1d29] shadow-[0_28px_100px_rgba(136,19,55,0.22)] backdrop-blur md:px-12">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-4xl text-rose-500 shadow-[0_0_45px_rgba(251,113,133,0.45)] [animation:heartBeat_1.8s_ease-in-out_infinite]">
          {HEART}
        </div>
        <h2 className="text-4xl font-black italic tracking-wide text-rose-800 md:text-5xl">
          To be continued...
        </h2>

        <p className="mx-auto mt-6 max-w-2xl whitespace-pre-line text-lg leading-8 text-gray-600 md:text-xl md:leading-9">
          {'100 ng\u00e0y \u0111\u1ea7u ti\u00ean ch\u1ec9 l\u00e0 l\u1eddi m\u1edf \u0111\u1ea7u.\nNh\u1eefng trang ti\u1ebfp theo s\u1ebd \u0111\u01b0\u1ee3c vi\u1ebft b\u1edfi ch\u00ednh ch\u00fang ta.'}
        </p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {futureCards.map((card) => (
          <Card
            key={card.title}
            className="group border border-white/50 bg-white/82 p-7 text-center text-[#4a1d29] shadow-[0_16px_50px_rgba(136,19,55,0.16)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_22px_70px_rgba(244,63,94,0.24)]"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-amber-50 text-4xl shadow-inner transition duration-300 group-hover:scale-110">
              {card.icon}
            </div>
            <div className="text-lg font-black leading-relaxed text-rose-700">{card.title}</div>
            <div className="mt-3 inline-flex rounded-full bg-rose-50 px-4 py-1 text-xs font-bold text-rose-400">
              {'\u0110ang ch\u1edd \u0111\u01b0\u1ee3c vi\u1ebft'}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function getEmotionLine(index: number) {
  return EMOTION_LINES[index % EMOTION_LINES.length];
}
