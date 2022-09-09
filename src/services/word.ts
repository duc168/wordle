import axios, { AxiosInstance, AxiosResponse } from 'axios';

import configs from '@/configs';
import { LetterType } from '@/interfaces';

class Service {
  private instance: AxiosInstance;
  private words: string[];
  private word: string;
  constructor() {
    this.instance = axios.create();
    this.words = [];
    this.word = '';
  }

  private async getWords() {
    try {
      const response: AxiosResponse<string[], any> = await this.instance.get(configs.wordsSource);
      return response.data;
    } catch (error) {
      console.error('Error getWords', error);
      return [];
    }
  }

  public async getRandomWord() {
    try {
      this.words = await this.getWords();
      this.word = this.words[Math.floor(Math.random() * this.words.length)];
      console.log('randomWord', this.word);
      return true;
    } catch (error) {
      console.log('Error getRandomWord', error);
      return false;
    }
  }

  public compareWord(inputWord: string): LetterType[] {
    if (inputWord.length < configs.characterPerWord) {
      const errorMessage = 'Not enough letter';
      console.error(errorMessage);
      return [];
    }
    if (!this.words.includes(inputWord)) {
      const errorMessage = 'Not in the word list';
      console.error(errorMessage);
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

const services = new Service();

export default services;
