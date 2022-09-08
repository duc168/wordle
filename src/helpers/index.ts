import { IDatabase, ILetter, ITable, LetterType } from '@/interfaces';
import { cloneDeep } from 'lodash';
import { v4 } from 'uuid';


const createArray = (numberOfItem: number) => {
    return Array.from(Array(numberOfItem).keys());
}

export const createNewRecord = (type: LetterType, letter: string): ILetter => {
    return {
        id: v4(),
        letter,
        type,
    }
}

export const createNewTable = (numberOfRecord: number, defaultRecordData: ILetter): ITable => {
    const data: ILetter[] = createArray(numberOfRecord).map(() => ({
        ...defaultRecordData,
        id: v4(),
    }));
    return {
        id: v4(),
        submitted: false,
        data,
    }
}

export const createNewDatabase = (numberOfTable: number, tableData: ITable): IDatabase => {
    return createArray(numberOfTable).map(() => cloneDeep({
        ...tableData,
        id: v4(),
    }));
}


export const clone = <T>(data: T): T => {
    return cloneDeep(data);
}

export default {
    createArray,
    createNewRecord,
    createNewTable,
    createNewDatabase,

    clone,
}