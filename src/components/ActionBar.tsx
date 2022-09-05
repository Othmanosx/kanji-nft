import {
  Button,
  Grid,
  Group,
  Input,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import { IconSearch } from "@tabler/icons"

type Props = {}

export default function ActionBar({}: Props) {
  return (
    <Group position="apart" mb="md">
      <div>
        <Title order={2}>Cool Cats</Title>
        <Text color="gray">354 NFTs Uploaded</Text>
      </div>
      <Group>
        <Input icon={<IconSearch />} placeholder="Search..." />
        <Button variant="default">Edit properties</Button>
      </Group>
    </Group>
  )
}
