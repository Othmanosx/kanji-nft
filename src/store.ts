import data from "mock/data"
import { NFTItem } from "types"
import create from "zustand"

interface Store {
  NFTList: NFTItem[]
  setSingleNFTItem: (NFTitem: NFTItem) => void
  setMultipleNFTItem: (NFTitem: NFTItem) => void
  search: string
  setSearch: (term: string) => void
  selection: number[]
  setSelection: (selection: number[]) => void
  isDrawerOpen: boolean
  toggleDrawer: () => void
  drawerItem: number | null
  setDrawerItem: (id: number) => void
}

export const useStore = create<Store>((set) => ({
  NFTList: data,
  setSingleNFTItem: (NFTitem: NFTItem) =>
    set((state) => {
      const newList = state.NFTList.map((item) =>
        item.id === NFTitem.id ? { ...NFTitem, status: "Complete" } : item
      )
      return {
        ...state,
        NFTList: newList,
      }
    }),
  setMultipleNFTItem: (NFTitem: NFTItem) =>
    set((state) => {
      const newProperties = NFTitem.properties
      const newList = state.NFTList.map((item) => {
        if (item.id && state.selection.includes(item.id))
          return {
            ...item,
            status: "Complete",
            properties: newProperties,
          }
        return item
      })
      return {
        ...state,
        NFTList: newList,
      }
    }),
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
  isDrawerOpen: false,
  toggleDrawer: () =>
    set((state) => ({
      ...state,
      isDrawerOpen: !state.isDrawerOpen,
      drawerItem: state.isDrawerOpen ? null : state.drawerItem,
    })),
  drawerItem: null,
  setDrawerItem: (id?: number) =>
    set((state) => ({
      ...state,
      drawerItem: id,
    })),
}))
