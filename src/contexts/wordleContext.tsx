import configs from "@/configs";
import constants from "@/constants";
import helpers from "@/helpers";
import { IDatabase } from "@/interfaces";
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
  const [database, setDatabase] = useState<IDatabase>(
    constants.DEFAULT_DATABASE
  );

  const [currentAttempt, setCurrentAttempt] = useState(0);

  const [currentPosition, setCurrentPosition] = useState(0);

  const databaseRef = useRef<IDatabase>(constants.DEFAULT_DATABASE);

  const currentAttemptRef = useRef<number>(0);

  const currentPositionRef = useRef<number>(0);

  const checkAdd = () => {
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

  useEffect(() => {
    databaseRef.current = database;
  }, [database]);

  useEffect(() => {
    currentAttemptRef.current = currentAttempt;
  }, [currentAttempt]);

  useEffect(() => {
    currentPositionRef.current = currentPosition;
  }, [currentPosition]);

  return {
    database,
    addLetter,
    removeLetter,
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
