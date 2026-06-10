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
    title: 'L\u1ea7n \u0111\u1ea7u ch\u00fang ta g\u1eb7p nhau',
    desc: 'Ng\u00e0y \u0111\u1ea7u ti\u00ean ch\u00fang ta g\u1eb7p nhau v\u00e0 m\u1ecdi th\u1ee9 b\u1eaft \u0111\u1ea7u.',
    image: '/publicmemories/memory1.jpg',
  },
  {
    id: 2,
    date: '03/04/2026',
    title: 'L\u1ea7n \u0111\u1ea7u em v\u1ec1 nh\u00e0 anh',
    desc: 'M\u1ed9t c\u1ed9t m\u1ed1c \u0111\u1eb7c bi\u1ec7t trong c\u00e2u chuy\u1ec7n c\u1ee7a ch\u00fang ta.',
    image: '/publicmemories/memory2.jpg',
  },
  {
    id: 3,
    date: '11/04/2026',
    title: 'Ch\u00ednh th\u1ee9c ch\u00fang ta y\u00eau nhau \u2665',
    desc: 'T\u1eeb kho\u1ea3nh kh\u1eafc n\u00e0y, ch\u00fang ta ch\u00ednh th\u1ee9c b\u01b0\u1edbc v\u00e0o c\u00e2u chuy\u1ec7n c\u1ee7a hai ng\u01b0\u1eddi y\u00eau nhau.',
    image: '/publicmemories/memory3.jpg',
  },
  {
    id: 4,
    date: '30/04/2026',
    title: 'Chuy\u1ebfn du l\u1ecbch \u0111\u1ea7u ti\u00ean',
    desc: 'Nh\u1eefng k\u1ef7 ni\u1ec7m \u0111\u1ea7u ti\u00ean c\u00f9ng nhau tr\u00ean m\u1ed9t h\u00e0nh tr\u00ecnh xa.',
    image: '/publicmemories/memory4.jpg',
  },
];
