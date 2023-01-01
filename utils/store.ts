import create from "zustand";
import { ChatType } from "../pages/chat";
import { ChatInputType } from "../components/Chat/ChatBubble";

export type UserState = {
  chats: ChatInputType[];
  darkMode: boolean;
  key: string;
  setChats: (by: ChatInputType[]) => void;
  setDarkMode: (by: boolean) => void;
  setKey: (by: string) => void;
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
  setChats: (by) => {
    set((state) => ({ ...state, chats: by }));
  },
  setDarkMode: (by) => {
    set((state) => ({ ...state, darkMode: by }));
  },
  setKey: (by) => {
    set((state) => ({ ...state, key: by }));
  },
}));
