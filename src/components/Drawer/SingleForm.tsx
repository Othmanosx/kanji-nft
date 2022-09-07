import { ActionIcon, Group, Select, TextInput } from "@mantine/core"
import { IconPlus, IconTrash } from "@tabler/icons"
import { useState } from "react"
import { NFTItem } from "types"

type Props = {
  NFTItem: NFTItem | undefined
}

function SingleForm({ NFTItem }: Props) {
  const [form, setForm] = useState(NFTItem)
  const properties = ["Eyes", "Hair", "Rarity"]
  interface Values {
    [key: string]: string[]
  }
  const values: Values = {
    Eyes: ["Black", "Green", "Blue"],
    Hair: ["Blond", "Ginger", "Black", "Brown"],
    Rarity: ["Rare", "Very Rare", "Common"],
  }
  const formProperties = form?.properties || []

  const setProperty = (
    value: string | null,
    propertyId: number,
    type: string
  ) => {
    if (!form || !value) return
    const newProperties = form.properties.map((item) => {
      if (item.id === propertyId) {
        return type === "name"
          ? {
              ...item,
              name: value,
              value: "",
            }
          : {
              ...item,
              value: value,
            }
      }
      return item
    })
    setForm({
      ...form,
      properties: newProperties,
    })
  }
  const setName = (name: string) => {
    if (!form) return
    setForm({
      ...form,
      item: name,
    })
  }
  const addProperty = () => {
    if (!form) return
    const newProperty = { id: Math.random(), name: "", value: "" }
    const newProperties = [...form?.properties, newProperty]

    setForm({
      ...form,
      properties: newProperties,
    })
  }
  const removeProperty = (id: number) => {
    if (!form) return
    const newProperties = form?.properties.filter((item) => item.id !== id)
    setForm({
      ...form,
      properties: newProperties,
    })
  }

  return (
    <form>
      <TextInput
        value={form?.item}
        onChange={(e) => setName(e.target.value)}
        p={16}
        label="Name"
        placeholder="Type item name..."
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
      {formProperties?.length < 3 && (
        <Group p={16} onClick={addProperty}>
          <IconPlus size={20} />
          Property
        </Group>
      )}
    </form>
  )
}

export default SingleForm
