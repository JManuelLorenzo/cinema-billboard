// MyContext.js
import { createContext, useContext } from "react";

export const dataContext = createContext("dataContext");

function App() {
  const { dataMovies } = useFetch(
    "https://nondigestive-shea-divertedly.ngrok-free.dev/movies"
  );
  const { dataCategories } = useFetch(
    "https://nondigestive-shea-divertedly.ngrok-free.dev/categories"
  );
  <MyContext.Provider value={{ dataMovies, dataCategories }}>
    <MyChildComponent />
  </MyContext.Provider>;
}
export const useDataContext = () => useContext(MyContext);
