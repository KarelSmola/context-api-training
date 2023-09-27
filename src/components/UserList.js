import React from "react";
import { useUserContext } from "../contexts/UserContext";

const UserList = () => {
  const userContext = useUserContext();

  return (
    <ul>
      {userContext.users.map((user) => (
        <li key={user.cell}>{user.name.first}</li>
      ))}
    </ul>
  );
};

export default UserList;
