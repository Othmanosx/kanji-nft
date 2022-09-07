import { useState } from "react"
import { NFTItem } from "types"

interface ErrorsType {
  nameError?: string
  propertyError?: string
  valueError?: string
}

export default function useValidation(form?: NFTItem, noNameChecking = false) {
  const [errors, setErrors] = useState<ErrorsType>({
    nameError: "",
    propertyError: "",
    valueError: "",
  })
  const validate = () => {
    return new Promise<void>((resolve, reject) => {
      setErrors({})
      const properties = form?.properties || []
      // empty form error
      if (!form) {
        setErrors({
          nameError: "Something wrong happened!",
        })
        reject("Error!")
      }
      // empty name error, disabled for multiple items
      if (!noNameChecking && !form?.item) {
        setErrors({
          nameError: "Please fill in the name",
        })
        reject("Error!")
      }
      // no property fields error
      if (properties?.length === 0) {
        setErrors({
          propertyError: "Please enter property details first.",
        })
        reject("Error!")
      }
      // empty property names and values error
      const emptyProperties =
        form?.properties?.filter((item) => !item.name || !item.value) || []
      if (emptyProperties.length > 0) {
        setErrors({
          propertyError:
            "Please make sure to enter all the properties data correctly.",
        })
        reject("Error!")
      }
      // duplicate property names and values error
      const filteredProperties = new Set(
        properties?.map((item) => item.name) || []
      )

      if (filteredProperties.size !== properties.length) {
        setErrors({
          propertyError:
            "Duplicate properties found, please include only one of each type.",
        })
        reject("Error!")
      }
      resolve()
    })
  }
  return { errors, validate }
}
