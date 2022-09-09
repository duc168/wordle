export type LetterType = 'correct' | 'wrong-spot' | 'not-include' | 'typing';

export interface ITileProps {
  letterWidth: string;
  letterHeight: string;
  processingSeconds: number;
}

export interface ILetterProps extends ITileProps {
  letter: string;
  type: LetterType;
  idx?: number;
  submitted?: boolean;
}

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
