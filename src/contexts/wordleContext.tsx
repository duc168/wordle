import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import configs from '@/configs';
import constants from '@/constants';
import messages from '@/constants/messages';
import helpers from '@/helpers';
import { IDatabase } from '@/interfaces';
import toast from '@/services/toast';
import word from '@/services/word';

const useWordle = () => {
  const [completed, setCompleted] = useState(false);

  const [processing, setProcessing] = useState(false);

  const [database, setDatabase] = useState<IDatabase>();

  const [keyboardDatabase, setKeyboardDatabase] = useState<IDatabase>();

  const [currentAttempt, setCurrentAttempt] = useState(0);

  const [currentPosition, setCurrentPosition] = useState(0);

  const completedRef = useRef<boolean>(false);

  const processingRef = useRef<boolean>(false);

  const databaseRef = useRef<IDatabase>();

  const keyboardDatabaseRef = useRef<IDatabase>();

  const currentAttemptRef = useRef<number>(0);

  const currentPositionRef = useRef<number>(0);

  const currentTableId = !database ? undefined : database[currentAttempt]?.id;

  const currentTable = !database ? undefined : database[currentAttempt];

  const initDatabase = (inputDatabase: IDatabase) => {
    setDatabase(inputDatabase);

    setKeyboardDatabase(inputDatabase);
  };

  const check = (customCheck: () => boolean) => {
    if (completedRef.current === true) {
      console.info(messages.ALREADY_DONE);

      return false;
    }

    if (processingRef.current === true) {
      console.error(messages.APPLICATION_IS_PROCESSING);

      toast.info(messages.APPLICATION_IS_PROCESSING);

      return false;
    }

    const attempt = currentAttemptRef.current;

    if (attempt >= configs.tryTimes) {
      console.error(messages.EXCEED_MAX_ATTEMPT);

      toast.error(messages.EXCEED_MAX_ATTEMPT);

      return false;
    }

    return customCheck();
  };

  const checkAdd = () => {
    const position = currentPositionRef.current + 1;

    if (position > configs.characterPerWord) {
      console.error(messages.EXCEED_MAX_CHARACTER);

      toast.error(messages.EXCEED_MAX_CHARACTER);

      return false;
    }

    return true;
  };

  const checkRemove = () => {
    const position = currentPositionRef.current - 1;

    if (position < 0) {
      console.error(messages.REACH_MIN_CHARACTER);

      return false;
    }

    return true;
  };

  const addLetter = (letter: string) => {
    const checked = check(checkAdd);

    if (!checked) return;

    const position = currentPositionRef.current + 1;

    setCurrentPosition(currentPositionRef.current + 1);

    const db = databaseRef.current;

    if (!db) return;

    const clonedDatabase = helpers.clone(db);

    const attempt = currentAttemptRef.current;

    clonedDatabase[attempt].data[position - 1] = helpers.createNewRecord('typing', letter);

    setDatabase(clonedDatabase);
  };

  const removeLetter = () => {
    const checked = check(checkRemove);

    if (!checked) return;

    const position = currentPositionRef.current - 1;

    setCurrentPosition(position);

    const db = databaseRef.current;

    if (!db) return;

    const clonedDatabase = helpers.clone(db);

    const attempt = currentAttemptRef.current;

    clonedDatabase[attempt].data[position] = helpers.createNewRecord('typing', '');

    setDatabase(clonedDatabase);
  };

  const syncDatabase = () => {
    setKeyboardDatabase(databaseRef.current);
  };

  const compare = () => {
    const checked = check(() => true);

    if (!checked) return;

    setProcessing(true);

    const db = databaseRef.current;

    if (!db) return;

    const attempt = currentAttemptRef.current;

    const currentWord = db[attempt].data.map((d) => d.letter).join('');

    const result = word.compareWord(currentWord);

    if (result.length > 0) {
      const clonedDatabase = helpers.clone(db);

      const table = clonedDatabase[attempt];

      const newTable = table.data.map((item, idx) => ({
        ...item,
        type: result[idx],
      }));

      clonedDatabase[attempt].data = newTable;

      clonedDatabase[attempt].submitted = true;

      setDatabase(clonedDatabase);

      setTimeout(() => {
        setProcessing(false);

        syncDatabase();

        if (result.filter((item) => item === 'correct').length === result.length) {
          console.info('Congratulation!');

          setCompleted(true);

          return;
        }

        const nextAttempt = attempt + 1;

        setCurrentAttempt(nextAttempt);

        setCurrentPosition(0);
      }, constants.COMPARE_SECONDS * 1000);
    } else {
      setProcessing(false);
    }
  };

  const fetchData = () => {
    setProcessing(true);

    word.getRandomWord().then((result) => {
      console.log('Get Random Word', result);

      setProcessing(false);
    });
  };

  useEffect(() => {
    completedRef.current = completed;
  }, [completed]);

  useEffect(() => {
    processingRef.current = processing;
  }, [processing]);

  useEffect(() => {
    databaseRef.current = database;
  }, [database]);

  useEffect(() => {
    keyboardDatabaseRef.current = keyboardDatabase;
  }, [keyboardDatabase]);

  useEffect(() => {
    currentAttemptRef.current = currentAttempt;
  }, [currentAttempt]);

  useEffect(() => {
    currentPositionRef.current = currentPosition;
  }, [currentPosition]);

  // initialize
  useEffect(() => {
    fetchData();
  }, []);

  return {
    processing,
    currentTableId,
    currentTable,
    currentAttempt,
    database,
    keyboardDatabase,
    completed,

    initDatabase,
    addLetter,
    removeLetter,
    compare,
  };
};

export type WordleContextType = ReturnType<typeof useWordle>;

const context = createContext<WordleContextType | null>(null);

export const WordleContextProvider: React.FC<any> = ({ children }) => {
  const value = useWordle();

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useWordleContext = () => {
  const value = useContext(context);

  if (!value) {
    throw new Error('useWordleContext must be used inside WordleContextProvider');
  }

  return value;
};
