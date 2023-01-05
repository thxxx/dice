import create from "zustand";
import { ChatType } from "../pages/chat";
import { ChatInputType } from "../components/Chat/ChatBubble";

export type QuestionType = {
  key: string;
  answerList: string[];
  answer: string | string[];
};

export const FIRST_QUESTION = {
  type: ChatType.BOT,
  text: "Hello you can search any restaurant you want in any way. Just tell Me!",
};

export type UserState = {
  chats: ChatInputType[];
  darkMode: boolean;
  key: string;
  settingDate: Date;
  people: number;
  time: string;
  filtered: QuestionType[];
  validNum: number;
  dict: Object;
  answer: string[];
  setChats: (by: ChatInputType[]) => void;
  setDarkMode: (by: boolean) => void;
  setKey: (by: string) => void;
  setDate: (by: Date) => void;
  setPeople: (by: number) => void;
  setTime: (by: string) => void;
  setFiltered: (by: QuestionType[] | undefined) => void;
  setValidNum: (by: number) => void;
  setDict: (by: Object) => void;
  setAnswer: (by: string[]) => void;
};

export const useChatStore = create<UserState>((set) => ({
  chats: [FIRST_QUESTION],
  darkMode: false,
  key: "",
  settingDate: new Date(),
  people: 2,
  time: "",
  filtered: [],
  validNum: 0,
  dict: {},
  answer: [],
  setChats: (by) => {
    set((state) => ({ ...state, chats: by }));
  },
  setDarkMode: (by) => {
    set((state) => ({ ...state, darkMode: by }));
  },
  setKey: (by) => {
    set((state) => ({ ...state, key: by }));
  },
  setDate: (by) => {
    set((state) => ({ ...state, settingDate: by }));
  },
  setPeople: (by) => {
    set((state) => ({ ...state, people: by }));
  },
  setTime: (by) => {
    set((state) => ({ ...state, time: by }));
  },
  setFiltered: (by) => {
    set((state) => ({ ...state, filtered: by }));
  },
  setValidNum: (by) => {
    set((state) => ({ ...state, validNum: by }));
  },
  setDict: (by) => {
    set((state) => ({ ...state, dict: by }));
  },
  setAnswer: (by) => {
    set((state) => ({ ...state, answer: by }));
  },
}));
