"use client"

type Props = {
  note: Note
  onReload: () => void
}


import { useState } from "react"
import { Modal } from "./Modal"

export default function NoteItem({ note, onReload }: Props) {
  const [showModal, setShowModal] = useState(false)


  const onClose = () => {
    //setShowModal(false)
  }

  const onSave = (title: string, note: string, difficulty: number) => {
    //updateItem(habit.id, title, note, difficulty)
    setShowModal(false)
    onReload()
  }

  const updatePositive = () => {
    //updateItem(habit.id, habit.title, habit.note, habit.difficulty, {positive: habit.positive + 1, negative: habit.negative })
    onReload()
  }

  const updateNegative = () => {
    //updateItem()
    onReload()
  }


  const deleteHandler = () => {
    //deleteItem(habit.id)
    setShowModal(false)
    onReload()
  }
  return (
    <>
      <Modal showModal={showModal} onSave={onSave} onDelete={deleteHandler} onClose={onClose} id={note.id} title={note.title} note={note.note} >
        
      </Modal>
      <div className="flex flex-col w-[23%] h-40 py-4 px-4 transition-all hover:scale-[1.01] cursor-pointer rounded border border-bg-d-300 dark:border-none bg-bg-l-200 dark:bg-bg-d-200 shadow-lg">
        <h6 className="font-semibold text-lg">
          {note.title}
        </h6>
        <p className="text-xs">
          {note.note}
        </p>
      </div>
    </>
  )
}