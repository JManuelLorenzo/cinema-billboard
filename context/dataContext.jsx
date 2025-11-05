// MyContext.js
import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch";

export const DataContext = createContext(null);

export function DataProvider({ children }) {
  const { data: movies, loading: moviesLoading } = useFetch(
    "http://localhost:3000/movies"
  );
  const { data: categories, loading: categoriesLoading } = useFetch(
    "http://localhost:3000/categories"
  );

  const value = {
    movies,
    categories,
    loading: moviesLoading || categoriesLoading,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useDataContext = () => useContext(DataContext);
