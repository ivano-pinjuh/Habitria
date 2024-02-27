"use client"

import HabitItem from "./HabitItem"

import { createItem, getItems } from "@/lib/supabase/db-actions"
import { useState, useEffect } from "react"

import Loading from "./Loading"

export function Habits(){
  const [habitData, setHabitData] = useState<ItemData[]>([{type: 0, title: "", id: "", note: "", positive: 0, negative: 0, difficulty: 1}])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data:any = await getItems(0);
      setHabitData(data.data);
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter' && event.target.value.length > 0) {
      createItem(0, event.target.value)
      event.target.value = ""
      fetchData()
    }
  }
  const handleBlur = (event: any) => {
    if (event.target.value.length > 0){
      createItem(0, event.target.value);
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
      {isLoading && <div className="w-full absolute top-0 left-0 z-50 h-2 animate-pulse bg-prim-100"></div>}

      <div className='flex justify-between items-center'>
        <h3 className='text-xl font-semibold py-1 pl-2'>
          Habits
        </h3>
        <div className='flex'>
          <p className='cursor-pointer px-2 py-1 text-xs border-b-2 border-bg-d-100 dark:border-bg-l-100 font-semibold'>All</p>
          <p className='cursor-pointer px-2 py-1 text-xs opacity-75 dark:opacity-50 hover:opacity-100 transition-all'>Weak</p>
          <p className='cursor-pointer px-2 py-1 text-xs opacity-75 dark:opacity-50 hover:opacity-100 transition-all'>Strong</p>
        </div>
      </div>
          

      <div className='w-full flex flex-col gap-3 bg-bg-l-300 dark:bg-bg-d-200 h-[500px] py-2 px-2 rounded-md'>
        <div className='group transition-all relative'>
          <input className='placeholder:font-semibold w-full duration-300 focus:mb-14 bg-bg-l-100 dark:bg-bg-d-300 h-12 px-4 rounded outline-none shadow-md transition-all' 
            type="text" 
            placeholder='Add a Habit'
            name="add-habit" 
            id="add-habit"
            autoComplete="off"
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}/>
          

              
          <p className='absolute top-16 left-4 text-xs opacity-0 -translate-y-2 group-focus-within:translate-y-0 group-focus-within:opacity-100 duration-300 transition-all'>
            <span className='font-semibold'>Tip:</span> To add multiple Habits, separate each one using a line break (Shift + Enter) and then press "Enter".
          </p>
        </div>
            

        <div className='w-full flex flex-col gap-2 rounded flex-grow'>
          {(habitData[0]?.title === "") ? (<Loading />) : (habitData.map(habit => {
            return <HabitItem habit={habit} onReload={handleReload} key={habit.id} />
          }))}
        </div>
      </div>
    </div>
  )
}