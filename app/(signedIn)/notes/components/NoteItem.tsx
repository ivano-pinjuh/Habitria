"use client"

type Props = {
  note: Note
  onReload: () => void
}

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown"

import { useState } from "react"
import { Modal } from "./Modal"


import { deleteNote, updateNote } from "@/lib/supabase/db-actions"


export default function NoteItem({ note, onReload }: Props) {
  const [showModal, setShowModal] = useState(false)

  const colors = ["bg-bg-l-200 dark:bg-bg-d-200", "bg-red-600", "bg-green-600", "bg-blue-600"]

  const onClose = () => {
    setShowModal(false)
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
    deleteNote(note.id)
    setShowModal(false)
    onReload()
  }
  const updateColor = (value: number) => {
    note.background = value
    updateNote(note.id, { background: value })
    onReload()
  }


  return (
    <>
      <Modal showModal={showModal} onSave={onSave} onDelete={deleteHandler} onClose={onClose} id={note.id} title={note.title} note={note.note} >
        
      </Modal>
      <div onClick={() => {setShowModal(true)}} className={`flex flex-col w-[23%] h-40 py-4 px-4 transition-all hover:scale-[1.01] cursor-pointer rounded border border-bg-d-300 dark:border-none ${colors[note.background]} shadow-lg`}>
        <h6 className="font-semibold text-lg">
          {note.title}
        </h6>
        <p className="text-xs">
          {note.note.split('\n').map((line, index) => (
            <span key={index}>
              {line}
            <br />
            </span>))
          }
        </p>

        <Dropdown placement="bottom-end">
          <DropdownTrigger className="w-fit bg-bg-l-200 dark:bg-bg-d-200">
            <button className="outline-none">
              color
            </button>
          </DropdownTrigger>
          <DropdownMenu className="bg-bg-l-200 dark:bg-bg-d-200 rounded-xl w-64 px-3 pt-2" aria-label="User dropdown">
            <DropdownSection>
              <DropdownItem onClick={() => updateColor(0)}>
                default
              </DropdownItem>
              <DropdownItem onClick={() => updateColor(1)}>
                red
              </DropdownItem>
              <DropdownItem onClick={() => updateColor(2)}>
                green
              </DropdownItem>
              <DropdownItem onClick={() => updateColor(3)}>
                blue
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  )
}