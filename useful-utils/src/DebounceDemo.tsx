import { useEffect, useState } from "react"
import { useDebounceValue } from "./utils/useDebouce"
import useSearchUsers from "./api/useSearchUsers"

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

const ContactSearch = () => {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounceValue(search, 500)
  const {data, isLoading, error, refetch} = useSearchUsers()

  // The trick lies here. Since debouncedSearch only changes once every [timeout] ms,
  // the query will not run immediately, by this useEffect. 
  useEffect(() => {
    if (search) {
      refetch(debouncedSearch);
    }
  }, [debouncedSearch])

  return (
    <>
      <div>
        <label htmlFor="search">SEARCH ME: </label>
        <input 
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}  
        />
        {isLoading && search !== '' ? (
          <p>Loading...</p>
        ): search === '' ? (
          <></>
        ): data?.users ? (
          <ul>
            {data?.users.map((user: User) => (
              <li>{user?.firstName} {user?.lastName}</li>
            ))}
          </ul>
        ) : error && (
          <p>{error}</p>
        )}
      </div>
    </>
  )
}

export default ContactSearch
