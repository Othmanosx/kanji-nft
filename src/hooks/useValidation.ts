import { useState } from "react"
import { NFTItem } from "types"

interface ErrorsType {
  nameError?: string
  propertyError?: string
  valueError?: string
}

export default function useValidation(form?: NFTItem) {
  const [errors, setErrors] = useState<ErrorsType>({
    nameError: "",
    propertyError: "",
    valueError: "",
  })
  const validate = () => {
    return new Promise<void>((res, rej) => {
      setErrors({})
      if (!form) {
        setErrors({
          nameError: "Something wrong happened!",
        })
        rej()
      }
      if (!form?.item) {
        setErrors({
          nameError: "Please fill in the name",
        })
        rej()
      }
      const emptyProperties =
        form?.properties?.filter((item) => !item.name || !item.value) || []
      if (emptyProperties.length > 0) {
        setErrors({
          propertyError: "Please fill in the property details",
        })
        rej()
      }
      res()
    })
  }
  return { errors, validate }
}
