import { Button, Group, Input, Text, Title } from "@mantine/core"
import { IconSearch } from "@tabler/icons"
import { useStore } from "store"

export default function ActionBar() {
  const NFTList = useStore((state) => state.NFTList)
  const search = useStore((state) => state.search)
  const setSearch = useStore((state) => state.setSearch)
  const selection = useStore((state) => state.selection)
  const toggleDrawer = useStore((state) => state.toggleDrawer)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value)

  return (
    <Group position="apart" p="lg">
      <div>
        <Title order={2}>Cool Cats</Title>
        <Text color="gray">{NFTList?.length} NFTs Uploaded</Text>
      </div>
      <Group>
        <Input
          value={search}
          onChange={handleSearch}
          icon={<IconSearch />}
          placeholder="Search..."
        />
        {selection.length > 0 && (
          <Button variant="default" onClick={toggleDrawer}>
            Edit properties
          </Button>
        )}
      </Group>
    </Group>
  )
}
