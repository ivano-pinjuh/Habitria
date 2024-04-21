"use client"


import { getAllTasks } from "@/lib/supabase/db-actions"
import { useState, useEffect } from "react"

export default function Stats(){
  const [tasksData, setTasksData] = useState<any>({habits: [0, 0, 0], dailies: [0, 0, 0], todos: [0, 0, 0]})
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)

      const data:any = await getAllTasks()
      const habits = data.data.filter((item: ItemData) => item.type === 0)
      const dailies = data.data.filter((item: ItemData) => item.type === 1)
      const todos = data.data.filter((item: ItemData) => item.type === 2)
      
      const habitsPercentage = ((habits.filter((habit: ItemData) => habit.positive === habit.target).length) / (habits.length) * 100).toFixed(0)
      const dailiesPercentage = ((dailies.filter((daily: ItemData) => daily.completed).length) / (dailies.length) * 100).toFixed(0)
      const todosPercentage = ((todos.filter((todo: ItemData) => todo.completed).length) / (todos.length) * 100).toFixed(0)

      setTasksData({habits: [habitsPercentage],
                    dailies: [dailiesPercentage],
                    todos: [todosPercentage]})
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="w-full px-10 mt-10">
      <h2 className="text-3xl font-semibold text-center">
        Today's Tasks
      </h2>
      
      <div className="w-full mt-4 flex justify-between">
        <div className="px-4 py-5 flex flex-col items-center bg-bg-l-200 dark:bg-bg-d-200 w-[30%] h-96 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl">
            Habits Completion
          </h3>

          <div className="w-[45%] mt-10 relative aspect-square rounded-full overflow-hidden bg-bg-l-300 dark:bg-bg-d-300">
            <div style={{height: `${tasksData.habits[0]}%`}} className={`absolute bottom-0 bg-prim-100 w-full`}></div>
            <p className="absolute top-6 text-center w-full font-semibold text-3xl">
              {tasksData.habits[0]}%
              
            </p>
          </div>
        </div>

        <div className="px-4 py-5 flex flex-col items-center bg-bg-l-200 dark:bg-bg-d-200 w-[30%] h-96 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl">
            Dailies Completion
          </h3>

          <div className="w-[45%] mt-10 relative aspect-square rounded-full overflow-hidden bg-bg-l-300 dark:bg-bg-d-300">
            <div style={{height: `${tasksData.dailies[0]}%`}} className={`absolute bottom-0 bg-prim-100 w-full`}></div>
            <p className="absolute top-6 text-center w-full font-semibold text-3xl">
              {tasksData.dailies[0]}%
              
            </p>
          </div>
        </div>

        <div className="px-4 py-5 flex flex-col items-center bg-bg-l-200 dark:bg-bg-d-200 w-[30%] h-96 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl">
            Todos Completion
          </h3>

          <div className="w-[45%] mt-10 relative aspect-square rounded-full overflow-hidden bg-bg-l-300 dark:bg-bg-d-300">
            <div style={{height: `${tasksData.todos[0]}%`}} className={`absolute bottom-0 bg-prim-100 w-full`}></div>
            <p className="absolute top-6 text-center w-full font-semibold text-3xl">
              {tasksData.todos[0]}%
              
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}