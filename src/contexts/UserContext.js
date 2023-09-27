import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [counter, setCounter] = useState(0);

  const signout = useCallback(() => {
    setUsers([]);
  }, []);

  const increaseValue = useCallback(() => {
    setCounter(counter + 1);
  }, [counter]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("https://api.api-ninjas.com/v1/randomuser");
      const response = await data.json();
      setUsers(response.results);
    };

    fetchData();
  }, []);

  const contextValue = useMemo(
    () => ({
      users,
      signout,
      counter,
      increaseValue,
      user: "Mike",
    }),
    [users, signout, counter, increaseValue]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
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
