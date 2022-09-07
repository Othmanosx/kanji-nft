import {
  ActionIcon,
  Alert,
  Button,
  Group,
  Select,
  TextInput,
} from "@mantine/core"
import { IconAlertCircle, IconPlus, IconTrash } from "@tabler/icons"
import useSingleForm from "hooks/useSingleForm"
import useValidation from "hooks/useValidation"
import { useStore } from "store"
import { NFTItem } from "types"

interface Props {
  NFTItem: NFTItem | undefined
}
interface Values {
  [key: string]: string[]
}

function SingleForm({ NFTItem }: Props) {
  const { form, setProperty, setName, addProperty, removeProperty } =
    useSingleForm(NFTItem)
  const { errors, validate } = useValidation(form)

  const toggleDrawer = useStore((state) => state.toggleDrawer)
  const setSingleNFTItem = useStore((state) => state.setSingleNFTItem)

  const properties = ["Eyes", "Hair", "Rarity"]
  const values: Values = {
    Eyes: ["Black", "Green", "Blue"],
    Hair: ["Blond", "Ginger", "Black", "Brown"],
    Rarity: ["Rare", "Very Rare", "Common"],
  }
  const formProperties = form?.properties || []

  const submitChanges = () => {
    validate()
      .then(() => form && setSingleNFTItem(form))
      .catch((error) => console.log(error))
  }

  return (
    <form>
      <TextInput
        value={form?.item}
        onChange={(e) => setName(e.target.value)}
        p={16}
        label="Name"
        placeholder="Type item name..."
        error={errors.nameError}
        required
      />
      {formProperties?.map((property) => (
        <Group
          key={property.name}
          spacing="xs"
          px={16}
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
          m={16}
          icon={<IconAlertCircle size={16} />}
          title="Oops!"
          color="red"
        >
          Please make sure to enter all the properties data correctly.
        </Alert>
      )}
      {formProperties?.length < 3 && (
        <Group p={16} onClick={addProperty}>
          <IconPlus size={20} />
          Property
        </Group>
      )}
      <Group p={16}>
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
    </form>
  )
}

export default SingleForm
