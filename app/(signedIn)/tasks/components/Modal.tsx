import { useRef } from "react"

import { MdOutlineDeleteForever } from "react-icons/md"

export function Modal({ showModal, onDelete, onClose, onSave, title, note, difficulty, id, type, children }: any ){
  const modalRef = useRef<null | HTMLDialogElement>(null)
  const titleRef = useRef<null | HTMLInputElement>(null)
  const noteRef = useRef<null | HTMLTextAreaElement>(null)
  const difficultyRef = useRef<null | HTMLSelectElement>(null)

  if (showModal){
    modalRef.current?.showModal()
  }

  const closeModal = () => {
    modalRef.current?.close()
    onClose()
  }

  const handleSave = () => {
    modalRef.current?.close()
    onSave(titleRef.current?.value, noteRef.current?.value, difficultyRef.current?.value)
  }

  const handleDelete = () => {
    onDelete()
    modalRef.current?.close()
  }

  return (
    <dialog ref={modalRef} className="fixed top-0 left-0 z-50  rounded-md backdrop:bg-gray-800/70">
      <div className="cursor-default md:w-[520px] w-full max-w-fullbg-gray-200 flex flex-col">

        <div className="w-full mb-4 py-4 px-5 bg-prim-100">
          <div className="w-full flex pb-5 flex-row justify-between items-center">
            <h1 className="text-lg font-semibold">
            Edit {type}
            </h1>

            <div className="flex gap-3">
              <button onClick={closeModal} className="mb-2 py-1 px-1 cursor-pointer border-none outline-none h-8 text-sm hover:underline transition-all">
                Cancel
              </button>
              <button onClick={handleSave} className="mb-2 py-1 px-3 cursor-pointer rounded border-none outline-none h-8 text-sm hover:shadow-md shadow 
                                                      font-semibold bg-bg-l-100 dark:bg-bg-d-100 transition-all">
                Save
              </button>
            </div>
          </div>
          
          <div className="w-full flex flex-col gap-6">
            <div>
              <label htmlFor={id} className="font-semibold text-sm pl-1" >
                Title*
              </label>
              <input className='w-full text-sm duration-300 bg-bg-l-100 dark:bg-bg-d-300 h-10 px-4 rounded outline-none shadow-md transition-all' 
                ref={titleRef}
                type="text" 
                placeholder='Add a title'
                name="add-title" 
                id={id}
                defaultValue={title}
                autoComplete="off" />
            </div>

            <div>
              <label htmlFor={`${id}2`} className="font-semibold text-sm pl-1" >
                Notes
              </label>
              <textarea className='w-full text-sm duration-300 bg-bg-l-100 dark:bg-bg-d-300 h-20 px-4 py-1 rounded outline-none shadow-md transition-all' 
                ref={noteRef}
                placeholder='Add a note'
                name="add-note" 
                id={`${id}2`}
                defaultValue={note}
                autoComplete="off" />
            </div>
            
          </div>
        </div>

        <div className="px-5 pt-4 pb-6">
          <div className="relative">
            <label htmlFor={`${id}3`} className="font-semibold text-sm pl-1" >
              Difficulty
            </label>
            <select className="w-full cursor-pointer appearance-none text-sm duration-300 bg-bg-l-100 dark:bg-bg-d-300 h-10 px-4 rounded outline-none shadow-md transition-all"
              name="" 
              id={`${id}3`}
              ref={difficultyRef}
              defaultValue={difficulty}
            >
              <option value="1">Very Easy</option>
              <option value="2">Easy</option>
              <option value="3">Medium</option>
              <option value="4">Hard</option>
            </select>
            <p className="absolute right-2 bottom-2">
              &#11167;
            </p>
          </div>
          
          {children}

          <div className="flex justify-center mt-6">
            <button onClick={handleDelete} className="text-red-500 text-sm flex items-center gap-1 hover:underline transition-all">
              <MdOutlineDeleteForever className="text-2xl" /> Delete this {type}
            </button>
          </div>

        </div>

      </div>
    </dialog>
  )
}