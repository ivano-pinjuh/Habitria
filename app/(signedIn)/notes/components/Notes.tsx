"use client"

import { useEffect, useState, useRef } from "react"
import { createNote, getNotes } from "@/lib/supabase/db-actions"
import NoteItem from "./NoteItem"
import Loading from "./Loading"

export default function Notes() {
  const [notesData, setNotesData] = useState<Note[]>([{ created_at: "" }])
  const [filter, setFilter] = useState<undefined | number>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const titleRef = useRef<null | HTMLInputElement>(null)
  const noteRef = useRef<null | HTMLTextAreaElement>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data:any = await getNotes();
      setNotesData(data.data.sort((a: any, b: any) => Date.parse(a.created_at) - Date.parse(b.created_at)))
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleTitleKeyPress = (event: any) => {
    if (event.key === 'Enter' && event.target.value.length > 0) {
      createNote(event.target.value)
      event.target.value = ""
      fetchData()
    }
  }




  const handleReload = () => {
    fetchData()
  }

  useEffect(() => {
    fetchData()
  } , []) 

  return (
    <>
      {isLoading && <div className="w-full absolute top-0 left-0 z-50 h-2 animate-pulse bg-prim-100"></div>}
      <div className='px-10 mt-6 flex flex-col gap-2 w-full lg:w-[40%] m-auto group'>
        <input className='placeholder:font-semibold w-full flex-wrap duration-300 bg-bg-l-100 dark:bg-bg-d-300 h-12 min-h-fit px-4 rounded outline-none shadow-md transition-all' 
          type="text" 
          placeholder='Add a Note'
          name="add-note" 
          id="add-note"
          autoComplete="off" 
          onKeyDown={handleTitleKeyPress}/>

        <textarea className='w-full break-all h-auto duration-300 bg-bg-l-100 dark:bg-bg-d-300 min-h-12 px-4 pt-2 rounded outline-none shadow-md transition-all'
          placeholder='Note text...'
          name="note-desc" 
          id="note-desc" >
          
        </textarea>
      </div>
    
      <div className='px-32 mt-10 flex justify-stretch gap-7 gap-y-8 flex-wrap'>
        {(notesData[0]?.created_at === "") ? (<Loading />) : (notesData.map(note => {
          return <NoteItem note={note} onReload={handleReload} key={note.id} />
        }))}
      </div>
    </>
  )
}