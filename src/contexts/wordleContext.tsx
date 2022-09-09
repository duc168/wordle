import configs from "@/configs";
import constants from "@/constants";
import helpers from "@/helpers";
import { IDatabase } from "@/interfaces";
import word from "@/services/word";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRef } from "react";

const useWordle = () => {
  const [completed, setCompleted] = useState(false);

  const [processing, setProcessing] = useState(false);
  const [database, setDatabase] = useState<IDatabase>(
    constants.DEFAULT_DATABASE
  );

  const [keyboardDatabase, setKeyboardDatabase] = useState<IDatabase>(
    constants.DEFAULT_DATABASE
  );

  const [currentAttempt, setCurrentAttempt] = useState(0);

  const [currentPosition, setCurrentPosition] = useState(0);

  const completedRef = useRef<boolean>(false);

  const processingRef = useRef<boolean>(false);

  const databaseRef = useRef<IDatabase>(constants.DEFAULT_DATABASE);

  const keyboardDatabaseRef = useRef<IDatabase>(constants.DEFAULT_DATABASE);

  const currentAttemptRef = useRef<number>(0);

  const currentPositionRef = useRef<number>(0);

  const checkAdd = () => {
    if (completedRef.current === true) {
      console.info("Completed!");
      return false;
    }
    if (processingRef.current === true) {
      console.error("Is processing, please wait");
      return false;
    }
    const attempt = currentAttemptRef.current;
    if (attempt >= configs.tryTimes) {
      console.error("Exceed maximum attempt", attempt);
      return false;
    }
    const position = currentPositionRef.current + 1;
    if (position > configs.characterPerWord) {
      console.error("Exceed maximum character", position - 1);
      return false;
    }
    return true;
  };

  const checkRemove = () => {
    if (completedRef.current === true) {
      console.info("Completed!");
      return false;
    }
    if (processingRef.current === true) {
      console.error("Is processing, please wait");
      return false;
    }
    const attempt = currentAttemptRef.current;
    if (attempt >= configs.tryTimes) {
      console.error("Exceed maximum attempt", currentAttemptRef.current);
      return false;
    }
    const position = currentPositionRef.current - 1;
    if (position < 0) {
      console.error("No character to remove", position + 1);
      return false;
    }
    return true;
  };

  const checkCompare = () => {
    if (completedRef.current === true) {
      console.info("Completed!");
      return false;
    }
    if (processingRef.current === true) {
      console.error("Is processing, please wait");
      return false;
    }
    const attempt = currentAttemptRef.current;
    if (attempt >= configs.tryTimes) {
      console.error("Exceed maximum attempt", currentAttemptRef.current);
      return false;
    }
    return true;
  };

  const addLetter = (letter: string) => {
    const checked = checkAdd();
    if (!checked) return;
    const position = currentPositionRef.current + 1;
    setCurrentPosition(currentPositionRef.current + 1);
    const db = databaseRef.current;
    const clonedDatabase = helpers.clone(db);
    const attempt = currentAttemptRef.current;
    clonedDatabase[attempt].data[position - 1] = helpers.createNewRecord(
      "typing",
      letter
    );
    setDatabase(clonedDatabase);
  };

  const removeLetter = () => {
    const checked = checkRemove();
    if (!checked) return;
    const position = currentPositionRef.current - 1;
    setCurrentPosition(position);
    const db = databaseRef.current;
    const clonedDatabase = helpers.clone(db);
    const attempt = currentAttemptRef.current;
    clonedDatabase[attempt].data[position] = helpers.createNewRecord(
      "typing",
      ""
    );
    setDatabase(clonedDatabase);
  };

  const compare = () => {
    const check = checkCompare();
    if (!check) return;
    setProcessing(true);
    const db = databaseRef.current;
    const attempt = currentAttemptRef.current;
    const currentWord = db[attempt].data.map((d) => d.letter).join("");
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
        if (
          result.filter((item) => item === "correct").length === result.length
        ) {
          console.info("Congratulation!");
          setCompleted(true);
          return;
        }
        const nextAttempt = attempt + 1;
        setCurrentAttempt(nextAttempt);
        setCurrentPosition(0);
      }, constants.COMPARE_SECONDS * 1000);
      // after processing turn to false, check if there is any attempt left, if yes, add one
    } else {
      setProcessing(false);
    }
  };

  const fetchData = () => {
    setProcessing(true);
    word.getRandomWord().then((result) => {
      console.log("Get Random Word", result);
      setProcessing(false);
    });
  };

  const syncDatabase = () => {
    setKeyboardDatabase(databaseRef.current);
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
    currentTableId: database[currentAttempt]?.id,
    currentTable: database[currentAttempt],
    currentAttempt,
    database,
    keyboardDatabase,
    completed,
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
    throw new Error(
      "useWordleContext must be used inside WordleContextProvider"
    );
  }
  return value;
};
