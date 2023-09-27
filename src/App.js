import { useState, useEffect } from "react";
import Counter from "./components/Counter";
import UserList from "./components/UserList";

const App = () => {
  const [users, setUsers] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users/");
        if (!response.ok) {
          throw new Error("No response");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.log(error.messge);
        return;
      }
    };

    fetchData();
  }, []);

  const increaseValue = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <Counter counter={counter} increaseValue={increaseValue} />
      <UserList users={users} />
    </div>
  );
};

export default App;
