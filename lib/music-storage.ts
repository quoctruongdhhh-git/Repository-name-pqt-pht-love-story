export interface SavedMusic {
  id: 'background-music';
  name: string;
  type: string;
  dataUrl: string;
  updatedAt: number;
}

const DB_NAME = 'LoveMusicDB';
const STORE_NAME = 'tracks';
const DB_VERSION = 1;
const MUSIC_ID: SavedMusic['id'] = 'background-music';

function openMusicDB(): Promise<IDBDatabase> {
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

export async function getSavedMusic(): Promise<SavedMusic | null> {
  const db = await openMusicDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(MUSIC_ID);

    request.onsuccess = () => {
      resolve(request.result || null);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function saveMusic(track: Omit<SavedMusic, 'id' | 'updatedAt'>): Promise<SavedMusic> {
  const db = await openMusicDB();
  const savedTrack: SavedMusic = {
    ...track,
    id: MUSIC_ID,
    updatedAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(savedTrack);

    request.onsuccess = () => {
      resolve(savedTrack);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function deleteSavedMusic(): Promise<void> {
  const db = await openMusicDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(MUSIC_ID);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
