import { useState } from "react"
import { Table, ScrollArea, Text, Badge } from "@mantine/core"
import { NFTItem } from "types"
import { useStore } from "store"
import { sortData } from "utils"
import Th from "./TableHead"

export default function TableSort() {
  const search = useStore((state) => state.search)
  const data = useStore((state) => state.NFTList)
  const [sortBy, setSortBy] = useState<keyof NFTItem | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  const setSorting = (field: keyof NFTItem) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
  }

  const rows = sortData(data, {
    sortBy,
    reversed: reverseSortDirection,
    search: search,
  })

  return (
    <ScrollArea>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: "fixed", minWidth: 700 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === "item"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("item")}
            >
              ITEM
            </Th>
            <Th>PROPERTIES</Th>
            <Th>VALUES</Th>
            <Th
              sorted={sortBy === "status"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("status")}
            >
              STATUS
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <tr key={row.id}>
                <td>{row.item}</td>
                <td>{Object.keys(row.properties).join(" | ")}</td>
                <td>{Object.values(row.properties).join(" | ")}</td>
                <td>
                  <Badge
                    color={row.status === "Complete" ? "cyan" : "pink"}
                    radius="sm"
                  >
                    {row.status}
                  </Badge>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
