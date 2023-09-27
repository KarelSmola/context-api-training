import { useState, useEffect, createContext, useContext } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("https://randomuser.me/api/?results=10");
      const response = await data.json();
      console.log(response.results);

      setUsers(response.results);
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ users: users }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("Component is out of the Context Provider");
  }

  return context;
};

export { UserContextProvider, useUserContext };
