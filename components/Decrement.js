import React from "react";
import { useDispatch } from "react-redux";
import { decrement } from "../slices/counterSlice";

function Decrement() {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(decrement())}>Decrement state</button>
    </div>
  );
}

export default Decrement;
