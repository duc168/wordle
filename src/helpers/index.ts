import { cloneDeep } from 'lodash';
import { v4 } from 'uuid';

import { IDatabase, ILetter, ITable, LetterType } from '@/interfaces';

const createRandomKey = () => {
  return v4();
};

const createArray = (numberOfItem: number) => {
  return Array.from(Array(numberOfItem).keys());
};

export const createNewRecord = (type: LetterType, letter: string): ILetter => {
  return {
    id: createRandomKey(),
    letter,
    type,
  };
};

export const createNewTable = (numberOfRecord: number, defaultRecordData: ILetter): ITable => {
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

export const createNewDatabase = (numberOfTable: number, tableData: ITable): IDatabase => {
  return createArray(numberOfTable).map(() =>
    cloneDeep({
      ...tableData,
      id: createRandomKey(),
    }),
  );
};

export const clone = <T>(data: T): T => {
  return cloneDeep(data);
};

export default {
  createRandomKey,
  createArray,
  createNewRecord,
  createNewTable,
  createNewDatabase,
  clone,
};
