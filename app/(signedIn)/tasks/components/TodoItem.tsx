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
    updateItem(todo.id, title, note, difficulty)
    setShowModal(false)
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
      <div className="w-[9%] flex justify-center items-center rounded-l h-full bg-prim-100">
        <div className="w-7 h-7 flex items-center justify-center rounded-lg relative transition-all">
          {/*<input className="border-2 appearance-auto w-4 h-4 border-bg-l-100 dark:border-bg-d-100 outline-none"
            type="checkbox" 
            name="" 
            id="" />*/}
        </div>
      </div>

      <div className="flex justify-between flex-grow px-3 py-2 relative" onClick={() => setShowModal(true)} >
        
        <div className="flex flex-col">
          <h6 className="font-semibold">
            {todo.title}
          </h6>
          <p className="text-xs">
            {todo.note}
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