'use client';

import Link from 'next/link';

const HEART = '\u2665';
const BACK = '\u2190';
const LETTER_TITLE = 'L\u1eddi Anh mu\u1ed1n d\u00e0nh cho em';
const LETTER_CONTENT = `A c\u00e1m \u01a1n Em \u0111\u00e3 \u0111\u1ecdc \u0111\u1ebfn \u0111\u00e2y. Nh\u1eefng k\u00fd \u1ee9c, k\u1ef7 ni\u1ec7m c\u00f9ng nhau Anh lu\u00f4n tr\u00e2n tr\u1ecdng. Ng\u01b0\u1eddi con g\u00e1i \u0111\u00e3 l\u00e0m Anh c\u00f3 nh\u1eefng \u01b0\u1edbc m\u01a1 r\u00f5 r\u00e0ng v\u1ec1 t\u01b0\u01a1ng lai. D\u00f9 cho ch\u00fang ta s\u1ebd l\u00e0 g\u00ec \u0111\u1ed1i v\u1edbi nhau trong t\u01b0\u01a1ng lai. Anh tin r\u1eb1ng ch\u00fang ta lu\u00f4n mong mu\u1ed1n nh\u1eefng \u0111i\u1ec1u t\u1ed1t nh\u1ea5t \u0111\u1ebfn v\u1edbi nhau.

Trang \u00e0, ch\u00fang ta quen bi\u1ebft v\u00e0 y\u00eau th\u01b0\u01a1ng nhau nhanh v\u00e0 m\u1ea1nh m\u1ebd nh\u01b0 m\u1ed9t d\u00f2ng su\u1ed1i ch\u1ea3y cu\u1ed3n cu\u1ed9n \u0111\u01b0a l\u00e0n n\u01b0\u1edbc m\u00e1t l\u1ea1nh \u0111\u1ebfn t\u1eebng th\u1eeda ru\u1ed9ng xanh m\u00e1t n\u1eb1m b\u00ean c\u1ea1nh nh\u1eefng b\u1ea3n l\u00e0ng. Anh v\u1eabn c\u00f3 m\u1ed9t ni\u1ec1m tin r\u1eb1ng d\u00f2ng su\u1ed1i \u1ea5y v\u1eabn s\u1ebd ch\u1ea3y, s\u1ebd ti\u1ebfp t\u1ee5c nu\u00f4i d\u01b0\u1ee1ng nh\u1eefng m\u1ea3nh \u0111\u1ea5t m\u00e0 n\u00f3 \u0111i qua. C\u00e1m \u01a1n Em \u0111\u00e3 \u0111\u1ebfn b\u00ean Anh v\u00e0o l\u00fac Anh \u1ed1m \u0111au, ho\u1ea1n n\u1ea1n. C\u1ea7u ch\u00fac cho Em c\u00f3 m\u1ed9t cu\u1ed9c \u0111\u1eddi r\u1ef1c r\u1ee1 theo \u00fd mu\u1ed1n c\u1ee7a Em. Anh lu\u00f4n d\u00f5i theo v\u00e0 \u1ee7ng h\u1ed9 Em. H\u01a1n c\u1ea3 y\u00eau \u0111\u00f3 l\u00e0 th\u01b0\u01a1ng.

Anh th\u01b0\u01a1ng Em!!`;

const heartSeeds = [
  { left: '8%', delay: '0s', duration: '10s', size: 'text-lg', drift: '32px' },
  { left: '18%', delay: '2.2s', duration: '12s', size: 'text-sm', drift: '-26px' },
  { left: '32%', delay: '4.4s', duration: '11s', size: 'text-xl', drift: '38px' },
  { left: '48%', delay: '1.3s', duration: '13s', size: 'text-base', drift: '-34px' },
  { left: '62%', delay: '3.6s', duration: '10.8s', size: 'text-2xl', drift: '30px' },
  { left: '78%', delay: '5.1s', duration: '12.4s', size: 'text-sm', drift: '-28px' },
  { left: '91%', delay: '1.8s', duration: '11.6s', size: 'text-xl', drift: '24px' },
];

const fallingHearts = heartSeeds.flatMap((heart, seedIndex) =>
  Array.from({ length: 4 }, (_, copyIndex) => {
    const baseLeft = Number.parseFloat(heart.left);
    const baseDelay = Number.parseFloat(heart.delay);
    const baseDuration = Number.parseFloat(heart.duration);
    const baseDrift = Number.parseFloat(heart.drift);

    return {
      ...heart,
      left: `${(baseLeft + copyIndex * 7 + seedIndex * 1.4) % 96}%`,
      delay: `${baseDelay + copyIndex * 0.82}s`,
      duration: `${baseDuration + copyIndex * 0.35}s`,
      drift: `${copyIndex % 2 === 0 ? baseDrift : -baseDrift}px`,
    };
  })
);

export default function LetterPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#251015] text-white">
      <img
        src="/home-cover-clean.png"
        alt="PQT PHT letter background"
        className="absolute inset-0 h-full w-full object-cover object-[50%_16%] brightness-[1.04] contrast-[0.88] saturate-[1.16]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#fff3e8]/6 via-[#9a4651]/24 to-[#1d0b10]/86" />
      <div className="absolute inset-x-0 bottom-0 h-[82%] bg-gradient-to-t from-[#1b080d]/96 via-[#4a1e28]/70 via-58% to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,236,210,0.38),transparent_26%),radial-gradient(circle_at_50%_56%,rgba(255,190,202,0.24),transparent_38%),radial-gradient(circle_at_50%_92%,rgba(255,185,165,0.34),transparent_34%)]" />
      <SoftSparkles />
      <FallingHearts />

      <div className="relative z-10 flex min-h-[100svh] w-full flex-col px-5 py-6 sm:px-8 lg:px-[4vw]">
        <section className="flex flex-1 items-center justify-start py-7">
          <div className="w-full max-w-[590px] text-center lg:ml-0 lg:text-left xl:max-w-[620px]">
              <h1
                className="text-[2.05rem] italic leading-tight tracking-[0.03em] text-[#fff0ea] drop-shadow-[0_5px_22px_rgba(20,5,8,0.88)] sm:text-[3.3rem] lg:text-[3.75rem] xl:text-[4.05rem]"
                style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
              >
                {LETTER_TITLE}
              </h1>

              <div className="mt-3 flex items-center justify-center gap-3 text-[#ffd3d6] lg:justify-start">
                <span className="h-px w-14 bg-gradient-to-r from-transparent to-rose-100/80" />
                <span className="text-base drop-shadow-[0_0_12px_rgba(255,200,205,0.9)]">{HEART}</span>
                <span className="h-px w-14 bg-gradient-to-l from-transparent to-rose-100/80" />
              </div>

              <div className="mt-7 rounded-[36px] border border-white/18 bg-gradient-to-br from-white/10 via-[#3b1420]/18 to-[#1d0a0f]/12 p-3 shadow-[0_20px_62px_rgba(24,5,9,0.28),0_0_34px_rgba(255,190,202,0.13)] backdrop-blur-[2px] sm:p-4">
                <div
                  className="min-h-[34svh] w-full rounded-[30px] border-0 bg-[#230b11]/14 px-4 py-4 text-center text-[1.06rem] italic leading-[1.9] text-[#fff6ef] outline-none sm:min-h-[360px] sm:px-7 sm:py-6 sm:text-[1.28rem] lg:text-left"
                  style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
                >
                  {LETTER_CONTENT.split('\n\n').map((paragraph) => (
                    <p key={paragraph} className="mb-5 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <p
                className="mx-auto mt-5 max-w-xl text-center text-sm italic leading-7 text-[#ffd8d3]/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] sm:text-base lg:mx-0 lg:text-left"
                style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
              >
                {HEART} {'Nh\u1eefng d\u00f2ng ch\u1eef n\u00e0y s\u1ebd lu\u00f4n \u1edf \u0111\u00e2y, nh\u01b0 m\u1ed9t l\u1eddi th\u01b0\u01a1ng Anh g\u1eedi \u0111\u1ebfn Em.'} {HEART}
              </p>

              <div className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-2 lg:mx-0">
                <Link
                  href="/album"
                  className="rounded-full border border-white/30 bg-white/12 px-5 py-3 text-center text-sm font-bold text-[#ffe8e1] shadow-lg shadow-black/20 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  {BACK} {'K\u00fd \u1ee9c'}
                </Link>
                <Link
                  href="/"
                  className="rounded-full border border-white/30 bg-white/12 px-5 py-3 text-center text-sm font-bold text-[#ffe8e1] shadow-lg shadow-black/20 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  {'Trang ch\u1ee7'}
                </Link>
              </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes letterHeartFall {
          0% {
            transform: translate3d(0, -12vh, 0) rotate(0deg) scale(0.84);
            opacity: 0;
          }
          12% {
            opacity: 0.72;
          }
          100% {
            transform: translate3d(var(--drift), 112vh, 0) rotate(30deg) scale(1.08);
            opacity: 0;
          }
        }

        @keyframes letterSoftPulse {
          0%,
          100% {
            opacity: 0.42;
            transform: scale(1);
          }
          50% {
            opacity: 0.86;
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
      <div className="absolute left-[8%] top-[13%] h-24 w-24 rounded-full bg-rose-100/18 blur-2xl [animation:letterSoftPulse_5.8s_ease-in-out_infinite]" />
      <div className="absolute right-[8%] top-[20%] h-28 w-28 rounded-full bg-pink-200/16 blur-2xl [animation:letterSoftPulse_6.6s_ease-in-out_infinite]" />
      <div className="absolute left-[8%] bottom-[12%] h-36 w-36 rounded-full bg-rose-200/20 blur-3xl [animation:letterSoftPulse_7.2s_ease-in-out_infinite]" />
      <div className="absolute right-[4%] bottom-[8%] h-44 w-44 rounded-full bg-[#ffc2b0]/20 blur-3xl [animation:letterSoftPulse_8s_ease-in-out_infinite]" />
      <div className="absolute left-[12%] top-[36%] h-1.5 w-1.5 rounded-full bg-white/75 shadow-[0_0_18px_rgba(255,245,235,0.95)]" />
      <div className="absolute right-[18%] top-[13%] h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,245,235,0.9)]" />
      <div className="absolute right-[10%] bottom-[24%] h-2 w-2 rounded-full bg-rose-100/75 shadow-[0_0_18px_rgba(255,214,218,0.95)]" />
    </div>
  );
}

function FallingHearts() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {fallingHearts.map((heart) => (
        <span
          key={`${heart.left}-${heart.delay}`}
          className={`absolute -top-10 text-[#ffd0d3] opacity-60 drop-shadow-[0_0_14px_rgba(255,190,198,0.95)] ${heart.size}`}
          style={{
            left: heart.left,
            animation: `letterHeartFall ${heart.duration} linear ${heart.delay} infinite`,
            ['--drift' as string]: heart.drift,
          }}
        >
          {HEART}
        </span>
      ))}
    </div>
  );
}
