'use client';

import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import Link from 'next/link';
import { getAllEntries, updateEntry, type DiaryEntry } from '@/lib/diary-storage';

const BACK = '\u2190';
const CLOSE = '\u00d7';
const HEART = '\u2665';
const CAMERA = '\ud83d\udcf7';
const SPARKLE = '\u2726';
const EDIT = 'Ch\u1ec9nh s\u1eeda';
const SAVE = 'L\u01b0u thay \u0111\u1ed5i';
const CANCEL = 'H\u1ee7y';
const ADD_PHOTOS = 'Th\u00eam \u1ea3nh';
const NEXT_LETTER = 'L\u1eddi Anh mu\u1ed1n gi\u00e0nh cho em';
const TITLE_FALLBACK = 'Ghi ch\u00fa kh\u00f4ng ti\u00eau \u0111\u1ec1';
const PAGE_TITLE = 'K\u00fd \u1ee8c C\u1ee7a Ch\u00fang Ta';
const PAGE_SUBTITLE = 'Nh\u1eefng kho\u1ea3nh kh\u1eafc nh\u1ecf t\u1ea1o n\u00ean c\u00e2u chuy\u1ec7n l\u1edbn c\u1ee7a ch\u00fang ta.';
const EMPTY_TITLE = 'Ch\u01b0a c\u00f3 k\u00fd \u1ee9c n\u00e0o';
const EMPTY_TEXT = 'Ch\u01b0a c\u00f3 k\u00fd \u1ee9c n\u00e0o. H\u00e3y b\u1eaft \u0111\u1ea7u l\u01b0u l\u1ea1i nh\u1eefng kho\u1ea3nh kh\u1eafc \u0111\u1ea7u ti\u00ean.';

const filters = ['T\u1ea5t c\u1ea3', '\u0110i ch\u01a1i', '\u1ede nh\u00e0', 'Du l\u1ecbch', '\u0110\u1eb7c bi\u1ec7t'];

export default function AlbumPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadEntries = async () => {
      const savedEntries = await getAllEntries();
      setEntries(savedEntries);
    };

    loadEntries();
  }, []);

  const visibleEntries = useMemo(() => {
    return [...entries].sort((a, b) => getEntryTimestamp(a) - getEntryTimestamp(b));
  }, [entries]);

  const handleEntryUpdated = (updatedEntry: DiaryEntry) => {
    setEntries((currentEntries) =>
      currentEntries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
    setSelectedEntry(updatedEntry);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff6f8] pb-28 text-[#4a1d29]">
      <MemoryBackground />

      <header className="sticky top-0 z-40 border-b border-white/70 bg-[#fff8fa]/82 shadow-sm shadow-rose-100/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
          <Link href="/">
            <button className="rounded-full border border-rose-100 bg-white/80 px-3 py-2 text-xl font-bold text-rose-500 shadow-sm shadow-rose-100 transition hover:-translate-y-0.5 hover:bg-rose-50">
              {BACK}
            </button>
          </Link>

          <div className="min-w-0 text-center">
            <h1
              className="text-[1.65rem] font-black leading-tight text-rose-800 drop-shadow-[0_3px_12px_rgba(251,113,133,0.18)] sm:text-4xl"
              style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
            >
              {PAGE_TITLE}
            </h1>
            <p className="mx-auto mt-1 max-w-[340px] text-sm font-medium leading-5 text-gray-600 sm:max-w-none">
              {PAGE_SUBTITLE} <span className="text-rose-400">{HEART}</span>
            </p>
          </div>

          <Link href="/create">
            <button className="rounded-full border border-rose-100 bg-white/80 px-3 py-2 text-xl text-rose-500 shadow-sm shadow-rose-100 transition hover:-translate-y-0.5 hover:bg-rose-50">
              {CAMERA}
            </button>
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
          {filters.map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-bold shadow-sm transition ${
                index === 0
                  ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-rose-200'
                  : 'bg-white/78 text-[#4a1d29] shadow-rose-100 hover:-translate-y-0.5 hover:bg-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {visibleEntries.length === 0 ? (
          <EmptyState />
        ) : (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleEntries.map((entry) => (
              <MemoryCard key={entry.id} entry={entry} onOpen={() => setSelectedEntry(entry)} />
            ))}
          </section>
        )}

        <NextLetterButton />
      </main>

      {selectedEntry && (
        <MemoryDetail
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
          onOpenImage={setSelectedImage}
          onEntryUpdated={handleEntryUpdated}
        />
      )}

      {selectedImage && (
        <ImageViewer image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
}

function NextLetterButton() {
  return (
    <section className="mx-auto mt-10 max-w-2xl text-center">
      <Link
        href="/letter"
        className="group inline-flex w-full max-w-xl items-center justify-center gap-3 rounded-full border border-white/70 bg-gradient-to-r from-[#f8b6c5] via-[#ffd2c6] to-[#f5a7bd] px-6 py-4 text-sm font-black uppercase tracking-[0.09em] text-[#7f3442] shadow-[0_18px_55px_rgba(244,63,94,0.24),0_0_28px_rgba(255,210,198,0.52)] ring-1 ring-rose-100/80 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(244,63,94,0.32),0_0_36px_rgba(255,210,198,0.68)] sm:text-base"
      >
        <span className="text-lg text-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.55)]">
          {HEART}
        </span>
        <span>{NEXT_LETTER}</span>
        <span className="text-2xl leading-none transition group-hover:translate-x-1">
          {'\u203a'}
        </span>
      </Link>
    </section>
  );
}

function MemoryCard({ entry, onOpen }: { entry: DiaryEntry; onOpen: () => void }) {
  const cover = entry.images?.[0];
  const title = getTitle(entry);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group overflow-hidden rounded-[28px] border border-white/75 bg-white/82 text-left shadow-[0_16px_45px_rgba(136,19,55,0.13)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_70px_rgba(244,63,94,0.2)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50">
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.045]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-5xl text-rose-300">
            <div>{CAMERA}</div>
            <div className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-rose-400">
              Memory
            </div>
          </div>
        )}

        <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/82 text-lg text-rose-400 shadow-lg shadow-rose-200/60 backdrop-blur">
          {HEART}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h2 className="line-clamp-2 text-lg font-black leading-snug text-[#5a2530] sm:text-xl">
          {title}
        </h2>
        <div className="mt-2 inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-500">
          {formatDate(entry.date)}
        </div>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {entry.content || 'M\u1ed9t k\u1ef7 ni\u1ec7m nh\u1ecf \u0111ang \u0111\u01b0\u1ee3c l\u01b0u l\u1ea1i trong c\u00e2u chuy\u1ec7n c\u1ee7a ch\u00fang ta.'}
        </p>
      </div>
    </button>
  );
}

function MemoryDetail({
  entry,
  onClose,
  onOpenImage,
  onEntryUpdated,
}: {
  entry: DiaryEntry;
  onClose: () => void;
  onOpenImage: (image: string) => void;
  onEntryUpdated: (entry: DiaryEntry) => void;
}) {
  const [activeImage, setActiveImage] = useState(entry.images?.[0] || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [draftTitle, setDraftTitle] = useState(entry.title || '');
  const [draftDate, setDraftDate] = useState(entry.date || '');
  const [draftTime, setDraftTime] = useState(entry.time || '');
  const [draftLocation, setDraftLocation] = useState(entry.location || '');
  const [draftContent, setDraftContent] = useState(entry.content || '');
  const [draftImages, setDraftImages] = useState<string[]>(entry.images || []);
  const title = getTitle(entry);
  const visibleImages = isEditing ? draftImages : entry.images;

  useEffect(() => {
    setActiveImage(entry.images?.[0] || '');
    setIsEditing(false);
    setDraftTitle(entry.title || '');
    setDraftDate(entry.date || '');
    setDraftTime(entry.time || '');
    setDraftLocation(entry.location || '');
    setDraftContent(entry.content || '');
    setDraftImages(entry.images || []);
  }, [entry]);

  const handleCancelEdit = () => {
    setIsEditing(false);
    setDraftTitle(entry.title || '');
    setDraftDate(entry.date || '');
    setDraftTime(entry.time || '');
    setDraftLocation(entry.location || '');
    setDraftContent(entry.content || '');
    setDraftImages(entry.images || []);
    setActiveImage(entry.images?.[0] || '');
  };

  const handleAddImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files || []);
    if (files.length === 0) return;

    const nextImages = await Promise.all(files.map(readImageFile));
    setDraftImages((currentImages) => [...currentImages, ...nextImages]);

    if (!activeImage && nextImages[0]) {
      setActiveImage(nextImages[0]);
    }

    event.currentTarget.value = '';
  };

  const handleRemoveImage = (imageToRemove: string) => {
    setDraftImages((currentImages) => {
      const updatedImages = currentImages.filter((image) => image !== imageToRemove);

      if (activeImage === imageToRemove) {
        setActiveImage(updatedImages[0] || '');
      }

      return updatedImages;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedEntry = await updateEntry(entry.id, {
        title: draftTitle.trim(),
        date: draftDate,
        time: draftTime,
        location: draftLocation.trim(),
        content: draftContent.trim(),
        images: draftImages,
      });

      if (updatedEntry) {
        onEntryUpdated(updatedEntry);
        setActiveImage(updatedEntry.images?.[0] || '');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update memory:', error);
      alert('Kh\u00f4ng th\u1ec3 l\u01b0u k\u00fd \u1ee9c. Vui l\u00f2ng th\u1eed l\u1ea1i.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-[#2c1018]/72 px-4 py-6 backdrop-blur-md">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[34px] border border-white/60 bg-[#fff9fa] shadow-[0_28px_100px_rgba(31,8,14,0.48)]">
        <div className="flex items-center justify-between gap-3 border-b border-rose-100 bg-white/70 px-4 py-3 backdrop-blur">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-rose-50 px-4 py-2 text-sm font-black text-rose-600 transition hover:bg-rose-100"
          >
            {BACK} {'Quay l\u1ea1i'}
          </button>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-full bg-white px-4 py-2 text-sm font-black text-rose-500 shadow-sm transition hover:bg-rose-50"
                >
                  {CANCEL}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="rounded-full bg-gradient-to-r from-rose-400 to-pink-400 px-4 py-2 text-sm font-black text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {isSaving ? '\u0110ang l\u01b0u...' : SAVE}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-full bg-gradient-to-r from-rose-400 to-pink-400 px-4 py-2 text-sm font-black text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5"
              >
                {EDIT}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl font-bold text-rose-500 shadow-sm transition hover:bg-rose-50"
            >
              {CLOSE}
            </button>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 p-4 sm:p-5">
            {activeImage ? (
              <button
                type="button"
                onClick={() => onOpenImage(activeImage)}
                className="group block w-full overflow-hidden rounded-[28px] bg-white shadow-[0_18px_55px_rgba(136,19,55,0.18)]"
              >
                <img
                  src={activeImage}
                  alt={title}
                  className="max-h-[64vh] w-full object-contain transition duration-500 group-hover:scale-[1.015]"
                />
              </button>
            ) : (
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[28px] bg-white/70 text-center text-6xl text-rose-300">
                {CAMERA}
                <p className="mt-4 text-sm font-bold text-rose-500">
                  {'K\u1ef7 ni\u1ec7m n\u00e0y ch\u01b0a c\u00f3 \u1ea3nh'}
                </p>
              </div>
            )}

            {isEditing && (
              <label className="mt-4 flex cursor-pointer items-center justify-center rounded-[22px] border-2 border-dashed border-rose-200 bg-white/76 px-4 py-5 text-sm font-black text-rose-500 transition hover:bg-white">
                {CAMERA} <span className="ml-2">{ADD_PHOTOS}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleAddImages}
                  className="hidden"
                />
              </label>
            )}

            {visibleImages.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {visibleImages.map((image, index) => (
                  <div key={`${image}-${index}`} className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveImage(image)}
                      className={`h-20 w-20 overflow-hidden rounded-2xl border-2 bg-white transition ${
                        activeImage === image
                          ? 'border-rose-400 shadow-lg shadow-rose-200'
                          : 'border-white/70 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={image} alt={title} className="h-full w-full object-cover" />
                    </button>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(image)}
                        className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-sm font-black text-white shadow-lg"
                      >
                        {CLOSE}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <article className="p-5 sm:p-7">
            {isEditing ? (
              <EditMemoryForm
                title={draftTitle}
                date={draftDate}
                time={draftTime}
                location={draftLocation}
                content={draftContent}
                onTitleChange={setDraftTitle}
                onDateChange={setDraftDate}
                onTimeChange={setDraftTime}
                onLocationChange={setDraftLocation}
                onContentChange={setDraftContent}
              />
            ) : (
              <>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-black text-rose-500">
                  <span>{HEART}</span>
                  <span>{formatDate(entry.date)}</span>
                  {entry.time && <span>{entry.time}</span>}
                </div>

                <h2
                  className="text-3xl font-black leading-tight text-rose-800 sm:text-4xl"
                  style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
                >
                  {title}
                </h2>

                {entry.location && (
                  <div className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#7c3a46] shadow-sm shadow-rose-100">
                    {'\ud83d\udccd'} {entry.location}
                  </div>
                )}

                <p className="mt-6 whitespace-pre-line text-base leading-8 text-gray-600">
                  {entry.content || 'K\u1ef7 ni\u1ec7m n\u00e0y \u0111ang ch\u1edd \u0111\u01b0\u1ee3c vi\u1ebft th\u00eam.'}
                </p>
              </>
            )}

            <div className="mt-8 rounded-[28px] border border-rose-100 bg-gradient-to-br from-rose-50 to-amber-50 p-5 text-center text-sm font-semibold leading-6 text-rose-500">
              {SPARKLE} {'M\u1ed7i t\u1ea5m \u1ea3nh l\u00e0 m\u1ed9t l\u00fd do \u0111\u1ec3 m\u00ecnh nh\u1edb v\u1ec1 nhau.'} {SPARKLE}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

function EditMemoryForm({
  title,
  date,
  time,
  location,
  content,
  onTitleChange,
  onDateChange,
  onTimeChange,
  onLocationChange,
  onContentChange,
}: {
  title: string;
  date: string;
  time: string;
  location: string;
  content: string;
  onTitleChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onContentChange: (value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-black text-rose-600">
          {'Ti\u00eau \u0111\u1ec1 k\u1ef7 ni\u1ec7m'}
        </label>
        <input
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder={TITLE_FALLBACK}
          className="w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 text-base font-bold text-[#4a1d29] outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-black text-rose-600">{'Ng\u00e0y'}</label>
          <input
            type="date"
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
            className="w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 text-sm font-bold text-[#4a1d29] outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-black text-rose-600">{'Gi\u1edd'}</label>
          <input
            type="time"
            value={time}
            onChange={(event) => onTimeChange(event.target.value)}
            className="w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 text-sm font-bold text-[#4a1d29] outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-black text-rose-600">
          {'\u0110\u1ecba \u0111i\u1ec3m'}
        </label>
        <input
          value={location}
          onChange={(event) => onLocationChange(event.target.value)}
          placeholder={'N\u01a1i m\u00ecnh \u0111\u00e3 c\u00f9ng nhau \u0111i qua...'}
          className="w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 text-base font-semibold text-[#4a1d29] outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-black text-rose-600">
          {'N\u1ed9i dung'}
        </label>
        <textarea
          value={content}
          onChange={(event) => onContentChange(event.target.value)}
          placeholder={'Vi\u1ebft l\u1ea1i c\u1ea3m x\u00fac c\u1ee7a k\u1ef7 ni\u1ec7m n\u00e0y...'}
          className="min-h-44 w-full resize-none rounded-2xl border border-rose-100 bg-white px-4 py-3 text-base leading-7 text-[#4a1d29] outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
        />
      </div>
    </div>
  );
}

function ImageViewer({ image, onClose }: { image: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/94 p-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-3xl text-white transition hover:bg-white/22"
      >
        {CLOSE}
      </button>
      <img src={image} alt="fullscreen memory" className="max-h-[92vh] max-w-[96vw] object-contain" />
    </div>
  );
}

function EmptyState() {
  return (
    <section className="mx-auto max-w-lg rounded-[34px] border border-white/75 bg-white/82 px-6 py-14 text-center shadow-[0_20px_70px_rgba(244,63,94,0.16)] backdrop-blur">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-4xl text-rose-400 shadow-inner">
        {CAMERA}
      </div>
      <h2 className="text-2xl font-black text-rose-700">{EMPTY_TITLE}</h2>
      <p className="mt-3 text-sm leading-6 text-gray-600">{EMPTY_TEXT}</p>
      <Link
        href="/create"
        className="mt-6 inline-flex rounded-full bg-gradient-to-r from-rose-400 to-pink-400 px-6 py-3 text-sm font-black text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5"
      >
        {'L\u01b0u k\u1ef7 ni\u1ec7m \u0111\u1ea7u ti\u00ean'}
      </Link>
    </section>
  );
}

function MemoryBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff1f5] via-[#fff8f8] to-[#fff9ef]" />
      <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-rose-200/36 blur-3xl" />
      <div className="absolute -right-24 top-28 h-80 w-80 rounded-full bg-pink-200/34 blur-3xl" />
      <div className="absolute left-[22%] bottom-0 h-80 w-80 rounded-full bg-amber-100/34 blur-3xl" />
      <div className="absolute right-[12%] bottom-[18%] h-64 w-64 rounded-full bg-fuchsia-100/30 blur-3xl" />
      <div className="absolute left-6 top-24 text-4xl text-rose-200/45">{HEART}</div>
      <div className="absolute right-8 top-52 text-3xl text-pink-200/45">{HEART}</div>
      <div className="absolute left-[48%] top-28 text-xl text-rose-200/50">{SPARKLE}</div>
    </div>
  );
}

function getTitle(entry: DiaryEntry) {
  return entry.title?.trim() || TITLE_FALLBACK;
}

function formatDate(date: string) {
  if (!date) return '';

  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  return date;
}

function getEntryTimestamp(entry: DiaryEntry) {
  const normalizedTime = entry.time || '00:00';

  if (/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) {
    const timestamp = new Date(`${entry.date}T${normalizedTime}`).getTime();
    return Number.isNaN(timestamp) ? entry.createdAt : timestamp;
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(entry.date)) {
    const [day, month, year] = entry.date.split('/');
    const timestamp = new Date(`${year}-${month}-${day}T${normalizedTime}`).getTime();
    return Number.isNaN(timestamp) ? entry.createdAt : timestamp;
  }

  const timestamp = new Date(entry.date).getTime();
  return Number.isNaN(timestamp) ? entry.createdAt : timestamp;
}

function readImageFile(file: File): Promise<string> {
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
