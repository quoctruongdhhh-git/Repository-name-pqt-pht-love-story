export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  location: string;
  images: string[];
  createdAt: number;
}

const DB_NAME = 'LoveDiaryDB';
const STORE_NAME = 'entries';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
        });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function getAllEntries(): Promise<DiaryEntry[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    const request = store.getAll();

    request.onsuccess = () => {
      const entries = request.result.sort(
        (a, b) => b.createdAt - a.createdAt
      );

      resolve(entries);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function getEntryById(
  id: string
): Promise<DiaryEntry | null> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    const request = store.get(id);

    request.onsuccess = () => {
      resolve(request.result || null);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function saveEntry(
  entry: Omit<DiaryEntry, 'id' | 'createdAt'>
): Promise<DiaryEntry> {
  const db = await openDB();

  const newEntry: DiaryEntry = {
    ...entry,
    id: Date.now().toString(),
    createdAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const request = store.add(newEntry);

    request.onsuccess = () => {
      resolve(newEntry);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function deleteEntry(
  id: string
): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function updateEntry(
  id: string,
  updates: Partial<DiaryEntry>
): Promise<DiaryEntry | null> {
  const current = await getEntryById(id);

  if (!current) return null;

  const updated = {
    ...current,
    ...updates,
  };

  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const request = store.put(updated);

    request.onsuccess = () => {
      resolve(updated);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}