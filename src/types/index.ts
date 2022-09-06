export interface NFTItem {
  id: number
  item: string
  status: "Complete" | "Incomplete"
  properties: {
    ["Eyes"]?: Array<"Green" | "Black" | "Blue">
    ["Hair"]?: Array<"Blond" | "Ginger" | "Black" | "Brown">
    ["Rarity"]?: Array<"Rare" | "Very Rare" | "Common">
  }
  image: string
}
export interface ThProps {
  children: React.ReactNode
  reversed?: boolean
  sorted?: boolean
  onSort?(): void
}
