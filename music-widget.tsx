'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Music, Pause, Play, Trash2, Upload, Volume2, X } from 'lucide-react';
import { deleteSavedMusic, getSavedMusic, saveMusic, type SavedMusic } from '@/lib/music-storage';

interface PublicMusicTrack {
  name: string;
  file: string;
}

interface ActiveMusicTrack {
  name: string;
  src: string;
  source: 'public' | 'local';
}

const WIDGET_TITLE = 'Nh\u1ea1c n\u1ec1n';
const UPLOAD_TEXT = 'Ch\u00e8n nh\u1ea1c';
const CHANGE_TEXT = 'Thay nh\u1ea1c';
const EMPTY_TEXT = 'Ch\u01b0a c\u00f3 b\u00e0i nh\u1ea1c n\u00e0o';
const PLAY_TEXT = 'Ph\u00e1t';
const PAUSE_TEXT = 'T\u1ea1m d\u1eebng';
const PUBLIC_MUSIC_NOTE = 'Nh\u1ea1c production \u0111\u1eb7t trong /public/music';

export function MusicWidget() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackRef = useRef<ActiveMusicTrack | null>(null);
  const volumeRef = useRef(0.72);
  const hasUserInteractedRef = useRef(false);
  const [track, setTrack] = useState<ActiveMusicTrack | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.72);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    audioRef.current = getSharedAudio();

    const audio = audioRef.current;
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);
    setIsPlaying(!audio.paused);

    return () => {
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, []);

  const tryStartMusic = async () => {
    if (!audioRef.current || !trackRef.current) return false;

    try {
      audioRef.current.volume = volumeRef.current;
      await audioRef.current.play();
      setIsPlaying(true);
      return true;
    } catch {
      setIsPlaying(false);
      return false;
    }
  };

  useEffect(() => {
    const loadTrack = async () => {
      const publicTrack = await getPublicMusicTrack();

      if (publicTrack) {
        setTrack(publicTrack);
        return;
      }

      const savedTrack = await getSavedMusic();
      setTrack(savedTrack ? toActiveLocalTrack(savedTrack) : null);
    };

    loadTrack();
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    volumeRef.current = volume;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    trackRef.current = track;

    if (track) {
      const audio = getSharedAudio();
      audioRef.current = audio;

      if (audio.src !== new URL(track.src, window.location.href).href) {
        audio.src = track.src;
        audio.currentTime = getStoredMusicTime(track.src);
      }

      void tryStartMusic();

      if (hasUserInteractedRef.current) {
        window.setTimeout(() => {
          void tryStartMusic();
        }, 120);
      }
    }
  }, [track]);

  useEffect(() => {
    const handleInteraction = () => {
      hasUserInteractedRef.current = true;
      void tryStartMusic();
    };

    window.addEventListener('pointerdown', handleInteraction, { capture: true });
    window.addEventListener('click', handleInteraction, { capture: true });
    window.addEventListener('keydown', handleInteraction, { capture: true });
    window.addEventListener('touchstart', handleInteraction, { capture: true });

    return () => {
      window.removeEventListener('pointerdown', handleInteraction, { capture: true });
      window.removeEventListener('click', handleInteraction, { capture: true });
      window.removeEventListener('keydown', handleInteraction, { capture: true });
      window.removeEventListener('touchstart', handleInteraction, { capture: true });
    };
  }, []);

  const handleMusicSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert('Vui l\u00f2ng ch\u1ecdn file nh\u1ea1c.');
      return;
    }

    setIsSaving(true);
    try {
      const dataUrl = await readAudioFile(file);
      const savedTrack = await saveMusic({
        name: file.name,
        type: file.type,
        dataUrl,
      });

      setTrack(toActiveLocalTrack(savedTrack));
      setIsOpen(true);
      setIsPlaying(false);
    } catch (error) {
      console.error('Failed to save music:', error);
      alert('Kh\u00f4ng th\u1ec3 l\u01b0u nh\u1ea1c. File c\u00f3 th\u1ec3 qu\u00e1 l\u1edbn, b\u1ea1n th\u1eed b\u00e0i ng\u1eafn h\u01a1n nh\u00e9.');
    } finally {
      setIsSaving(false);
      event.currentTarget.value = '';
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current || !track) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleDeleteMusic = async () => {
    if (track?.source === 'local') {
      await deleteSavedMusic();
    }

    audioRef.current?.pause();
    if (audioRef.current) {
      audioRef.current.removeAttribute('src');
      audioRef.current.load();
    }
    setTrack(null);
    setIsPlaying(false);
  };

  return (
    <>
      <div className="fixed bottom-24 right-4 z-[80] sm:bottom-6">
        {isOpen ? (
          <div className="w-[min(calc(100vw-2rem),360px)] rounded-[28px] border border-white/70 bg-white/88 p-4 text-[#4a1d29] shadow-[0_22px_70px_rgba(136,19,55,0.24)] backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500 shadow-inner">
                  <Music size={19} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-black text-rose-700">{WIDGET_TITLE}</div>
                  <div className="truncate text-xs font-semibold text-gray-500">
                    {track?.name || EMPTY_TEXT}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500 transition hover:bg-rose-100"
                aria-label="Close music panel"
              >
                <X size={17} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                disabled={!track}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 text-sm font-black text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 disabled:opacity-55"
              >
                {isPlaying ? <Pause size={17} /> : <Play size={17} />}
                {isPlaying ? PAUSE_TEXT : PLAY_TEXT}
              </button>

              <label className="flex h-11 cursor-pointer items-center justify-center rounded-full border border-rose-100 bg-white px-4 text-sm font-black text-rose-500 shadow-sm transition hover:bg-rose-50">
                <Upload size={17} />
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleMusicSelect}
                  className="hidden"
                />
              </label>

              {track?.source === 'local' && (
                <button
                  type="button"
                  onClick={handleDeleteMusic}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-rose-100 bg-white text-rose-500 shadow-sm transition hover:bg-rose-50"
                  aria-label="Delete music"
                >
                  <Trash2 size={17} />
                </button>
              )}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-full bg-rose-50/80 px-4 py-3">
              <Volume2 size={16} className="text-rose-500" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                className="w-full accent-rose-400"
              />
            </div>

            <label className="mt-3 flex cursor-pointer items-center justify-center rounded-full border border-dashed border-rose-200 bg-white/70 px-4 py-3 text-sm font-black text-rose-500 transition hover:bg-white">
              <Upload size={16} className="mr-2" />
              {isSaving ? '\u0110ang l\u01b0u...' : track ? CHANGE_TEXT : UPLOAD_TEXT}
              <input
                type="file"
                accept="audio/*"
                onChange={handleMusicSelect}
                className="hidden"
              />
            </label>

            <p className="mt-3 text-center text-[11px] font-semibold leading-4 text-gray-500">
              {PUBLIC_MUSIC_NOTE}
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-gradient-to-br from-rose-400 via-pink-400 to-amber-200 text-white shadow-[0_14px_38px_rgba(244,63,94,0.34),0_0_24px_rgba(255,210,198,0.45)] transition hover:-translate-y-1"
            aria-label="Open music tool"
          >
            <Music size={24} />
          </button>
        )}
      </div>
    </>
  );
}

declare global {
  interface Window {
    __pqtPhtBackgroundAudio?: HTMLAudioElement;
  }
}

function getSharedAudio() {
  if (window.__pqtPhtBackgroundAudio) return window.__pqtPhtBackgroundAudio;

  const audio = new Audio();
  audio.loop = true;
  audio.preload = 'auto';
  audio.addEventListener('timeupdate', () => {
    if (audio.currentSrc) {
      sessionStorage.setItem(getMusicTimeKey(audio.currentSrc), String(audio.currentTime));
    }
  });

  window.__pqtPhtBackgroundAudio = audio;
  return audio;
}

function getStoredMusicTime(src: string) {
  const storedValue = sessionStorage.getItem(getMusicTimeKey(new URL(src, window.location.href).href));
  const storedTime = Number(storedValue);
  return Number.isFinite(storedTime) ? storedTime : 0;
}

function getMusicTimeKey(src: string) {
  return `pqt-pht-music-time:${src}`;
}

async function getPublicMusicTrack(): Promise<ActiveMusicTrack | null> {
  try {
    const response = await fetch('/music/playlist.json', { cache: 'no-store' });
    if (!response.ok) return null;

    const tracks = (await response.json()) as PublicMusicTrack[];
    const firstTrack = tracks.find((track) => track.file.trim());
    if (!firstTrack) return null;

    return {
      name: firstTrack.name || firstTrack.file,
      src: `/music/${encodeURIComponent(firstTrack.file)}`,
      source: 'public',
    };
  } catch {
    return null;
  }
}

function toActiveLocalTrack(track: SavedMusic): ActiveMusicTrack {
  return {
    name: track.name,
    src: track.dataUrl,
    source: 'local',
  };
}

function readAudioFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
}
