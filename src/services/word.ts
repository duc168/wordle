import axios, { AxiosInstance, AxiosResponse } from 'axios';

import configs from '@/configs';
import helpers from '@/helpers';
import { LetterType } from '@/interfaces';

import local from './local';
import toast from './toast';

class WordService {
  private instance: AxiosInstance;
  private words: string[];
  private word: string;
  private wordIndex: number;
  private expiredTime: number;
  constructor() {
    this.instance = axios.create();

    this.words = [];

    this.word = '';

    this.wordIndex = -1;

    this.expiredTime = -1;
  }

  private async getWords() {
    try {
      const response: AxiosResponse<string[], any> = await this.instance.get(configs.wordsSource);

      return response.data;
    } catch (error) {
      console.error('Error getWords', error);

      toast.error('Can not get word');

      return [];
    }
  }

  private async getRandomWord() {
    try {
      this.words = await this.getWords();

      this.wordIndex = Math.floor(Math.random() * this.words.length);

      this.word = this.words[this.wordIndex];

      this.expiredTime = new Date().getTime() + helpers.convertMinutesToMilliseconds(10);

      console.log('Cheating: ', this.word);

      local.setSecret(this.wordIndex);

      local.setExpiredDate(this.expiredTime);

      return true;
    } catch (error) {
      console.log('Error getRandomWord', error);

      toast.error('Can not get random word');

      return false;
    }
  }

  private async getCachedWord() {
    try {
      this.words = await this.getWords();

      const secret = local.getSecret();

      const expiredDate = local.getExpiredDate();

      if (!secret) throw new Error('No secret');

      if (!expiredDate) throw new Error('No expired date');

      if (helpers.isExpired(expiredDate) === true) throw new Error('Secret is expired.');

      this.wordIndex = secret;

      this.word = this.words[this.wordIndex];

      return true;
    } catch (error) {
      console.log('Error getRandomWord', error);

      toast.error('Can not get random word');

      return false;
    }
  }

  public async getWord() {
    const secret = local.getSecret();

    const expiredDate = local.getExpiredDate();

    if (!secret || !expiredDate || helpers.isExpired(expiredDate)) {
      return await this.getRandomWord();
    } else {
      return await this.getCachedWord();
    }
  }

  public async getNewWord() {
    return await this.getRandomWord();
  }

  public compareWord(inputWord: string): LetterType[] {
    if (inputWord.length < configs.characterPerWord) {
      const errorMessage = 'Not enough letter';

      console.error(errorMessage);

      toast.error(errorMessage);

      return [];
    }

    if (!this.words.includes(inputWord)) {
      const errorMessage = 'Not in the word list';

      console.error(errorMessage);

      toast.error(errorMessage);

      return [];
    }

    const result: LetterType[] = [];

    for (let i = 0; i < inputWord.length; i++) {
      const currentLetter = inputWord[i];

      const isIncluded = this.word.includes(currentLetter);

      if (isIncluded === true) {
        const sameIndex = this.word[i] === currentLetter;

        if (sameIndex === true) {
          result[i] = 'correct';
        } else {
          result[i] = 'wrong-spot';
        }
      } else {
        result[i] = 'not-include';
      }
    }
    return result;
  }
}

const wordService = new WordService();

export default wordService;
