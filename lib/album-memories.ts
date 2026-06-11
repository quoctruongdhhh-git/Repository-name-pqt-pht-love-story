export interface AlbumMemory {
  id: number;
  caption: string;
  note: string;
  image: string;
}

export const albumMemories: AlbumMemory[] = [
  {
    id: 1,
    caption: 'Một bữa ăn thật vui',
    note: 'Khoảnh khắc có tiếng cười, có những người thân quen và có em trong một ngày rất ấm.',
    image: '/publicmemories/memory1.jpg',
  },
  {
    id: 2,
    caption: 'Một ngày bên sông',
    note: 'Một tấm ảnh bình dị, nhưng đủ để anh nhớ về cảm giác được ở cạnh em.',
    image: '/publicmemories/memory2.jpg',
  },
  {
    id: 3,
    caption: 'Nụ hôn anh muốn giữ lại',
    note: 'Có những khoảnh khắc không cần nói nhiều, chỉ cần nhìn lại là thấy thương.',
    image: '/publicmemories/memory3.jpg',
  },
  {
    id: 4,
    caption: 'Chuyến đi đầu tiên',
    note: 'Một đoạn đường, một chuyến đi, và thêm một ký ức đẹp của hai đứa mình.',
    image: '/publicmemories/memory4.jpg',
  },
];
