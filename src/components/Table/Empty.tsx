import { Text } from "@mantine/core"

function Empty() {
  return (
    <tr>
      <td colSpan={4}>
        <Text weight={500} align="center">
          Nothing found
        </Text>
      </td>
    </tr>
  )
}

export default Empty
