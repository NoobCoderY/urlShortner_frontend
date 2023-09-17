import React, { useCallback, useEffect } from "react";
import { BsFillPlusCircleFill} from "react-icons/bs";
import TodoCard from "./TodoCard";
import Image from "next/image";
import logo from "../assets/images/icons8-notes-app 1.svg"
import toast from "react-hot-toast";


//********************************** client side socket connection********************************/


const TodoLayout = ({ socket }: any) => {
  
  const [todo, settodo] = React.useState<string>("");
  const [newTodo, setnewTodo] = React.useState<boolean>(false);// for detect new todo and avoid call fetch todo(TodoCard) in every change state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    settodo(e.target.value);
  };

  console.log(todo);

  //********************************** function for emit add event and add todo********************************/
  
  const addTask =async() => {
    if (todo.trim() !== "") {
      await socket.emit("add", {
        todo: todo,
      });
      settodo("");
    }
  }

  useEffect(() => {
    socket.on('SuccessMessage', (message:string) => {
      // Handle the message received from the server
      toast.success(message)
    });
    // Cleanup when the component unmounts
  return () => {
    socket.off('SuccessMessage'); // Remove the event listener
  };
 },[addTask])
    
  return (
    <div className=" flex items-center justify-center h-full">
      <div className="w-[97%] sm:w-[65%] md:w-[50%] lg:w-[35%] border-[1px]  p-[1.5rem] shadowcolor">
        <nav className="flex gap-3 items-center">
          <span>
          <Image src={logo} width={45} height={45} alt="logo"/>
          </span>
          <h2 className="text-[23px] font-[700] leading-[28px]">Note App</h2>
        </nav>
        <div className="flex w-[100%] mt-5 gap-6">
          <div className="basis-[80%]">
            <input
              type="text"
              value={todo}
              placeholder="New Note..."
              className="w-full rounded-md px-5 py-3  border-[1px] border-solid outline-none border-[#D3D4D9]"
              onChange={handleChange}
            />
          </div>
          <div className="basis-[20%] text-white " onClick={() => {
             setnewTodo(!newTodo)
            addTask()
          }}>
            <button className="flex items-center gap-2 px-5 py-3 bg-[#92400E] rounded-lg font-semibold w-[100%] m-auto text-[19px]">
              <span>
                <BsFillPlusCircleFill size={20} />
              </span>
              Add
            </button>
          </div>
        </div>
        <div className="mt-5 ">
          <div>
            <h1 className="font-bold text-xl">Notes</h1>
            <hr className="mt-2  border-[1px] border-[#C5CAD3]" />
          </div>
          <TodoCard addTask={ addTask} newTodo={newTodo} />
        </div>
      </div>
    </div>
  );
};

export default TodoLayout;
