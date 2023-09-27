import React from "react";
// import { useUserContext } from "../contexts/UserContext";

const Counter = ({ counter, increaseValue }) => {
  // const context = useUserContext();
  // const { counter, increaseValue } = context;
  console.log("counter");

  return (
    <div>
      <div>Counter {counter}</div>
      <button onClick={increaseValue}>Add 1</button>
    </div>
  );
};

export default Counter;
