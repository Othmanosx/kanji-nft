import { Drawer } from "@mantine/core"
import { useStore } from "store"
import DrawerHead from "./DrawerHead"
import MultipleForm from "./MultipleForm"
import SingleForm from "./SingleForm"

export default function DrawerComponent() {
  const isDrawerOpen = useStore((state) => state.isDrawerOpen)
  const toggleDrawer = useStore((state) => state.toggleDrawer)
  const NFTList = useStore((state) => state.NFTList)
  const drawerItem = useStore((state) => state.drawerItem)
  const selection = useStore((state) => state.selection)

  const NFTItem = NFTList.find((item) => item.id === drawerItem)
  const NFTItemList = NFTList.filter((item) => selection.includes(item.id))

  return (
    <Drawer
      opened={isDrawerOpen}
      onClose={toggleDrawer}
      withCloseButton={false}
      size="xl"
      position="right"
    >
      <DrawerHead title={NFTItem?.item || "Edit Item"} />
      {NFTItemList.length > 0 ? (
        <MultipleForm NFTItemList={NFTItemList} />
      ) : (
        <SingleForm NFTItem={NFTItem} />
      )}
    </Drawer>
  )
}
