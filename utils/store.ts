import create from "zustand";

enum ChatType {
  BOT = "bot",
  USER = "user",
  RESULT = "result",
}

type Chat = {
  type: ChatType;
  text: string;
};

export type UserState = {
  chats: Chat[];
  setChats: (by: Chat[]) => void;
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
}));
