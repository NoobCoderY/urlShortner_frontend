import React, { useCallback, useEffect, useState } from "react";
import axios, { all } from "axios"
import toast from "react-hot-toast";

interface Todo {
  _id?:string
  todo: string;
}

interface TodoCardProps{
  addTask: () => Promise<any>,
  newTodo:boolean
}

const TodoCard: React.FC<TodoCardProps> = ({ addTask, newTodo }) => {

  const [allTodo, setallTodo] = useState<Todo[]>([
    {
      todo: "",
    },
  ]);
  
  const [loading ,setLoading]=useState<boolean>(false)

  //********************************** all todo fetch from server********************************/
  
  const fetchTodo:() => Promise<void> = async() => {
   try {
     setLoading(false)
     console.log("hi");
     
     await axios.get(`http://localhost:8000/api/v1/fetchAllTasks`,
       
     ).then((data) => {
       setallTodo(data.data.allTodos)
        setLoading(true)
     })
   } catch (error:any) {
        toast.error(`${error}`)
   }
}
  
  useEffect(() => {
    fetchTodo()
   
  },[newTodo])

 
  
  return (
    <>
      <div className="flex flex-col overflow-y-scroll h-[38vh] no-scrollbar my-2">
        
        {allTodo?.map((todoData:Todo,index:number) => {
          return (
            <div className="mt-4" key={`${todoData._id}+${index}`}>
              <p className="break-all">{ todoData?.todo}</p>
            <hr className="mt-2 color-[red] border-[1px] border-[#C5CAD3]" />
          </div>
         )
       })}
      </div>
    </>
  );
};

export default TodoCard;
