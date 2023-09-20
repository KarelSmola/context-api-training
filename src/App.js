import { useUsers } from "./contexts/MainContext";

const App = () => {
  const { users } = useUsers();

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
