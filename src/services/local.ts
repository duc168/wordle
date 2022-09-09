import { IDatabase } from '@/interfaces';

class LocalStorageService {
  private KEYS = {
    HOW_TO_PLAY: 'show-how-to-play',
    DATABASE: 'database',
    SECRET: 'secret',
    EXPIRED_DATE: 'expired-date',
    COMPLETED: 'completed',
  };

  getCompleted() {
    const completed = localStorage.getItem(this.KEYS.COMPLETED);

    if (completed !== null) {
      return completed === 'true';
    }

    return undefined;
  }

  setCompleted(value: boolean) {
    localStorage.setItem(this.KEYS.COMPLETED, String(value));
  }

  getSecret() {
    const secret = localStorage.getItem(this.KEYS.SECRET);

    if (secret !== null) {
      return parseInt(secret);
    }

    return undefined;
  }

  setSecret(secret: number) {
    localStorage.setItem(this.KEYS.SECRET, secret.toString());
  }

  getExpiredDate() {
    const expire = localStorage.getItem(this.KEYS.EXPIRED_DATE);

    if (expire !== null) {
      return parseInt(expire);
    }

    return undefined;
  }

  setExpiredDate(dateInMilliseconds: number) {
    localStorage.setItem(this.KEYS.EXPIRED_DATE, String(dateInMilliseconds));
  }

  getHowToPlayStatus() {
    const status = localStorage.getItem(this.KEYS.HOW_TO_PLAY);

    if (status !== null) {
      return status === 'true';
    }

    return undefined;
  }

  setHowToPlayStatus(status: boolean) {
    localStorage.setItem(this.KEYS.HOW_TO_PLAY, String(status));
  }

  saveDatabase(currentDatabase: IDatabase | undefined) {
    if (!currentDatabase) return;

    localStorage.setItem(this.KEYS.DATABASE, JSON.stringify(currentDatabase));
  }

  getDatabase(): IDatabase | undefined {
    const currentDatabaseStr = localStorage.getItem(this.KEYS.DATABASE);

    if (currentDatabaseStr !== null) {
      return JSON.parse(currentDatabaseStr);
    }

    return undefined;
  }

  clear() {
    localStorage.removeItem(this.KEYS.DATABASE);

    localStorage.removeItem(this.KEYS.COMPLETED);

    localStorage.removeItem(this.KEYS.EXPIRED_DATE);

    localStorage.removeItem(this.KEYS.SECRET);
  }
}

const local = new LocalStorageService();

export default local;
