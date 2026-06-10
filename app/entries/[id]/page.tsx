'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { deleteEntry, getEntryById } from '@/lib/diary-storage';
import type { DiaryEntry } from '@/lib/diary-storage';

interface EntryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EntryDetailPage({ params }: EntryDetailPageProps) {
  const router = useRouter();
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadEntry = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);

      const entryData = await getEntryById(resolvedParams.id);
      setEntry(entryData);
      setIsLoading(false);
    };

    loadEntry();
  }, [params]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);

      return date.toLocaleDateString('vi-VN', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa ghi chú này?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteEntry(id);
      router.push('/');
    } catch (error) {
      console.error('Failed to delete entry:', error);
      alert('Không thể xóa ghi chú. Vui lòng thử lại.');
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50">
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse text-xl text-rose-400">
              Đang tải...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50">
        <div className="flex h-screen flex-col items-center justify-center text-center">
          <div className="mb-4 text-5xl">😢</div>
          <p className="mb-6 text-gray-500">Ghi chú không tìm thấy</p>
          <Link href="/">
            <Button className="bg-rose-500 hover:bg-rose-600">Quay lại</Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = entry.title?.trim() || 'Ghi chú không tiêu đề';
  const coverImage = entry.images[0];
  const galleryImages = coverImage ? entry.images.slice(1) : entry.images;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-white pb-20">
      <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/85 shadow-sm backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-4">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-rose-600 hover:bg-rose-50"
            >
              <ArrowLeft size={17} />
              Quay lại
            </Button>
          </Link>

          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            variant="outline"
            size="sm"
            className="border-red-100 bg-white/80 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">
              {isDeleting ? 'Đang xóa...' : 'Xóa'}
            </span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-6">
        {coverImage && (
          <button
            type="button"
            onClick={() => setSelectedImage(coverImage)}
            className="group mb-6 block w-full overflow-hidden rounded-[32px] border border-white bg-white shadow-2xl shadow-rose-100/80"
          >
            <img
              src={coverImage}
              alt={title}
              className="h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:h-[520px]"
            />
          </button>
        )}

        <section className="mb-6">
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-extrabold leading-tight text-rose-700 md:text-5xl">
              {title}
            </h1>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center rounded-full border border-rose-100 bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-600">
              📅 {formatDate(entry.date)}
            </span>

            {entry.time && (
              <span className="inline-flex items-center rounded-full border border-pink-100 bg-pink-50 px-3 py-1.5 text-sm font-medium text-rose-500">
                ⏰ {entry.time}
              </span>
            )}

            {entry.location && (
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-rose-100 bg-white px-3 py-1.5 text-sm text-gray-500 shadow-sm">
                <MapPin size={15} className="text-rose-400" />
                <span className="truncate">{entry.location}</span>
              </span>
            )}
          </div>
        </section>

        <Card className="mb-8 border-rose-100 bg-white/95 p-6 shadow-xl shadow-rose-100/60 md:p-8">
          <div className="max-w-none whitespace-pre-wrap break-words text-base leading-8 text-gray-800 md:text-lg md:leading-9">
            {entry.content}
          </div>
        </Card>

        {galleryImages.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-rose-700 md:text-2xl">
              Ảnh kỷ niệm
            </h2>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="group overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-lg shadow-rose-100/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src={image}
                    alt={`Image ${index + 2}`}
                    className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      {selectedImage && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-4">
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Đóng ảnh"
          >
            <X size={26} />
          </button>

          <img
            src={selectedImage}
            alt="fullscreen"
            className="max-h-[90vh] max-w-[95vw] object-contain"
          />
        </div>
      )}
    </div>
  );
}
