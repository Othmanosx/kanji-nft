import { useState } from "react"
import { Table, ScrollArea, Group, Checkbox } from "@mantine/core"
import { NFTItem } from "types"
import { useStore } from "store"
import { sortData } from "utils"
import Th from "./TableHead"
import TableBody from "./TableBody"

export default function TableSort() {
  const search = useStore((state) => state.search)
  const data = useStore((state) => state.NFTList)
  const selection = useStore((state) => state.selection)
  const setSelection = useStore((state) => state.setSelection)
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

  const toggleAll = () => {
    setSelection(
      selection.length === rows.length ? [] : rows.map((item) => item.id)
    )
  }

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
              <Group>
                <Checkbox
                  onClick={(e) => e.stopPropagation()}
                  onChange={toggleAll}
                  checked={selection.length === rows.length && rows.length > 0}
                  indeterminate={
                    selection.length > 0 && selection.length !== rows.length
                  }
                  transitionDuration={80}
                />
                ITEM
              </Group>
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
        <TableBody rows={rows} />
      </Table>
    </ScrollArea>
  )
}
