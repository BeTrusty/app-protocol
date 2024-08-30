import { type FetchState, type UseFetchOptions } from '@/types/hooks'
import { useState, useEffect, useMemo } from 'react'

export function useFetch<T = unknown> (
  url: string,
  options?: UseFetchOptions
): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const memoizedOptions = useMemo(() => options, [options])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url, {
          method: memoizedOptions?.method || 'GET',
          headers: memoizedOptions?.headers,
          body: memoizedOptions?.body
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = (await response.json()) as T
        setData(result)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, memoizedOptions])

  return { data, loading, error }
}
