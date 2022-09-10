// import { atob, btoa } from 'buffer';

import { IDatabase } from '@/interfaces';

interface IKey {
  [key: string]: string;
  HOW_TO_PLAY: string;
  DATABASE: string;
  SECRET: string;
  EXPIRED_DATE: string;
  COMPLETED: string;
}
class LocalStorageService {
  private KEYS: IKey = {
    HOW_TO_PLAY: 'show-how-to-play',
    DATABASE: 'board-database',
    SECRET: 'secret-number',
    EXPIRED_DATE: 'expired-date',
    COMPLETED: 'is-completed',
  };

  private ENCODED_KEYS: IKey;

  constructor() {
    this.ENCODED_KEYS = { ...this.KEYS };

    const keys = Object.keys(this.KEYS);

    const values = Object.values(this.KEYS);

    keys.forEach((key, idx) => {
      try {
        this.ENCODED_KEYS[key] = this.encode(values[idx]);
      } catch (error) {
        console.error('Something wrong when encoding the keys.');
      }
    });
  }

  private encode(data: any) {
    try {
      return btoa(data);
    } catch (error) {
      return data;
    }
  }

  private decode(data: any) {
    try {
      return atob(data);
    } catch (error) {
      return data;
    }
  }

  getCompleted() {
    const completed = localStorage.getItem(this.ENCODED_KEYS.COMPLETED);

    if (completed !== null) {
      return this.decode(completed) === 'true';
    }

    return undefined;
  }

  setCompleted(value: boolean) {
    localStorage.setItem(this.ENCODED_KEYS.COMPLETED, this.encode(String(value)));
  }

  getSecret() {
    const secret = localStorage.getItem(this.ENCODED_KEYS.SECRET);

    if (secret !== null) {
      return parseInt(this.decode(secret));
    }

    return undefined;
  }

  setSecret(secret: number) {
    localStorage.setItem(this.ENCODED_KEYS.SECRET, this.encode(secret.toString()));
  }

  getExpiredDate() {
    const expire = localStorage.getItem(this.ENCODED_KEYS.EXPIRED_DATE);

    if (expire !== null) {
      return parseInt(expire);
    }

    return undefined;
  }

  setExpiredDate(dateInMilliseconds: number) {
    localStorage.setItem(this.ENCODED_KEYS.EXPIRED_DATE, String(dateInMilliseconds));
  }

  getHowToPlayStatus() {
    const status = localStorage.getItem(this.ENCODED_KEYS.HOW_TO_PLAY);

    if (status !== null) {
      return this.decode(status) === 'true';
    }

    return undefined;
  }

  setHowToPlayStatus(status: boolean) {
    localStorage.setItem(this.ENCODED_KEYS.HOW_TO_PLAY, this.encode(String(status)));
  }

  saveDatabase(currentDatabase: IDatabase | undefined) {
    if (!currentDatabase) return;

    localStorage.setItem(this.ENCODED_KEYS.DATABASE, this.encode(JSON.stringify(currentDatabase)));
  }

  getDatabase(): IDatabase | undefined {
    const currentDatabaseStr = localStorage.getItem(this.ENCODED_KEYS.DATABASE);

    if (currentDatabaseStr !== null) {
      return JSON.parse(this.decode(currentDatabaseStr));
    }

    return undefined;
  }

  clear() {
    localStorage.removeItem(this.ENCODED_KEYS.DATABASE);

    localStorage.removeItem(this.ENCODED_KEYS.COMPLETED);

    localStorage.removeItem(this.ENCODED_KEYS.EXPIRED_DATE);

    localStorage.removeItem(this.ENCODED_KEYS.SECRET);
  }
}

const local = new LocalStorageService();

export default local;
