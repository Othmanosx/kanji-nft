import {
  Group,
  Select,
  ActionIcon,
  Alert,
  Button,
  Box,
  Title,
  Table,
  Text,
  Divider,
} from "@mantine/core"
import { IconTrash, IconAlertCircle, IconPlus } from "@tabler/icons"
import useSingleForm from "hooks/useForm"
import useValidation from "hooks/useValidation"
import { NFTItem } from "types"
import { useStore } from "store"
import { properties, values } from "mock/data"

interface Props {
  NFTItemList: NFTItem[]
}

export default function MultipleForm({ NFTItemList }: Props) {
  const { form, setProperty, addProperty, removeProperty } = useSingleForm({
    properties: [{ id: Math.random(), name: "", value: "" }],
    id: Math.random(),
    item: "",
    status: "Incomplete",
  })
  const { errors, validate } = useValidation(form, true)

  const toggleDrawer = useStore((state) => state.toggleDrawer)
  const setMultipleNFTItem = useStore((state) => state.setMultipleNFTItem)

  const formProperties = form?.properties || []

  const submitChanges = () => {
    validate()
      .then(() => form && setMultipleNFTItem(form))
      .catch((error) => console.log(error))
  }

  const getProperties = (NFTItem: NFTItem) => {
    if (NFTItem.properties.length > 0)
      return NFTItem.properties
        .map((item) => `${item.name}, ${item.value}`)
        .join(" | ")
    return "--"
  }
  return (
    <Box p={16} component="form">
      <Title order={6} mb={5}>
        Previous properties and values
      </Title>
      <Table>
        <tbody>
          {NFTItemList.map((item) => (
            <tr key={item.id}>
              <td>
                <Text color="gray" weight={600}>
                  {item.item}
                </Text>
              </td>
              <td>
                <Text align="end" weight={600}>
                  {getProperties(item)}
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Divider my="2.5rem" />
      <Title order={6} mb={5}>
        New properties and values
      </Title>
      {formProperties?.map((property) => (
        <Group
          key={property.name}
          spacing="xs"
          position="apart"
          align="end"
          noWrap
        >
          <Select
            label="Property"
            placeholder="--Select--"
            value={property.name}
            onChange={(name) => setProperty(name, property.id, "name")}
            data={properties}
            required
          />
          <Select
            label="Value"
            placeholder="--Select--"
            value={property.value}
            onChange={(value) => setProperty(value, property.id, "value")}
            data={values[property.name || "Eyes"]}
            required
          />

          <ActionIcon
            onClick={() => removeProperty(property.id)}
            p={8}
            size={38}
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      ))}
      {formProperties?.length < 3 && (
        <Group py={16} spacing={6} onClick={addProperty}>
          <IconPlus size={20} />
          Property
        </Group>
      )}
      {errors.propertyError && (
        <Alert
          my={16}
          icon={<IconAlertCircle size={16} />}
          title="Oops!"
          color="red"
        >
          {errors?.propertyError}
        </Alert>
      )}
      <Group py={16}>
        <Button
          variant="light"
          color="gray"
          onClick={toggleDrawer}
          sx={(theme) => ({ backgroundColor: theme.colors.gray[2] })}
        >
          Cancel
        </Button>
        <Button color="dark" onClick={submitChanges}>
          Save
        </Button>
      </Group>
    </Box>
  )
}
