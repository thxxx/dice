import create from "zustand";
import { ChatType } from "../pages/chat";

type Chat = {
  type: ChatType;
  text: string;
};

export type UserState = {
  chats: Chat[];
  setChats: (by: Chat[]) => void;
  darkMode: boolean;
  setDarkMode: (by: boolean) => void;
};

export const useChatStore = create<UserState>((set) => ({
  chats: [
    {
      type: ChatType.BOT,
      text: "Hello you can search any restaurant you want in any way. Just tell Me!",
    },
  ],
  setChats: (by) => {
    set((state) => ({ ...state, chats: by }));
  },
  darkMode: false,
  setDarkMode: (by) => {
    set((state) => ({ ...state, darkMode: by }));
  },
}));
