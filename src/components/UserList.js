import React from "react";
// import { useUserContext } from "../contexts/UserContext";

const UserList = ({ users }) => {
  // const context = useUserContext();
  console.log("users list");

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.firstName}</li>
      ))}
    </ul>
    // <div>{context.user}</div>
  );
};

export default React.memo(UserList);
