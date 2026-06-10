import type { DiaryEntry } from './diary-storage';
import { loveMemories } from './love-memories';

export interface TimelineItem {
  id: string;
  date: string;
  time?: string;
  title: string;
  desc: string;
  image: string | null;
  icon: string;
  href?: string;
}

const defaultIcons = ['\u2764\ufe0f', '\ud83c\udfe0', '\ud83d\udc95', '\ud83c\udf34'];

function getTimestamp(date: string, time?: string) {
  const normalizedTime = time || '00:00';

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    const [day, month, year] = date.split('/');
    const timestamp = new Date(`${year}-${month}-${day}T${normalizedTime}`).getTime();

    return Number.isNaN(timestamp) ? 0 : timestamp;
  }

  const value = time ? `${date}T${time}` : date;
  const timestamp = new Date(value).getTime();

  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function getTimelineItems(entries: DiaryEntry[]): TimelineItem[] {
  const fixedItems: TimelineItem[] = loveMemories.map((memory, index) => ({
    id: `memory-${memory.id}`,
    date: memory.date,
    title: memory.title,
    desc: memory.desc,
    image: memory.image,
    icon: defaultIcons[index] || '\u2764\ufe0f',
  }));

  const customItems: TimelineItem[] = entries.map((entry) => ({
    id: `entry-${entry.id}`,
    date: entry.date,
    time: entry.time,
    title: entry.title?.trim() || 'Ghi ch\u00fa kh\u00f4ng ti\u00eau \u0111\u1ec1',
    desc: entry.content,
    image: entry.images[0] || null,
    icon: '\ud83d\udc96',
    href: `/entries/${entry.id}`,
  }));

  return [...fixedItems, ...customItems].sort(
    (a, b) => getTimestamp(a.date, a.time) - getTimestamp(b.date, b.time)
  );
}
