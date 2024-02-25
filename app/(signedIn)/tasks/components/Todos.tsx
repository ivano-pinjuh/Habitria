"use client"

import TodoItem from "./TodoItem"

import { createItem, getItems } from "@/lib/supabase/db-actions"
import { useState, useEffect } from "react"


export function Todos(){
  const [todosData, setTodosData] = useState<ItemData[]>([])


  const fetchData = async () => {
    try {
      const data:any = await getItems(2);
      setTodosData(data.data);
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleKeyPress = (event: any) => {
    event.preventDefault()
    if (event.key === 'Enter' && event.target.value.length > 0) {
      createItem(2, event.target.value)
      event.target.value = ""
      fetchData()
    }
  }
  const handleBlur = (event: any) => {
    if (event.target.value.length > 0){
      createItem(2, event.target.value);
      event.target.value = "";
      fetchData();
    } 
  };


  const handleReload = () => {
    fetchData()
  }

  useEffect(() => {
    fetchData();
  }, [])

 

  return (
    <div className='w-full md:w-[32%]'>
      <div className='flex justify-between items-center'>
        <h3 className='text-xl font-semibold py-1 pl-2'>
          To-Do's
        </h3>
        <div className='flex'>
          <p className='cursor-pointer px-2 py-1 text-xs border-b-2 border-bg-d-100 dark:border-bg-l-100 font-semibold'>All</p>
          <p className='cursor-pointer px-2 py-1 text-xs opacity-75 dark:opacity-50 hover:opacity-100 transition-all'>Active</p>
          <p className='cursor-pointer px-2 py-1 text-xs opacity-75 dark:opacity-50 hover:opacity-100 transition-all'>Completed</p>
        </div>
      </div>
          

      <div className='w-full flex flex-col gap-3 bg-bg-l-300 dark:bg-bg-d-200 h-[500px] py-2 px-2 rounded-md'>
        <div className='group transition-all relative'>
          <input className='placeholder:font-semibold w-full duration-300 focus:mb-14 bg-bg-l-100 dark:bg-bg-d-300 h-12 px-4 rounded outline-none shadow-md transition-all' 
            type="text" 
            placeholder='Add a To-Do'
            name="add-todo" 
            id="add-todo"
            autoComplete="off"
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}/>
          

              
          <p className='absolute top-16 left-4 text-xs opacity-0 -translate-y-2 group-focus-within:translate-y-0 group-focus-within:opacity-100 duration-300 transition-all'>
            <span className='font-semibold'>Tip:</span> To add multiple To-Do's, separate each one using a line break (Shift + Enter) and then press "Enter".
          </p>
        </div>
            

        <div className='w-full flex flex-col gap-2 rounded flex-grow'>
          {todosData.map(todo => {
            return <TodoItem todo={todo} onReload={handleReload} key={todo.title} />
          })}
          
        </div>
      </div>
    </div>
  )
}