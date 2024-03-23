import { useEffect, useState } from 'react'

export function useStorage<T>(key: string): [T | undefined, (newValue: any) => void | undefined] {
  const [value, setValue] = useState(localStorage.getItem(key))
  const loadValue = () => {
    setValue(localStorage.getItem(key))
  }
  
  const setItem = () => {
    return (newValue: any) => {
      setValue(newValue)
      localStorage.setItem(key, newValue)
    }
  }

  useEffect(() => {
    loadValue()
  }, [])

  return [value as T, setItem()]
}
