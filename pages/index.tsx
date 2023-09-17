import React from "react";
import  TodoLayout from "../component/TodoLayout"
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

export default function Home(){
  
  return (
    <>
      <TodoLayout socket={socket} />
    </>
)
}


