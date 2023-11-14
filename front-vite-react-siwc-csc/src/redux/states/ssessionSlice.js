import { createSlice } from "@reduxjs/toolkit";
import { descryptedText, encryptedText } from "../../CryptoJs/CryptoJs";
import {
  clearLocalStorage,
  getObjectLocalStorage,
  saveLocalStorage,
} from "../../LocalStorage/LocalStorage";

export let SessionEmptyState = {
  username: "",
  password: "",
  role: "",
  loading: true,
};

const SessionSlice = createSlice({
  name: "ssession",
  initialState: SessionEmptyState,
  reducers: {
    createSession: (state, action) => {
      const payload = { ...action.payload };
      const tempValue = {
        username: encryptedText(payload.username),
        password: encryptedText(payload.password),
        role: encryptedText(payload.role),
        jwt: encryptedText(payload.jwt)
      };
      if (!getObjectLocalStorage("ssession")) {
        saveLocalStorage("ssession", tempValue);
      }
      return payload;
    },
    modifySession: (state, action) => {
      const result = { ...state, ...action.payload };
      saveLocalStorage("ssession", result);
      return result;
    },
    resetSession: () => {
      clearLocalStorage("ssession");
      return SessionEmptyState;
    },
    modifyLoading: (state, action) => {
      return { ...state, loading: action.payload };
    },
  },
});

export const { createSession, updateSession, resetSession, modifyLoading } =
  SessionSlice.actions;

export const createSessionInitial = (ssession) => (dispatch) => {
  Object.assign(ssession, { loading: false });
  dispatch(createSession(ssession));
};

export default SessionSlice.reducer;
