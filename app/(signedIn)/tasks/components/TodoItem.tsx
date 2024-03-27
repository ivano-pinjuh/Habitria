"use client"

type Props = {
  todo: ItemData,
  onReload: () => void
}

import { deleteItem, updateItem } from "@/lib/supabase/db-actions"
import { SlOptionsVertical } from "react-icons/sl"

import { Modal } from "./Modal"

import { useState } from "react"



export default function TodoItem({ todo, onReload } : Props) {
  const [showModal, setShowModal] = useState(false)

  function onClose() {
    setShowModal(false)
  }

  function onSave(title: string, note: string, difficulty: number) {
    todo.title = title
    todo.note = note
    updateItem(todo.id, title, note, difficulty)
    setShowModal(false)
    onReload()
  }

  const onComplete = () => {
    todo.completed = !todo.completed
    updateItem(todo.id, todo.title, todo.note, todo.difficulty, { completed: todo.completed })
    onReload()
  }

  const deleteHandler = () => {
    deleteItem(todo.id)
    setShowModal(false)
    onReload()
  }

  return (
    <>
    <Modal showModal={showModal} onSave={onSave} onDelete={deleteHandler} onClose={onClose} id={todo.id} type={"To-Do"} title={todo.title} note={todo.note} difficulty={todo.difficulty} >
        
    </Modal>

    <div className="group w-full flex justify-between min-h-16 h-fit bg-bg-l-200 dark:bg-bg-d-300 rounded cursor-grab hover:shadow-xl shadow-md transition-all">
      <div className="w-[9%] flex justify-center rounded-l bg-prim-100">
        <div className="relative mt-5 flex w-7 h-7 items-center justify-center gap-2.5 bg-prim-100">
          <input onChange={onComplete} checked={todo.completed} className="peer transition-all cursor-pointer relative h-7 w-7 shrink-0 appearance-none rounded-sm border-2 border-bg-l-300 dark:border-bg-d-300 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[length:40px] 
            after:bg-center after:bg-no-repeat after:content-[''] checked:bg-bg-l-200 dark:checked:bg-bg-d-200 hover:ring-2 hover:ring-gray-300 dark:hover:ring-bg-d-300 focus:outline-none"
            type="checkbox" 
            id="checkbox1"  />
          <svg className="pointer-events-none absolute h-7" width="64px" height="64px" viewBox="0 0 25.00 25.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF4081" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#FF4081CCCCCC" stroke-width="0.15"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 11.5L10.5 16.5L19.5 7.60001" stroke="#FF4081" stroke-width="2.5"></path> </g></svg>
        </div>
      </div>

      <div className="flex justify-between w-[91%] px-3 py-2 relative" onClick={() => setShowModal(true)} >
        
        <div className="flex flex-col">
          <h6 className="font-semibold">
            {todo.title}
          </h6>
          <p className="text-xs pb-4">
            {todo.note.split('\n').map((line, index) => (
              <span className="break-all" key={index}>
                {line}
              <br />
              </span>))
            }
          </p>
        </div>
        

        <div className="group/opt cursor-pointer hidden group-hover:inline-block transition-all h-6 relative">
          <SlOptionsVertical className="absolute right-2 hover:opacity-100 opacity-70" />
          <p className="absolute text-xs text-text-d-100 bg-bg-d-200 px-2 py-1 rounded -top-7 -left-4 group-hover/opt:opacity-100 duration-300 opacity-0">
            Options
          </p>
        </div>
      </div>
    </div>
    </>
  )
}