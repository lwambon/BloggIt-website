import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";

function userState(set) {
  return {
    user: null,

    setUser: function (userInformationObj) {
      set(() => {
        return {
          user: userInformationObj,
        };
      });
    },

    logoutUser: function () {
      set(() => {
        return { user: null };
      });
    },
  };
}

const useUserState = create(
  devtools(persist(userState, { name: "auth-storage" })),
);

export default useUserState;
