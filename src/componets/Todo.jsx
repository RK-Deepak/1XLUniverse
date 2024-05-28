import React, { useRef, useState } from 'react';
import { useFetchTodo } from '../utils/useFetchTodo';
import { MdCancel, MdEdit, MdRemoveRedEye } from "react-icons/md";


const Todo = () => {
    //we get todos from fake api
    const {todos,setTodos}=useFetchTodo();
    //this is to toggle view and eye
    const [editType,setEditType]=useState("edit");
    //its to set only the todo which we click whether its editable or not
    const [editableId,seteditableId]=useState(null)
    //input ref (to preserve value acroos renrender)
    const inputRef=useRef();

    function handleAddItem(e)
    {
        //to prevent from form submission
        e.preventDefault();
        //create a new todo in format which we receive from fake api
        let newTodo={completed:false,id:todos.length+1,
            todo:inputRef.current.value.trim(),
            userId:Math.random()*100+1}
            //setting the update todos
        setTodos(prev=>[...prev,newTodo])
        //empty input after adding
        inputRef.current.value="";
    }

    function handleDelete(id)
    {
        //filtering out the todo get all todos except the deleted one
        let remainigItems=todos?.filter((todo)=>todo?.id!==id);
        setTodos(remainigItems)
    }

    function handleEditTask(id,todo)
    {
        //its basically to make it editable or not or toggle bw edit and eye react icons
   
       seteditableId(id);
       setEditType("view")
    }

    function handleUpdate(id,value)
    {
        //we map such that after change the changed value get updated
      let updatedtodo=todos?.map((todo)=>todo?.id===id?{...todo,todo:value}:todo);
      setTodos(updatedtodo)
      
    }

    function handleBlur()
    {
        //when input loosed focus
        setEditType("edit");
       
    }
    
  return (
    <>
    <h1 className='heading'>Todo List</h1>
    {/* input form */}
    <form className="todo-form" onSubmit={handleAddItem}>
        <input className="todo-input" type='text' ref={inputRef}/>
         <button className="todo-button" onClick={handleAddItem}>Add</button>
    </form>
    {/* todos rendering */}
    <div>
      {todos && todos?.map((todo)=>
    {
       return <div key={todo?.id} className="todo-item">
        {editableId===todo?.id && editType==="view"?

     <input className="todo-text-input" type='text' value={todo?.todo}  onChange={(e)=>handleUpdate(todo?.id,e.target.value)} 
      onBlur={handleBlur}/>:

      <span className="todo-text">{todo?.todo}</span>
        }
       
        <div className="todo-actions">
          {/* deletion   */}
          <MdCancel className="icon" onClick={()=>handleDelete(todo?.id)}/>
      {/* editing */}
          {editableId===todo?.id && editType==="view"?<MdRemoveRedEye className="icon" onClick={()=>{
            setEditType("edit");
            seteditableId(null)
          }}/>:<MdEdit className="icon" onClick={()=>handleEditTask(todo?.id,todo?.todo) }/>}
          
        </div>
        </div>
    })}
    </div>
    </>
  )
}

export default Todo;
