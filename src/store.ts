import data from "mock/data"
import { NFTItem } from "types"
import create from "zustand"

interface Store {
  NFTList: NFTItem[]
  search: string
  setSearch: (term: string) => void
  selection: number[]
  setSelection: (selection: number[]) => void
}

export const useStore = create<Store>((set) => ({
  NFTList: data,
  search: "",
  setSearch: (term: string) =>
    set((state) => ({
      ...state,
      selection: [],
      search: term,
    })),
  selection: [],
  setSelection: (selection: number[]) =>
    set((state) => ({
      ...state,
      selection,
    })),
}))
