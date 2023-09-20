import { createContext, useContext, useEffect, useState } from "react";

const url = "https://dummyjson.com/users";

const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(url);
      const response = await data.json();
      setUsers(response.users);
    };

    fetchData();
  }, []);

  return (
    <MainContext.Provider value={{ users }}>{children}</MainContext.Provider>
  );
};

const useUsers = () => {
  const context = useContext(MainContext);
  return context;
};

export { MainContextProvider, MainContext, useUsers };
