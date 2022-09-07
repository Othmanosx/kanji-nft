import { Title, ActionIcon, Group } from "@mantine/core"
import { IconX } from "@tabler/icons"
import { useStore } from "store"

type Props = {
  title: string
}

function DrawerHead({ title }: Props) {
  const toggleDrawer = useStore((state) => state.toggleDrawer)

  return (
    <Group
      position="apart"
      p={9}
      sx={(theme) => ({ background: theme.colors.gray[1] })}
    >
      <Title order={4}>{title}</Title>
      <ActionIcon onClick={toggleDrawer} variant="default" p={7} size={36}>
        <IconX />
      </ActionIcon>
    </Group>
  )
}

export default DrawerHead
