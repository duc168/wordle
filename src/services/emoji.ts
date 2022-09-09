import { LetterType } from '@/interfaces';

export const typeToEmoji = (type: LetterType) => {
  if (type === 'correct') return '🟩';

  if (type === 'wrong-spot') return '🟨';

  if (type === 'not-include') return '\u2B1B';

  return '';
};
