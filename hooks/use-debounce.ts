import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    }
  }, [value, delay]);

  return debouncedValue
}


const usePageFilter = (delay?: number) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedValue, setDebouncedValue] = useState(searchTerm)

  const handleClearSearchTerm = () => {
    setSearchTerm('')
  }

  useEffect(() => {
    const updateTimer = setTimeout(() => {
      setDebouncedValue(searchTerm)
    }, delay)

    return () => clearTimeout(updateTimer)
  }, [searchTerm, delay])

  return {
    searchTerm,
    debouncedSearchTerm: debouncedValue,
    setSearchTerm,
    handleClearSearchTerm
  }
}

export default usePageFilter
