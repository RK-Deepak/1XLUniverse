import { useEffect, useState } from "react"

export const useFetchTodo=()=>
    {
        const [todos,setTodos]=useState([])
        const fetchTodo=async()=>
            {
                try 
                {
                    const responseObj=await fetch('https://dummyjson.com/todos?limit=10')
                    
                    const responseJSON=await responseObj.json();
                    console.log(responseJSON?.todos)
                    setTodos(responseJSON?.todos)
                }
                catch(err)
                {
                      console.log(err)
                }
        
            }

        useEffect(()=>
        {
            fetchTodo();
        },[])
        
        return {todos,setTodos}
    }