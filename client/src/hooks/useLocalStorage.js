import { useEffect, useState } from "react"
/*
id persists on our page
*/
const PREFIX = "smileygram-"
//to avoid conflicts between projects

export default function useLocalStorage(key, initialValue) {
  //key= what u store locally, initialValue=what u pass to useState
  //in our case we dont have anything to pass
  const prefixedKey = PREFIX + key
  const [value, setValue] = useState(() => {
    //funciton version bc we only want to do it once
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)
    if (typeof initialValue === "function") {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue] //return two usestate values
}
