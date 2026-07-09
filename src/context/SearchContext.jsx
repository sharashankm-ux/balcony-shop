import { createContext, useState } from "react";

export const SearchContext = createContext();

function SearchProvider({ children }) {
  const [search, setSearch] = useState("");

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;