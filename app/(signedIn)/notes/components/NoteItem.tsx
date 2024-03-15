"use client"

type Props = {
  note: Note
  onReload: () => void
}

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown"
import { Modal } from "./Modal"
import { MdOutlineColorLens } from "react-icons/md"
import { TiPinOutline, TiPin } from "react-icons/ti"



import { useState } from "react"

import { deleteNote, updateNote } from "@/lib/supabase/db-actions"


export default function NoteItem({ note, onReload }: Props) {
  const [showModal, setShowModal] = useState(false)

  const colors = ["bg-bg-l-200 dark:bg-bg-d-200", "bg-red-600", "bg-green-600", "bg-blue-600"]

  const onClose = () => {
    setShowModal(false)
  }

  const updatePositive = () => {
    //updateItem(habit.id, habit.title, habit.note, habit.difficulty, {positive: habit.positive + 1, negative: habit.negative })
    onReload()
  }

  const updateNegative = () => {
    //updateItem()
    onReload()
  }

  const onSave = (title: string, desc: string) => {
    updateNote(note.id, { title: title, note: desc })
    setShowModal(false)
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
  const updatePinned = () => {
    updateNote(note.id, { pinned: !note.pinned })
    onReload()
  }


  return (
    <>
      <Modal showModal={showModal} onSave={onSave} onDelete={deleteHandler} onClose={onClose} id={note.id} title={note.title} note={note.note} >
        
      </Modal>
      <div onClick={(e) => { if(e.target === e.currentTarget) {setShowModal(true)} }} 
        className={`relative select-none cursor-default flex flex-col w-full min-h-40 pb-16 py-4 px-4 transition-all hover:scale-[1.01] rounded border border-bg-d-300 dark:border-none ${colors[note.background]} shadow-lg`}>

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
        
        <div className="w-full flex absolute bottom-2 items-center justify-end pr-10">
          {note.pinned ? (<span onClick={updatePinned}
                              className="flex items-center justify-center w-8 h-8 hover:bg-opacity-40 bg-black bg-opacity-0 rounded-full cursor-pointer">
                            <TiPin className="text-xl mr-[1px]" />
                          </span>) : 
                        (<span onClick={updatePinned}
                          className="flex items-center justify-center w-8 h-8 hover:bg-opacity-40 bg-black bg-opacity-0 rounded-full cursor-pointer">
                          <TiPinOutline className="text-xl mr-[1px]" />
                        </span>)}

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <button className="hover:bg-opacity-40 bg-black bg-opacity-0 rounded-full w-8 h-8">
                <MdOutlineColorLens className="text-xl w-8" />
              </button>
            </DropdownTrigger>

            <DropdownMenu className="bg-bg-l-200 dark:bg-bg-d-200 rounded-xl w-64 px-3 pt-2" aria-label="Background dropdown">
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
        
      </div>
    </>
  )
}