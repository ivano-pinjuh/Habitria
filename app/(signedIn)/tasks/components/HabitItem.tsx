"use client"

type Props = {
  habit: ItemData,
  onReload: () => void
}

import { deleteItem, updateItem } from "@/lib/supabase/db-actions"
import { SlOptionsVertical } from "react-icons/sl"

import { Modal } from "./Modal"

import { useRef, useState } from "react"

export default function HabitItem({ habit, onReload } : Props) {
  const [showModal, setShowModal] = useState(false)
  const targetRef = useRef<null | HTMLInputElement>(null)

  const onClose = () => {
    setShowModal(false)
  }

  const onSave = (title: string, note: string, difficulty: number) => {
    habit.title = title
    habit.note = note
    updateItem(habit.id, title, note, difficulty, {target: Number(targetRef.current?.value)})
    setShowModal(false)
    onReload()
  }

  const updatePositive = () => {
    habit.positive += 1
    updateItem(habit.id, habit.title, habit.note, habit.difficulty, {positive: habit.positive, target: habit.target })
    onReload()
  }

  const updateNegative = () => {
    habit.positive -= 1
    updateItem(habit.id, habit.title, habit.note, habit.difficulty, {positive: habit.positive, target: habit.target})
    onReload()
  }


  const deleteHandler = () => {
    deleteItem(habit.id)
    setShowModal(false)
    onReload()
  }
 
  return (
    <>
    <Modal showModal={showModal} onSave={onSave} onDelete={deleteHandler} onClose={onClose} id={habit.id} type={"Habit"} title={habit.title} note={habit.note} difficulty={habit.difficulty} >
      <div className="mt-3 mb-2">
        <label htmlFor={habit.id} className="font-semibold text-sm pl-1" >
          Daily Target
        </label>
        <input className='w-full text-sm duration-300 bg-bg-l-100 dark:bg-bg-d-300 h-10 px-4 rounded outline-none shadow-md transition-all' 
          ref={targetRef}
          type="number" 
          placeholder='Your daily target...'
          name="add-title" 
          id={habit.id}
          min={1}
          defaultValue={habit.target}
          autoComplete="off" />
        </div>
    </Modal>
    <div className="group w-full flex justify-between min-h-16 h-fit bg-bg-l-200 dark:bg-bg-d-300 rounded cursor-grab hover:shadow-xl shadow-md transition-all">
      

      <div className="w-[9%] flex justify-center rounded-l bg-prim-100">
        <button onClick={updateNegative} 
          disabled={habit.positive === 0}
          className={`${habit.positive > 0 ? "bg-opacity-25 hover:bg-opacity-40 cursor-pointer" : "opacity-25"}
            mt-5 w-7 h-7 flex items-center text-2xl justify-center bg-black rounded-full transition-all`}>
          <p className="mb-[1px] text-text-d-100">
            -
          </p>
        </button>
      </div>

      <div className="flex justify-between w-[82%] px-3 py-2 relative" onClick={() => setShowModal(true)} >
        <div className="flex flex-col">
          <h6 className="font-semibold">
            {habit.title}
          </h6>
          <p className="text-xs pb-4">
            {habit.note.split('\n').map((line, index) => (
              <span className="break-all" key={index}>
                {line}
              <br />
              </span>))
            }
          </p>
        </div>

        <div className="flex gap-1 absolute text-xs right-2 bottom-2">
          <p>
            {`${habit.positive} /`}
          </p>
          <p>
            {habit.target}
          </p>
        </div>

        <div className="group/opt cursor-pointer hidden group-hover:inline-block transition-all h-6 relative">
          <SlOptionsVertical className="absolute right-2 hover:opacity-100 opacity-70" />
          <p className="absolute text-xs text-text-d-100 bg-bg-d-200 px-2 py-1 rounded -top-7 -left-4 group-hover/opt:opacity-100 duration-300 opacity-0">
            Options
          </p>
        </div>
      </div>

      <div className="w-[9%] flex justify-center rounded-r bg-prim-100">
        <button onClick={updatePositive} 
          disabled={habit.positive === habit.target}
          className={`${habit.positive !== habit.target ? "bg-opacity-25 hover:bg-opacity-40 cursor-pointer" : "opacity-25"}
            mt-5 cursor-pointer w-7 h-7 flex items-center text-2xl justify-center bg-black bg-opacity-25 hover:bg-opacity-40 rounded-full transition-all`}>
          <p className="mb-1 text-text-d-100">
            +
          </p>
        </button>
      </div>

    </div>
    </>
  )
}

