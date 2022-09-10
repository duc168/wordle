import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { delay } from 'lodash';

import configs from '@/configs';
import messages from '@/constants/messages';
import helpers from '@/helpers';
import { IDatabase } from '@/interfaces';
import { typeToEmoji } from '@/services/emoji';
import local from '@/services/local';
import toast from '@/services/toast';
import word from '@/services/word';

const INITIAL_STATE = {
  counter: 0,
  sharePopupStatus: false,
  completed: false,
  processing: false,
  currentAttempt: 0,
  currentPosition: 0,
};

const getHowToPlayStatus = () => {
  const cached = local.getHowToPlayStatus();

  if (!cached) {
    return true;
  } else {
    return cached;
  }
};

const useWordle = () => {
  const [counter, setCounter] = useState(INITIAL_STATE.counter);

  const [howToPlayPopupStatus, setHowToPlayPopupStatus] = useState<boolean>(getHowToPlayStatus());

  const [sharePopupStatus, setSharePopupStatus] = useState<boolean>(INITIAL_STATE.sharePopupStatus);

  const [completed, setCompleted] = useState(INITIAL_STATE.completed);

  const [processing, setProcessing] = useState(INITIAL_STATE.processing);

  const [database, setDatabase] = useState<IDatabase>();

  const [keyboardDatabase, setKeyboardDatabase] = useState<IDatabase>();

  const [currentAttempt, setCurrentAttempt] = useState(INITIAL_STATE.currentAttempt);

  const [currentPosition, setCurrentPosition] = useState(INITIAL_STATE.currentPosition);

  const counterRef = useRef(0);

  const howToPlayPopupStatusRef = useRef<boolean>(false);

  const sharePopupStatusRef = useRef<boolean>(false);

  const completedRef = useRef<boolean>(false);

  const processingRef = useRef<boolean>(false);

  const databaseRef = useRef<IDatabase>();

  const keyboardDatabaseRef = useRef<IDatabase>();

  const currentAttemptRef = useRef<number>(0);

  const currentPositionRef = useRef<number>(0);

  const counterIntervalIdRef = useRef<any>();

  const lastDefaultDatabaseRef = useRef<IDatabase>();

  const currentTableId = !database ? undefined : database[currentAttempt]?.id;

  const currentTable = !database ? undefined : database[currentAttempt];

  const updateHowToPlayPopupStatus = (status: boolean | undefined) => {
    if (status === undefined) {
      setHowToPlayPopupStatus(true);
    } else {
      setHowToPlayPopupStatus(status);
    }
  };

  const resetContextState = () => {
    updateHowToPlayPopupStatus(getHowToPlayStatus());

    setSharePopupStatus(INITIAL_STATE.sharePopupStatus);

    setCompleted(INITIAL_STATE.completed);

    setProcessing(INITIAL_STATE.processing);

    setCurrentAttempt(INITIAL_STATE.currentAttempt);

    setCurrentPosition(INITIAL_STATE.currentPosition);
  };

  const initDatabase = (inputDatabase: IDatabase) => {
    setDatabase(inputDatabase);

    setKeyboardDatabase(inputDatabase);
  };

  const updateSharePopupStatus = (status: boolean | undefined) => {
    if (status === undefined) {
      setSharePopupStatus(false);
    } else {
      setSharePopupStatus(status);
    }
  };

  const syncKeyboardDatabase = () => {
    setKeyboardDatabase(databaseRef.current);
  };

  const syncPersistentData = () => {
    local.setHowToPlayStatus(howToPlayPopupStatusRef.current);

    local.saveDatabase(databaseRef.current);
  };

  const check = (customCheck: () => boolean) => {
    if (completedRef.current === true) {
      console.info(messages.ALREADY_DONE);

      return false;
    }

    if (processingRef.current === true) {
      console.error(messages.APPLICATION_IS_PROCESSING);

      // toast.info(messages.APPLICATION_IS_PROCESSING);

      return false;
    }

    const attempt = currentAttemptRef.current;

    if (attempt >= configs.tryTimes) {
      console.error(messages.EXCEED_MAX_ATTEMPT);

      toast.error(messages.EXCEED_MAX_ATTEMPT);

      return false;
    }

    const db = databaseRef.current;

    if (!db) {
      console.error(messages.NO_DATABASE);

      return false;
    }

    return customCheck();
  };

  const checkAdd = () => {
    const position = currentPositionRef.current + 1;

    if (position > configs.characterPerWord) {
      console.error(messages.EXCEED_MAX_CHARACTER);

      // toast.error(messages.EXCEED_MAX_CHARACTER);

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

    const db = databaseRef.current!;

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

    const db = databaseRef.current!;

    const clonedDatabase = helpers.clone(db);

    const attempt = currentAttemptRef.current;

    clonedDatabase[attempt].data[position] = helpers.createNewRecord('typing', '');

    setDatabase(clonedDatabase);
  };

  const compare = async (processingSeconds: number) => {
    const checked = check(() => true);

    if (!checked) return;

    setProcessing(true);

    const db = databaseRef.current!;

    const attempt = currentAttemptRef.current;

    const currentWord = db[attempt].data.map((d) => d.letter).join('');

    const result = word.compareWord(currentWord);

    if (result.length <= 0) {
      setProcessing(false);

      return;
    }

    const clonedDatabase = helpers.clone(db);

    const table = clonedDatabase[attempt];

    const newTable = table.data.map((item, idx) => ({
      ...item,
      type: result[idx],
    }));

    clonedDatabase[attempt].data = newTable;

    clonedDatabase[attempt].submitted = true;

    setDatabase(clonedDatabase);

    await helpers.delay(processingSeconds * 0.72 * 1000);

    syncPersistentData();

    syncKeyboardDatabase();

    setProcessing(false);

    if (result.filter((item) => item === 'correct').length === result.length) {
      console.info('Congratulation! You found the word');

      setCompleted(true);

      local.setCompleted(true);

      setSharePopupStatus(true);

      return;
    }

    const nextAttempt = attempt + 1;

    if (nextAttempt >= configs.tryTimes) {
      console.info("Let's try one more time");

      setCompleted(true);

      local.setCompleted(true);

      setSharePopupStatus(true);
    }

    setCurrentAttempt(nextAttempt);

    setCurrentPosition(0);
  };

  const fetchData = async () => {
    setProcessing(true);

    await word.getWord();

    setProcessing(false);
  };

  const fetchNewData = async () => {
    setProcessing(true);

    await word.getNewWord();

    setProcessing(false);
  };

  const counterCleanupHandler = () => {
    clearInterval(counterIntervalIdRef.current);

    setCounter(0);
  };

  const retry = async (defaultDatabase: IDatabase) => {
    lastDefaultDatabaseRef.current = defaultDatabase;

    counterCleanupHandler();

    local.clear();

    await helpers.delay(100);

    resetContextState();

    await helpers.delay(100);

    initDatabase(defaultDatabase);

    await fetchNewData();

    console.log('Retry successfully.');
  };

  const initCounter = () => {
    const expired = local.getExpiredDate();

    if (!expired) return;

    const remains = expired - new Date().getTime();

    const remainSeconds = Math.floor(remains / 1000);

    setCounter(remainSeconds);

    counterIntervalIdRef.current = setInterval(() => {
      if (counterRef.current <= 0) {
        counterCleanupHandler();

        const lastDefaultDb = lastDefaultDatabaseRef.current;

        if (lastDefaultDb) retry(lastDefaultDb);

        return;
      }

      setCounter((c) => c - 1);
    }, 1000);
  };

  const init = (defaultDatabase: IDatabase) => {
    lastDefaultDatabaseRef.current = defaultDatabase;

    const cached = local.getDatabase();

    const expired = local.getExpiredDate();

    if (!cached || !expired || helpers.isExpired(expired)) {
      retry(defaultDatabase);
    } else {
      const currentAttempt = cached.filter((c) => c.submitted === true).length;

      setCurrentAttempt(currentAttempt);

      if (currentAttempt === configs.tryTimes) {
        retry(defaultDatabase);

        return;
      }

      initDatabase(cached);

      const completedCache = local.getCompleted();

      if (!completedCache) return;

      setCompleted(completedCache);
    }
  };

  const share = async () => {
    const db = databaseRef.current;

    if (!db) {
      console.error('No data to share', db);

      return;
    }

    const tiles = db.map((table) => table.data.map((r) => typeToEmoji(r.type)));

    const sharingQuote = helpers.getSharingText(
      currentAttemptRef.current + 1,
      configs.tryTimes,
      tiles,
    );

    console.log(sharingQuote);

    await helpers.copyToClipboard(sharingQuote);

    toast.info(messages.COPIED_TO_CLIPBOARD);
  };

  useEffect(() => {
    if (completed === true) {
      initCounter();

      return () => {
        counterCleanupHandler();
      };
    }
  }, [completed]);

  useEffect(() => {
    counterRef.current = counter;
  }, [counter]);

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

  useEffect(() => {
    howToPlayPopupStatusRef.current = howToPlayPopupStatus;
  }, [howToPlayPopupStatus]);

  useEffect(() => {
    sharePopupStatusRef.current = sharePopupStatus;
  }, [sharePopupStatus]);

  // initialize
  useEffect(() => {
    fetchData();
  }, []);

  return {
    howToPlayPopupStatus,
    updateHowToPlayPopupStatus,
    sharePopupStatus,
    updateSharePopupStatus,

    setCurrentAttempt,
    setCurrentPosition,

    counter,
    setCounter,

    processing,
    currentTableId,
    currentTable,
    currentAttempt,
    database,
    keyboardDatabase,
    completed,

    init,
    addLetter,
    removeLetter,
    compare,

    retry,
    share,
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
