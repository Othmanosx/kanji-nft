import data from "mock/data"
import { NFTItem } from "types"
import create from "zustand"

interface Store {
  NFTList: NFTItem[]
  search: string
  setSearch: (term: string) => void
}

export const useStore = create<Store>((set) => ({
  NFTList: data,
  search: "",
  setSearch: (term: string) =>
    set((state) => ({
      ...state,
      search: term,
    })),
}))
