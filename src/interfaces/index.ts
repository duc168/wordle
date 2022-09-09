export type LetterType = 'correct' | 'wrong-spot' | 'not-include' | 'typing';

export interface ILetter {
  id: string;
  letter: string;
  type: LetterType;
}

export interface ITable {
  id: string;
  submitted: boolean;
  data: ILetter[];
}

export type IDatabase = ITable[];
