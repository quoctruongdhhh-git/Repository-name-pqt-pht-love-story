export interface LoveMemory {
  id: number;
  date: string;
  title: string;
  desc: string;
  image: string;
}

export const loveMemories: LoveMemory[] = [
  {
    id: 1,
    date: '02/03/2026',
    title: 'Lần đầu chúng ta gặp nhau',
    desc: 'Ngày đầu tiên chúng ta gặp nhau và mọi thứ bắt đầu.',
    image: '/timeline-memories/memory1.jpg',
  },
  {
    id: 2,
    date: '03/04/2026',
    title: 'Lần đầu em về nhà anh',
    desc: 'Một cột mốc đặc biệt trong câu chuyện của chúng ta.',
    image: '/timeline-memories/memory2.jpg',
  },
  {
    id: 3,
    date: '11/04/2026',
    title: 'Chính thức chúng ta yêu nhau ♥',
    desc: 'Từ khoảnh khắc này, chúng ta chính thức bước vào câu chuyện của hai người yêu nhau.',
    image: '/timeline-memories/memory3.jpg',
  },
  {
    id: 4,
    date: '30/04/2026',
    title: 'Chuyến du lịch đầu tiên',
    desc: 'Những kỷ niệm đầu tiên cùng nhau trên một hành trình xa.',
    image: '/timeline-memories/memory4.jpg',
  },
];
