export interface NFTItem {
  id: number
  item: string
  status: "Complete" | "Incomplete"
  properties: {
    id: number
    name: string
    value: string
  }[]
  image: string
}
export interface ThProps {
  children: React.ReactNode
  reversed?: boolean
  sorted?: boolean
  onSort?(): void
}
