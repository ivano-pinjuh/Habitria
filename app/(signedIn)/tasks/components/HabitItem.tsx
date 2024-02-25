"use client"

import { deleteHabit, updateHabit } from "@/lib/supabase/db-actions"
import { SlOptionsVertical } from "react-icons/sl"

import { Modal } from "./Modal"

import { useState } from "react"

export default function HabitItem({ title, id, onReload } : any) {
  const [showModal, setShowModal] = useState(false)


  function onClose() {
    setShowModal(false)
  }

  function onSave(title: string) {
    updateHabit(id, title)
    setShowModal(false)
    onReload()
  }


  const deleteHandler = () => {
    deleteHabit(id)
    onReload(id)
  }

  return (
    <>
    <Modal showModal={showModal} onSave={onSave} onDelete={deleteHandler} onClose={onClose} type={"Habit"} title={title} >
        
    </Modal>
    <div className="group w-full flex justify-between h-16 bg-bg-l-200 dark:bg-bg-d-300 rounded cursor-grab hover:shadow-xl shadow-md transition-all">
      

      <div className="w-[9%] flex justify-center items-center rounded-l h-full bg-prim-100">
        <div className="cursor-pointer w-7 h-7 flex items-center text-2xl justify-center bg-black bg-opacity-25 hover:bg-opacity-40 rounded-full transition-all">
          <p className="mb-1">
            +
          </p>
        </div>
      </div>

      <div className="flex justify-between flex-grow px-3 py-2 relative" onClick={() => setShowModal(true)} >
        
        <h6 className="font-semibold">
          {title}
        </h6>

        <div className="group/opt cursor-pointer hidden group-hover:inline-block transition-all h-6 relative">
          <SlOptionsVertical className="hover:opacity-100 opacity-70" />
          <p className="absolute text-xs text-text-d-100 bg-bg-d-200 px-2 py-1 rounded -top-7 -left-4 group-hover/opt:opacity-100 duration-300 opacity-0">
            Options
          </p>
        </div>
      </div>

      <div className="w-[9%] flex justify-center items-center rounded-r h-full bg-prim-100">
        <div className="cursor-pointer w-7 h-7 flex items-center text-2xl justify-center bg-black bg-opacity-25 hover:bg-opacity-40 rounded-full transition-all">
          <p className="mb-[1px]">
            -
          </p>
        </div>
      </div>

    </div>
    </>
  )
}

