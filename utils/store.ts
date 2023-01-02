import create from "zustand";
import { ChatType } from "../pages/chat";
import { ChatInputType } from "../components/Chat/ChatBubble";

export type QuestionType = {
  key: string;
  answerList: string[];
  answer: string;
};

export type UserState = {
  chats: ChatInputType[];
  darkMode: boolean;
  key: string;
  settingDate: Date;
  people: number;
  time: string;
  filtered: QuestionType[];
  setChats: (by: ChatInputType[]) => void;
  setDarkMode: (by: boolean) => void;
  setKey: (by: string) => void;
  setDate: (by: Date) => void;
  setPeople: (by: number) => void;
  setTime: (by: string) => void;
  setFiltered: (by: QuestionType[] | undefined) => void;
};

export const useChatStore = create<UserState>((set) => ({
  chats: [
    {
      type: ChatType.BOT,
      text: "Hello you can search any restaurant you want in any way. Just tell Me!",
    },
  ],
  darkMode: false,
  key: "",
  settingDate: new Date(),
  people: 2,
  time: "",
  filtered: [],
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
}));
