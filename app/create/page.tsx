'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { saveEntry } from '@/lib/diary-storage';
import { X } from 'lucide-react';

export default function CreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize with current date and time
  useEffect(() => {
    const now = new Date();
    
    const dateStr = now.toISOString().split('T')[0];
    setDate(dateStr);

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setTime(`${hours}:${minutes}`);
  }, []);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImages(prev => [...prev, result]);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Vui lòng nhập nội dung ghi chú');
      return;
    }

    setIsSaving(true);
    try {
      await saveEntry({
  title: title.trim(),
  content: content.trim(),
        date,
        time,
        location: location.trim(),
        images,
      });
      router.push('/');
    } catch (error) {
      console.error('Failed to save entry:', error);
      alert('Không thể lưu ghi chú. Vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-rose-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-rose-600">Viết ghi chú</h1>
          <Link href="/">
            <Button variant="ghost" size="sm">
              ✕
            </Button>
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
   <Card className="p-4 mb-4 border-rose-100">
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Tiêu đề kỷ niệm ❤️
  </label>

  <Input
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Ví dụ: Lần đầu đi Đà Lạt"
    className="border-rose-200 focus:border-rose-400"
  />
</Card>
        {/* Content */}
        <Card className="p-4 mb-4 border-rose-100">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nội dung
          </label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Viết ghi chú của bạn tại đây..."
            className="w-full min-h-40 border-rose-200 focus:border-rose-400"
          />
        </Card>

        {/* Date, Time, Location */}
        <Card className="p-4 mb-4 border-rose-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Ngày
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border-rose-200 focus:border-rose-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Giờ
              </label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border-rose-200 focus:border-rose-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Địa điểm
              </label>
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="VD: Quán cà phê Bình An"
                className="border-rose-200 focus:border-rose-400"
              />
            </div>
          </div>
        </Card>

        {/* Images */}
        <Card className="p-4 mb-4 border-rose-100">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Thêm ảnh
            </label>
            <div className="mb-4">
              <label className="block">
                <div className="border-2 border-dashed border-rose-300 rounded-lg p-6 text-center cursor-pointer hover:bg-rose-50 transition">
                  <div className="text-2xl mb-2">📷</div>
                  <p className="text-sm text-gray-600">Chọn ảnh từ thư viện</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>
              </label>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              className="w-full border-rose-200"
            >
              Hủy
            </Button>
          </Link>
          <Button
            onClick={handleSave}
            disabled={isSaving || !content.trim()}
            className="flex-1 bg-rose-500 hover:bg-rose-600"
          >
            {isSaving ? 'Đang lưu...' : 'Lưu ghi chú'}
          </Button>
        </div>
      </main>
    </div>
  );
}
