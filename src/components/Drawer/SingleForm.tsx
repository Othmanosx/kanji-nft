import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Group,
  Select,
  TextInput,
} from "@mantine/core"
import { IconAlertCircle, IconPlus, IconTrash } from "@tabler/icons"
import useSingleForm from "hooks/useForm"
import useValidation from "hooks/useValidation"
import { properties, values } from "mock/data"
import { useStore } from "store"
import { NFTItem } from "types"

interface Props {
  NFTItem: NFTItem | undefined
}

function SingleForm({ NFTItem }: Props) {
  const { form, setProperty, setName, addProperty, removeProperty } =
    useSingleForm(NFTItem)
  const { errors, validate } = useValidation(form)

  const toggleDrawer = useStore((state) => state.toggleDrawer)
  const setSingleNFTItem = useStore((state) => state.setSingleNFTItem)

  const formProperties = form?.properties || []

  const submitChanges = () => {
    validate()
      .then(() => form && setSingleNFTItem(form))
      .catch((error) => console.log(error))
  }

  return (
    <Box component="form" p={16}>
      <TextInput
        value={form?.item}
        onChange={(e) => setName(e.target.value)}
        label="Name"
        pb={8}
        placeholder="Type item name..."
        error={errors.nameError}
        required
      />
      {formProperties?.map((property) => (
        <Group
          key={property.name}
          spacing="xs"
          py={8}
          position="apart"
          align="end"
          noWrap
        >
          <Select
            label="Property"
            placeholder="Pick one"
            value={property.name}
            onChange={(name) => setProperty(name, property.id, "name")}
            data={properties}
            required
          />
          <Select
            label="Value"
            placeholder="Pick one"
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
      {errors.propertyError && (
        <Alert
          my={16}
          icon={<IconAlertCircle size={16} />}
          title="Oops!"
          color="red"
        >
          {errors.propertyError}
        </Alert>
      )}
      {formProperties?.length < 3 && (
        <Group spacing={6} onClick={addProperty}>
          <IconPlus size={20} />
          Property
        </Group>
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

export default SingleForm
