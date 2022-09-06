import { NFTItem } from "types"

export function filterData(data: NFTItem[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter(
    (object) =>
      object.item.toLowerCase().includes(query) ||
      JSON.stringify(object.properties).toLowerCase().includes(query)
  )
}

export function sortData(
  data: NFTItem[],
  payload: { sortBy: keyof NFTItem | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload

  if (sortBy === "item" || sortBy === "status") {
    return filterData(
      [...data].sort((a, b) => {
        if (payload.reversed) {
          return b[sortBy].localeCompare(a[sortBy])
        }

        return a[sortBy].localeCompare(b[sortBy])
      }),
      payload.search
    )
  }

  return filterData(data, payload.search)
}
