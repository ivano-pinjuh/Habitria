"use client"

import TodoItem from "./TodoItem"

import { createItem, getItems } from "@/lib/supabase/db-actions"
import { useState, useEffect } from "react"

import Loading from "./Loading"

export default function Todos(){
  const [todosData, setTodosData] = useState<ItemData[]>([{type: 2, title: "", id: "", note: "", positive: 0, target: 1, difficulty: 1}])
  const [filter, setFilter] = useState<undefined | boolean>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data:any = await getItems(2)
      setTodosData(data.data.sort((a: any, b: any) => Date.parse(a.created_at) - Date.parse(b.created_at)))
    } 
    catch (error) {
      console.error('Error fetching data:', error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter' && event.target.value.length > 0) {
      setTodosData([...todosData, {type: 2, title: `${event.target.value}`, id: "", note: "", positive: 0, target: 1, difficulty: 1}])
      createItem(2, event.target.value)
      event.target.value = ""
      fetchData()
    }
  }
  const handleBlur = (event: any) => {
    if (event.target.value.length > 0){
      setTodosData([...todosData, {type: 2, title: `${event.target.value}`, id: "", note: "", positive: 0, target: 1, difficulty: 1}])
      createItem(2, event.target.value)
      event.target.value = ""
      fetchData()
    } 
  };


  const handleReload = () => {
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

 

  return (
    <div className='w-full lg:w-[32%]'>
      {isLoading && <div className="w-full absolute top-0 left-0 z-50 h-2 animate-pulse bg-prim-100"></div>}

      <div className='flex justify-between items-center'>
        <h3 className='text-xl font-semibold py-1 pl-2'>
          To-Do's
        </h3>
        <div className='flex'>
          <p onClick={() => setFilter(undefined)} className={`${filter === undefined ? "border-b-2 border-bg-d-100 dark:border-bg-l-100 font-semibold" : "opacity-75 dark:opacity-50 hover:opacity-100"} cursor-pointer px-2 py-1 text-xs transition-all`}>All</p>
          <p onClick={() => setFilter(false)} className={`${filter === false ? "border-b-2 border-bg-d-100 dark:border-bg-l-100 font-semibold" : "opacity-75 dark:opacity-50 hover:opacity-100"} cursor-pointer px-2 py-1 text-xs transition-all`}>Active</p>
          <p onClick={() => setFilter(true)} className={`${filter === true ? "border-b-2 border-bg-d-100 dark:border-bg-l-100 font-semibold" : "opacity-75 dark:opacity-50 hover:opacity-100"} cursor-pointer px-2 py-1 text-xs transition-all`}>Completed</p>
        </div>
      </div>
          

      <div className='w-full flex flex-col gap-3 bg-bg-l-300 dark:bg-bg-d-200 min-h-[600px] py-2 px-2 rounded-md'>
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
          {(todosData[0]?.title === "") ? (<Loading />) : (todosData.filter(daily => !daily.completed !== filter).map(todo => {
            return <TodoItem todo={todo} onReload={handleReload} key={todo.id} />
          }))}

          {(!(todosData[0]?.title === "") && todosData.length < 5) && 
            <div className="w-[60%] h-40 flex flex-col justify-center m-auto">
              <p className="font-semibold text text-center">
                These are your To-Do's
              </p>
              <p className="opacity-70 text-xs text-center">
                To Do's need to be completed once. They are deleted after 90 days.
              </p>
            </div>}
        </div>
      </div>
    </div>
  )
}