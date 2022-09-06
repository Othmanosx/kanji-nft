import { Group, Checkbox, Avatar, Badge, Text } from "@mantine/core"
import { useStore } from "store"
import { NFTItem } from "types"

type Props = {
  rows: NFTItem[]
}

function TableBody({ rows }: Props) {
  const selection = useStore((state) => state.selection)
  const setSelection = useStore((state) => state.setSelection)

  const toggleRow = (id: number) =>
    setSelection(
      selection.includes(id)
        ? selection.filter((item) => item !== id)
        : [...selection, id]
    )
  return (
    <tbody>
      {rows.length > 0 ? (
        rows.map((row) => (
          <tr key={row.id}>
            <td>
              <Group noWrap>
                <Checkbox
                  checked={selection.includes(row.id)}
                  onChange={() => toggleRow(row.id)}
                  transitionDuration={80}
                />
                <Avatar src={row.image} alt="cool cat photo" />
                {row.item}
              </Group>
            </td>
            <td>{Object.keys(row.properties).join(" | ")}</td>
            <td>{Object.values(row.properties).join(" | ")}</td>
            <td>
              <Badge
                color={row.status === "Complete" ? "cyan" : "pink"}
                radius="sm"
                sx={{ width: "80px" }}
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
  )
}

export default TableBody
