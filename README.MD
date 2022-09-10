# A Wordle clone app
## _Web Frontend Engineer Assignment_

Original game: [https://www.nytimes.com/games/wordle/index.html][original-game-url]

## Features

- Basic features are the same as Wordle.
- The actual keyboard input and UI keyboard click works normally.
- A word cannot exceed 5 characters.
- An error toast is displayed if one submits without filling in 5 characters.
- An error toast is displayed and one cannot submit a word if the typed-in word is invalid
- The background colors of the tiles and the keyboard change after submission.
- The number of submissions cannot exceed 6 times.
- The share pop-up will be displayed if one submits for the 6th time or get the correct word.
- The result text is copied to clipboard if one clicks on the share button in the share pop-up (Below is the text format of the result sharing text)
    ```javascript
    Wordle {YYYY-MM-DD hh:mm:ss} {attempt count}/6

    (Attempted tiles shown in square emojis)
    
    // ex)
    // Wordle 2022-03-04 14:52:08 5/6
    // 
    // ⬛⬛⬛⬛🟩
    // 🟨⬛⬛⬛⬛
    // 🟩🟩⬛⬛🟨
    // 🟩🟩🟩🟩🟩
    ```
- Click on the try again button in the share pop-up to initialize the correct words and submitted words. Then the pop-up is closed.
- Click on the close button in the share pop-up to close the pop-up.
- Words allowed in the game is limited to the words in words.json file.

## Tech


- [react](https://reactjs.org/) - A JavaScript library for building user interfaces
- [styled-components](https://styled-components.com/) - Use the best bits of ES6 and CSS to style your apps without stress
- [reactjs-popup](https://react-popup.elazizi.com/) -A simple React popup component.
- [react-toastify](https://fkhadra.github.io/react-toastify/introduction) - An easy-to-setup React component for toasting
- [lodash](https://lodash.com/) - A modern JavaScript utility library delivering modularity, performance & extras.
- [framer-motion](https://www.framer.com/motion/) - A production-ready motion library for React
- [axios](https://axios-http.com/) - A simple promise based HTTP client for the browser and node.js
- [uuid](https://www.npmjs.com/package/uuid) - A tool to create random UUID

Otherwise, it uses:
- [eslint](https://eslint.org/) and [prettier](https://prettier.io/) for coding convention.
- [typescript](https://www.typescriptlang.org/) -  A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale
- [vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [jest](https://jestjs.io/) - A delightful JavaScript Testing Framework with a focus on simplicity 

## Installation

Requires [Node.js](https://nodejs.org/) v14.18+ to run.

Install the dependencies and devDependencies and start the development server. ([http://127.0.0.1:9999/](http://127.0.0.1:9999/))

```sh
cd <project-path>
yarn 
yarn dev
```

For production environments preview ([http://127.0.0.1:8080/](http://127.0.0.1:8080/))

```sh
yarn
yarn build
yarn preview
```
