export interface NFTItem {
  id: number
  item?: string
  status?: string
  properties: {
    id: number
    name: string
    value: string
  }[]
  image?: string
}
export interface ThProps {
  children: React.ReactNode
  reversed?: boolean
  sorted?: boolean
  onSort?(): void
}

export interface Values {
  [key: string]: string[]
}
