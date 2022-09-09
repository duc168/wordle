import { cloneDeep } from 'lodash';
import { v4 } from 'uuid';

import { IDatabase, ILetter, ITable, LetterType } from '@/interfaces';

const createRandomKey = () => {
  return v4();
};

const createArray = (numberOfItem: number) => {
  return Array.from(Array(numberOfItem).keys());
};

const createNewRecord = (type: LetterType, letter: string): ILetter => {
  return {
    id: createRandomKey(),
    letter,
    type,
  };
};

const createNewTable = (numberOfRecord: number, defaultRecordData: ILetter): ITable => {
  const data: ILetter[] = createArray(numberOfRecord).map(() => ({
    ...defaultRecordData,
    id: createRandomKey(),
  }));

  return {
    id: createRandomKey(),
    submitted: false,
    data,
  };
};

const createNewDatabase = (numberOfTable: number, tableData: ITable): IDatabase => {
  return createArray(numberOfTable).map(() =>
    cloneDeep({
      ...tableData,
      id: createRandomKey(),
    }),
  );
};

const clone = <T>(data: T): T => {
  return cloneDeep(data);
};

const convertMinutesToMilliseconds = (minutes: number) => {
  return minutes * 60 * 1000;
};

const isExpired = (timeInMilliseconds: number) => {
  const currentTime = new Date().getTime();

  return timeInMilliseconds <= currentTime;
};

const getTwoDigits = (input: number) => {
  if (input < 10) return `0${input}`;

  return input;
};

const getToday = () => {
  const now = new Date();

  const year = now.getFullYear();

  const month = now.getMonth();

  const day = now.getDate();

  const hour = now.getHours();

  const minute = now.getMinutes();

  const second = now.getSeconds();

  const YYYY = year;

  const MM = getTwoDigits(month + 1);

  const DD = getTwoDigits(day);

  const hh = getTwoDigits(hour);

  const mm = getTwoDigits(minute);

  const ss = getTwoDigits(second);

  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
};

const getSharingText = (attemptCount: number, maxAttempt: number, tiles: string[][]) => {
  const infoText = `Wordle ${getToday()} ${attemptCount}/${maxAttempt}`;

  const tilesText = tiles.map((row) => row.join('')).join('\n');

  return [infoText, tilesText].join('\n\n');
};

const delay = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });
};

const copyToClipboard = (text: string) => {
  return navigator.clipboard.writeText(text);
};

export default {
  createRandomKey,
  createArray,
  createNewRecord,
  createNewTable,
  createNewDatabase,
  clone,
  convertMinutesToMilliseconds,
  isExpired,

  getSharingText,
  delay,
  copyToClipboard,
};
