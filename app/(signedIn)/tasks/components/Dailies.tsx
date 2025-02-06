"use client"

import DailyItem from "./DailyItem"

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { createItem, getItems, updateItems } from "@/lib/supabase/db-actions"
import { useState, useEffect } from "react"

import Loading from "./Loading"

export default function Dailies(){
  const [dailiesData, setDailiesData] = useState<ItemData[]>([{type: 1, title: "", id: "", note: "", positive: 0, target: 1, difficulty: 1}])
  const [filter, setFilter] = useState<undefined | boolean>(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data:any = await getItems(1);
      setDailiesData(data.data.sort((a: any, b: any) => a.list_order - b.list_order));
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
      setDailiesData([...dailiesData, {type: 1, title: `${event.target.value}`, id: "", note: "", positive: 0, target: 0, difficulty: 1}])
      createItem(1, event.target.value, dailiesData.length)
      event.target.value = ""
      fetchData()
    }
  }
  const handleBlur = (event: any) => {
    if (event.target.value.length > 0){
      setDailiesData([...dailiesData, {type: 1, title: `${event.target.value}`, id: "", note: "", positive: 0, target: 0, difficulty: 1}])
      createItem(1, event.target.value, dailiesData.length)
      event.target.value = ""
      fetchData()
    } 
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return // If dropped outside a valid destination, exit
    
        const updatedData = Array.from(dailiesData)
    
        // updates the list_order values of all habits when reordered so it stays updated permanently
        if (result.source.index < result.destination.index){
          for (let i = result.source.index; i < result.destination.index; i++){
            updatedData[i].list_order! -= 1
          }
          updatedData[result.source.index].list_order = result.destination.index
        }
        else {
          for (let i = result.destination.index; i < result.source.index; i++){
            updatedData[i].list_order! += 1
          }
          updatedData[result.source.index].list_order = result.destination.index
        }
    
        
        const [reorderedItem] = updatedData.splice(result.source.index, 1) // Remove dragged item
        updatedData.splice(result.destination.index, 0, reorderedItem) // Insert it at the new index
    
        console.log(result.source.index)
        console.log(result.destination.index)
    
    
        setDailiesData(updatedData)
        updateItems(updatedData)
  }

  const handleReload = () => {
    fetchData()
  }

  useEffect(() => {
    fetchData();
  }, [])

 

  return (
    <div className='w-full lg:w-[32%]'>
      {isLoading && <div className="w-full absolute top-0 left-0 z-50 h-2 animate-pulse bg-prim-100"></div>}

      <div className='flex justify-between items-center'>
        <h3 className='text-xl font-semibold py-1 pl-2'>
          Dailies
        </h3>
        <div className='flex'>
          <p onClick={() => setFilter(undefined)} className={`${filter === undefined ? "border-b-2 border-bg-d-100 dark:border-bg-l-100 font-semibold" : "opacity-75 dark:opacity-50 hover:opacity-100"} cursor-pointer px-2 py-1 text-xs transition-all`}>All</p>
          <p onClick={() => setFilter(false)} className={`${filter === false ? "border-b-2 border-bg-d-100 dark:border-bg-l-100 font-semibold" : "opacity-75 dark:opacity-50 hover:opacity-100"} cursor-pointer px-2 py-1 text-xs transition-all`}>Active</p>
          <p onClick={() => setFilter(true)} className={`${filter === true ? "border-b-2 border-bg-d-100 dark:border-bg-l-100 font-semibold" : "opacity-75 dark:opacity-50 hover:opacity-100"} cursor-pointer px-2 py-1 text-xs transition-all`}>Completed</p>
        </div>
      </div>
          

      <div className='w-full flex flex-col gap-3 bg-bg-l-300 dark:bg-bg-d-200 min-h-[600px] py-2 px-2 rounded-md'>
        <div className='group transition-all relative'>
          <input className='placeholder:font-semibold w-full duration-300 focus:mb-10 bg-bg-l-100 dark:bg-bg-d-300 h-12 px-4 rounded outline-none shadow-md transition-all' 
            type="text" 
            placeholder='Add a Daily'
            name="add-daily" 
            id="add-daily"
            autoComplete="off"
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}/>
          

              
          <p className='absolute top-16 left-4 text-xs opacity-0 -translate-y-2 group-focus-within:translate-y-0 group-focus-within:opacity-100 duration-300 transition-all'>
          <span className='font-semibold'>Press "Enter"</span> to create a new Daily.
          </p>
        </div>
            

        <div className='w-full flex flex-col gap-2 rounded flex-grow'>
        {(dailiesData[0]?.title === "") ? (
            <Loading />
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="dailys-list">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col gap-2"
                  >
                    {dailiesData
                      .filter((daily) => !daily.completed !== filter)
                      .map((daily, index) => (
                        <Draggable key={daily.id} draggableId={daily.id} index={index}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <DailyItem daily={daily} onReload={handleReload} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}

          {/*(dailiesData[0]?.title === "") ? (<Loading />) : (dailiesData.filter(daily => !daily.completed !== filter).map(daily => {
            return <DailyItem daily={daily} onReload={handleReload} key={daily.id} />
          }))*/}

          {(!(dailiesData[0]?.title === "") && dailiesData.length < 5) && 
            <div className="w-[60%] h-40 flex flex-col justify-center m-auto">
              <p className="font-semibold text text-center">
                These are your Dailies
              </p>
              <p className="opacity-70 text-xs text-center">
                Dailies repeat on a regular basis. Choose the schedule that works best for you! 
              </p>
            </div>}
        </div>
      </div>
    </div>
  )
}