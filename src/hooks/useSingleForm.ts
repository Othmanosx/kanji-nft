import { useState } from "react"
import { NFTItem } from "types"

export default function useSingleForm(NFTItem?: NFTItem) {
  const [form, setForm] = useState(NFTItem)
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

  return { form, setForm, setProperty, setName, addProperty, removeProperty }
}
