import { Group, Checkbox, Avatar, Badge, useMantineTheme } from "@mantine/core"
import { useStore } from "store"
import { NFTItem } from "types"
import Empty from "./Empty"

type Props = {
  rows: NFTItem[]
}

function TableBody({ rows }: Props) {
  const selection = useStore((state) => state.selection)
  const setSelection = useStore((state) => state.setSelection)
  const setDrawerItem = useStore((state) => state.setDrawerItem)
  const toggleDrawer = useStore((state) => state.toggleDrawer)

  const theme = useMantineTheme()

  const toggleRow = (id: number) =>
    setSelection(
      selection.includes(id)
        ? selection.filter((item) => item !== id)
        : [...selection, id]
    )
  const getProperties = (row: NFTItem) => {
    const properties = row.properties
    if (properties.length > 0)
      return properties.map((item) => item.name).join(" | ")
    return "--"
  }
  const getValues = (row: NFTItem) => {
    const properties = row.properties
    if (properties.length > 0)
      return properties.map((item) => item.value).join(" | ")
    return "--"
  }
  const editItem = (id: number) => {
    setDrawerItem(id)
    toggleDrawer()
  }
  return (
    <tbody>
      {rows.length > 0 ? (
        rows.map((row) => (
          <tr
            key={row.id}
            onClick={() => editItem(row.id)}
            style={{
              backgroundColor: selection.includes(row.id)
                ? theme.colors.gray[1]
                : "",
            }}
          >
            <td>
              <Group noWrap>
                <Checkbox
                  onClick={(e) => e.stopPropagation()}
                  checked={selection.includes(row.id)}
                  onChange={() => toggleRow(row.id)}
                  transitionDuration={80}
                />
                <Avatar src={row.image} alt="cool cat photo" />
                {row.item || "--"}
              </Group>
            </td>
            <td>{getProperties(row)}</td>
            <td>{getValues(row)}</td>
            <td>
              <Badge
                color={row.status === "Complete" ? "cyan" : "pink"}
                radius="sm"
                sx={{ width: "80px" }}
              >
                {row.status || "--"}
              </Badge>
            </td>
          </tr>
        ))
      ) : (
        <Empty />
      )}
    </tbody>
  )
}

export default TableBody
