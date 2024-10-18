import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface HpState {
  currentHp: number;
  maxHp: number;
}

const initialState: HpState = {
  currentHp: 5,
  maxHp: 5,
};

export const hpSlice = createSlice({
  name: "hp",
  initialState,

  reducers: {
    incrementHp: (state) => {
      if (state.currentHp < state.maxHp) {
        state.currentHp += 1;
      }
    },
    decrementHp: (state) => {
      if (state.currentHp > 0) {
        state.currentHp -= 1;
      }
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.currentHp = Math.min(state.currentHp + action.payload, state.maxHp);
    },
    setHp: (state, action: PayloadAction<number>) => {
      state.currentHp = Math.min(action.payload, state.maxHp);
    },
    setMaxHp: (state, action: PayloadAction<number>) => {
      state.maxHp = action.payload;
      if (state.currentHp > state.maxHp) {
        state.currentHp = state.maxHp;
      }
    },
  },
});

export const { incrementHp, decrementHp, incrementByAmount, setHp, setMaxHp } =
  hpSlice.actions;

export const selectHp = (state: RootState) => state.hp;

export default hpSlice.reducer;
