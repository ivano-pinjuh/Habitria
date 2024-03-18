"use client"

import { useEffect, useState, useRef } from "react"
import { createNote, getNotes } from "@/lib/supabase/db-actions"
import NoteItem from "./NoteItem"
import Loading from "./Loading"

export default function Notes() {
  const [notesData, setNotesData] = useState<Note[]>([{ created_at: "", note: "", background: 0, id: "" }])
  const [filter, setFilter] = useState<undefined | number>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const titleRef = useRef<null | HTMLInputElement>(null)
  const noteRef = useRef<null | HTMLTextAreaElement>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data:any = await getNotes();
      
      const pinned: Note[] = data.data.filter((item: Note) => item.pinned).sort((a: any, b: any) => Date.parse(a.created_at) - Date.parse(b.created_at))
      const notPinned: Note[] = data.data.filter((item: Note) => !item.pinned).sort((a: any, b: any) => Date.parse(a.created_at) - Date.parse(b.created_at))

      // const tempData = pinned.concat(notPinned).sort((a: any, b: any) => Date.parse(a.created_at) - Date.parse(b.created_at))
      setNotesData(pinned.concat(notPinned))
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setIsLoading(false)
    }
  }



  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey){
      event.preventDefault()
      let isValid = /[a-zA-Z]/.test(titleRef.current?.value as string) || /[a-zA-Z]/.test(noteRef.current?.value as string)

      if (isValid) {
        event.preventDefault()
        createNote(titleRef.current?.value, noteRef.current?.value)
        if(titleRef.current){
          titleRef.current.value = ""
        }
        if(noteRef.current){
          noteRef.current.value = ""
        }
        fetchData()
      }
    }
  }

  const handleHeightChange = (event: any) => {
    event.target.style.height = (event.target.scrollHeight) + "px"
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
          ref={titleRef}
          type="text" 
          placeholder='Add a Note'
          name="add-note" 
          id="add-note"
          autoComplete="off" 
          onKeyDown={handleKeyPress}/>

        <textarea className='w-full overflow-clip h-20 duration-300 bg-bg-l-100 dark:bg-bg-d-300 px-4 py-3 rounded outline-none shadow-md transition-all'
          ref={noteRef}
          placeholder='Note text...'
          name="note-desc" 
          id="note-desc" 
          onKeyDown={handleKeyPress}
          onChange={handleHeightChange}>
          
        </textarea>
      </div>
    
      {/*<div className='px-32 mt-10 flex justify-stretch gap-7 gap-y-8 flex-wrap'>
        {(notesData[0]?.created_at === "") ? (<Loading />) : (notesData.map(note => {
          return <NoteItem note={note} onReload={handleReload} key={note.id} />
        }))}
      </div>*/}

      <div className='px-32 mt-10 flex justify-stretch gap-7 mb-20'>
        <div className="flex flex-col gap-6 w-[23%]">
          {(notesData[0]?.created_at === "") ? (<Loading />) : (notesData.map((note, index) => {
            if (index % 4 === 0){
              return <NoteItem note={note} onReload={handleReload} key={note.id} />
            }
          }))}
        </div>

        <div className="flex flex-col gap-6 w-[23%]">
          {(notesData[0]?.created_at === "") ? (<Loading />) : (notesData.map((note, index) => {
            if (index % 4 === 1){
              return <NoteItem note={note} onReload={handleReload} key={note.id} />
            }
          }))}
        </div>

        <div className="flex flex-col gap-6 w-[23%]">
          {(notesData[0]?.created_at === "") ? (<Loading />) : (notesData.map((note, index) => {
            if (index % 4 === 2){
              return <NoteItem note={note} onReload={handleReload} key={note.id} />
            }
          }))}
        </div>

        <div className="flex flex-col gap-6 w-[23%]">
          {(notesData[0]?.created_at === "") ? (<Loading />) : (notesData.map((note, index) => {
            if (index % 4 === 3){
              return <NoteItem note={note} onReload={handleReload} key={note.id} />
            }
          }))}
        </div>
      </div>
    </>
  )
}