import React from "react";
import io from 'socket.io-client';

export const CTX = React.createContext();

const initState = {
  general: [
    { from: "aaron", msg: "hello" },
    { from: "arnold", msg: "hello" },
    { from: "archer", msg: "hello" },
  ],
  topic2: [
    { from: "aaron", msg: "hello" },
    { from: "aaron", msg: "hello" },
    { from: "aaron", msg: "hello" },
  ],
};
function reducer(state, action) {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }],
      };
    default:
      return state;
  }
}

//initial socket
let socket;

export default function Store(props) {

    if(!socket) {
        socket = io(':3000')
    }
  const reducerHook = React.useReducer(reducer, initState);

  return <CTX.Provider value={reducerHook}>{props.children}</CTX.Provider>;
}
