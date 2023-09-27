import { UserContextProvider } from "./contexts/UserContext";
import UserList from "./components/UserList";

const App = () => {
  return (
    <UserContextProvider>
      <UserList />
    </UserContextProvider>
  );
};

export default App;
