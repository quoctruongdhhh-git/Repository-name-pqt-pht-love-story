'use client';

import Link from 'next/link';

const HEART = '\u2665';
const ARROW = '\u203a';
const CTA_TEXT = '\u0042\u1eae\u0054 \u0110\u1ea6\u0055 \u0048\u00c0\u004e\u0048 \u0054\u0052\u00cc\u004e\u0048';

const loveLetter = [
  'M\u1ecdi \u0111i\u1ec1u tr\u00ean v\u0169 tr\u1ee5 n\u00e0y\n\u0111\u1ec1u b\u1eaft \u0111\u1ea7u b\u1eb1ng ch\u1eef Duy\u00ean.',
  'Duy\u00ean kh\u1edfi n\u00ean ch\u00fang ta bi\u1ebft v\u00e0\ny\u00eau th\u01b0\u01a1ng nhau.',
  'T\u00ednh \u0111\u1ebfn nay tr\u00f2n 100 ng\u00e0y m\u00ecnh quen nhau.',
  'Trong su\u1ed1t th\u1eddi gian qua,\nch\u00fang ta \u0111\u00e3 b\u00ean nhau,\n\u0111\u1ed3ng h\u00e0nh c\u00f9ng nhau.',
  'Tuy nhi\u00ean th\u1eddi gian \u1ea5y ch\u01b0a \u0111\u1ee7 \u0111\u1ec3\nch\u00fang ta c\u1ea3m nh\u1eadn v\u1ec1 nhau.',
  'Nh\u1ea5t l\u00e0 Anh, ch\u01b0a k\u1ecbp th\u1ec3 hi\u1ec7n t\u00ecnh c\u1ea3m,\ny\u00eau th\u01b0\u01a1ng v\u1edbi Em.',
  'N\u00ean Anh l\u00e0m ch\u01b0\u01a1ng tr\u00ecnh n\u00e0y ch\u1ec9 \u0111\u01a1n gi\u1ea3n\nth\u1ed5 l\u1ed9 h\u1ebft t\u00ecnh c\u1ea3m t\u1eadn s\u00e2u trong l\u00f2ng Anh\nd\u00e0nh cho Em.',
];

const fallingHearts = [
  { left: '4%', delay: '0s', duration: '8.8s', size: 'text-xl', opacity: 'opacity-70', drift: '40px' },
  { left: '10%', delay: '1.1s', duration: '10.8s', size: 'text-sm', opacity: 'opacity-60', drift: '-30px' },
  { left: '16%', delay: '2.4s', duration: '9.6s', size: 'text-2xl', opacity: 'opacity-55', drift: '32px' },
  { left: '22%', delay: '3.7s', duration: '12s', size: 'text-base', opacity: 'opacity-62', drift: '-34px' },
  { left: '29%', delay: '5.1s', duration: '10.4s', size: 'text-lg', opacity: 'opacity-58', drift: '38px' },
  { left: '35%', delay: '0.7s', duration: '11.4s', size: 'text-sm', opacity: 'opacity-68', drift: '-26px' },
  { left: '42%', delay: '2.9s', duration: '9.2s', size: 'text-2xl', opacity: 'opacity-48', drift: '30px' },
  { left: '49%', delay: '4.2s', duration: '12.6s', size: 'text-base', opacity: 'opacity-62', drift: '-42px' },
  { left: '55%', delay: '1.8s', duration: '10s', size: 'text-xl', opacity: 'opacity-52', drift: '36px' },
  { left: '61%', delay: '6s', duration: '13s', size: 'text-sm', opacity: 'opacity-65', drift: '-24px' },
  { left: '67%', delay: '3.2s', duration: '9.8s', size: 'text-2xl', opacity: 'opacity-45', drift: '34px' },
  { left: '72%', delay: '5.8s', duration: '11.7s', size: 'text-lg', opacity: 'opacity-56', drift: '-30px' },
  { left: '78%', delay: '0.4s', duration: '10.5s', size: 'text-base', opacity: 'opacity-70', drift: '28px' },
  { left: '84%', delay: '2.2s', duration: '12.2s', size: 'text-xl', opacity: 'opacity-50', drift: '-38px' },
  { left: '90%', delay: '4.7s', duration: '9.4s', size: 'text-sm', opacity: 'opacity-64', drift: '24px' },
  { left: '95%', delay: '1.4s', duration: '11s', size: 'text-2xl', opacity: 'opacity-44', drift: '-28px' },
  { left: '2%', delay: '3.1s', duration: '8.9s', size: 'text-sm', opacity: 'opacity-62', drift: '26px' },
  { left: '12%', delay: '5.4s', duration: '9.7s', size: 'text-lg', opacity: 'opacity-48', drift: '-36px' },
  { left: '31%', delay: '6.8s', duration: '10.6s', size: 'text-xl', opacity: 'opacity-46', drift: '24px' },
  { left: '39%', delay: '7.5s', duration: '8.7s', size: 'text-sm', opacity: 'opacity-66', drift: '-28px' },
  { left: '53%', delay: '7.1s', duration: '11.2s', size: 'text-2xl', opacity: 'opacity-42', drift: '42px' },
  { left: '64%', delay: '8.2s', duration: '9.9s', size: 'text-base', opacity: 'opacity-58', drift: '-34px' },
  { left: '75%', delay: '6.4s', duration: '8.6s', size: 'text-sm', opacity: 'opacity-68', drift: '30px' },
  { left: '88%', delay: '7.8s', duration: '10.2s', size: 'text-lg', opacity: 'opacity-54', drift: '-26px' },
];

export default function HomePage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#251015] text-white">
      <img
        src="/home-cover-clean.png"
        alt="PQT PHT 100 ngay"
        className="absolute inset-0 h-full w-full object-cover object-[50%_16%] brightness-[1.12] contrast-[0.88] saturate-[1.18]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#fff3e8]/4 via-[#9a4651]/16 to-[#1d0b10]/78" />
      <div className="absolute inset-x-0 bottom-0 h-[74%] bg-gradient-to-t from-[#1c0a0f]/94 via-[#4b2028]/58 via-55% to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,236,210,0.42),transparent_25%),radial-gradient(circle_at_50%_48%,rgba(255,190,202,0.25),transparent_35%),radial-gradient(circle_at_50%_88%,rgba(255,185,165,0.32),transparent_34%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,230,218,0.2),transparent_18%),radial-gradient(circle_at_82%_18%,rgba(255,182,193,0.2),transparent_20%),radial-gradient(circle_at_16%_82%,rgba(255,175,190,0.18),transparent_20%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[56%] backdrop-blur-[1.5px] [mask-image:linear-gradient(to_bottom,transparent,black_24%)]" />
      <SoftSparkles />
      <FallingHearts />

      <section className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[920px] flex-col items-center px-5 pb-7 pt-[29svh] text-center sm:px-8 sm:pt-[29svh] md:pb-9 md:pt-[27svh]">
        <div className="w-full max-w-[760px]">
          <h1
            className="text-[2.35rem] italic leading-none tracking-[0.04em] text-[#fff0ea] drop-shadow-[0_5px_18px_rgba(28,8,12,0.72)] sm:text-[3.8rem] md:text-[5rem]"
            style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
          >
            PQT <span className="not-italic text-[#ffd3d6] drop-shadow-[0_0_14px_rgba(255,207,211,0.62)]">{HEART}</span> PHT
          </h1>

          <div className="mt-2 flex items-center justify-center gap-3 text-[#ffd3d6] md:mt-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-rose-100/70" />
            <span className="text-base drop-shadow-[0_0_12px_rgba(255,200,205,0.9)]">{HEART}</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-rose-100/70" />
          </div>

          <div
            className="mx-auto mt-3 max-w-[720px] space-y-1.5 text-[0.82rem] italic leading-[1.48] text-[#fff5ed]/94 drop-shadow-[0_3px_14px_rgba(16,4,8,0.82)] sm:text-[1rem] sm:leading-[1.55] md:mt-4 md:space-y-2 md:text-[1.08rem] md:leading-[1.58]"
            style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
          >
            {loveLetter.map((paragraph) => (
              <div key={paragraph}>
                <p className="whitespace-pre-line">{paragraph}</p>
                <div className="mt-1 text-[0.7rem] text-[#ffc6c8] drop-shadow-[0_0_13px_rgba(255,188,196,0.95)] md:text-xs">
                  {HEART}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 text-3xl text-[#ff9dad] drop-shadow-[0_0_20px_rgba(255,154,178,0.95)] md:mt-3">
            {HEART}
          </div>

          <Link
            href="/timeline"
            className="mx-auto mt-3 flex h-14 w-full max-w-[500px] items-center justify-center gap-4 rounded-full border border-white/65 bg-gradient-to-b from-[#ffe0d7] via-[#ffc2ba] to-[#f1a19d] px-7 text-sm font-bold uppercase tracking-[0.16em] text-[#99504a] shadow-[0_0_30px_rgba(255,191,183,0.78),0_18px_48px_rgba(34,9,13,0.58)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_38px_rgba(255,214,204,0.95),0_24px_58px_rgba(34,9,13,0.62)] sm:h-16 sm:text-lg"
          >
            <span>{CTA_TEXT}</span>
            <span className="text-3xl leading-none">{ARROW}</span>
          </Link>

          <p className="mt-3 flex items-center justify-center gap-3 text-[0.72rem] tracking-[0.08em] text-[#ffd8d3]/88 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:text-sm md:text-base">
            <span>{HEART}</span>
            <span>{'\u0043\u1ea3\u006d \u01a1\u006e \u0065\u006d \u0111\u00e3 \u0078\u0075\u1ea5\u0074 \u0068\u0069\u1ec7\u006e \u0074\u0072\u006f\u006e\u0067 \u0063\u0075\u1ed9\u0063 \u0111\u1eddi \u0061\u006e\u0068'}</span>
            <span>{HEART}</span>
          </p>
        </div>
      </section>

      <style jsx global>{`
        @keyframes heartFall {
          0% {
            transform: translate3d(0, -12vh, 0) rotate(0deg) scale(0.82);
            opacity: 0;
          }
          10% {
            opacity: 0.76;
          }
          100% {
            transform: translate3d(var(--drift), 112vh, 0) rotate(32deg) scale(1.08);
            opacity: 0;
          }
        }

        @keyframes softPulse {
          0%,
          100% {
            opacity: 0.52;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.08);
          }
        }
      `}</style>
    </main>
  );
}

function SoftSparkles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <div className="absolute left-[7%] top-[12%] h-20 w-20 rounded-full bg-rose-100/22 blur-2xl [animation:softPulse_5.8s_ease-in-out_infinite]" />
      <div className="absolute right-[7%] top-[18%] h-24 w-24 rounded-full bg-pink-200/18 blur-2xl [animation:softPulse_6.6s_ease-in-out_infinite]" />
      <div className="absolute left-[8%] bottom-[13%] h-32 w-32 rounded-full bg-rose-200/22 blur-3xl [animation:softPulse_7.2s_ease-in-out_infinite]" />
      <div className="absolute right-[5%] bottom-[6%] h-40 w-40 rounded-full bg-[#ffc2b0]/22 blur-3xl [animation:softPulse_8s_ease-in-out_infinite]" />
      <div className="absolute left-[12%] top-[38%] h-1.5 w-1.5 rounded-full bg-white/75 shadow-[0_0_18px_rgba(255,245,235,0.95)]" />
      <div className="absolute right-[18%] top-[9%] h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,245,235,0.9)]" />
      <div className="absolute right-[10%] bottom-[24%] h-2 w-2 rounded-full bg-rose-100/75 shadow-[0_0_18px_rgba(255,214,218,0.95)]" />
      <div className="absolute left-[15%] bottom-[26%] h-3 w-7 rotate-[-24deg] rounded-full bg-rose-100/38 blur-[1px]" />
      <div className="absolute right-[13%] top-[29%] h-3 w-7 rotate-[28deg] rounded-full bg-pink-100/34 blur-[1px]" />
      <div className="absolute left-[3%] top-[21%] h-24 w-24 rounded-full bg-white/12 blur-3xl" />
      <div className="absolute right-[22%] top-[4%] h-28 w-28 rounded-full bg-[#ffd4bd]/14 blur-3xl" />
    </div>
  );
}

function FallingHearts() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {fallingHearts.map((heart) => (
        <span
          key={`${heart.left}-${heart.delay}`}
          className={`absolute -top-10 text-[#ffd0d3] drop-shadow-[0_0_14px_rgba(255,190,198,0.95)] ${heart.size} ${heart.opacity}`}
          style={{
            left: heart.left,
            animation: `heartFall ${heart.duration} linear ${heart.delay} infinite`,
            ['--drift' as string]: heart.drift,
          }}
        >
          {HEART}
        </span>
      ))}
    </div>
  );
}
