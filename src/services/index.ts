import configs from "@/configs";
import axios, { AxiosInstance, AxiosResponse } from "axios";

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

    public compareWord() {
        console.log("Compare Word");
    }

}

const services = new Service();

export default services;