import { useRef } from "react"

import { MdOutlineDeleteForever } from "react-icons/md"

export function Modal({ showModal, onDelete, onClose, onSave, title, type, children }: any ){
  const modalRef = useRef<null | HTMLDialogElement>(null)
  const titleRef = useRef<null | HTMLInputElement>(null)

  if (showModal){
    modalRef.current?.showModal()
  }

  const closeModal = () => {
    modalRef.current?.close()
    onClose()
  }

  const handleSave = () => {
    modalRef.current?.close()
    onSave(titleRef.current?.value)
  }

  const handleDelete = () => {
    modalRef.current?.close()
    onDelete()
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
          
          <div className="w-full">
            <div>
              <label htmlFor="add-title" className="font-semibold text-sm pl-1" >
                Title*
              </label>
              <input className='w-full text-sm duration-300 bg-bg-l-100 dark:bg-bg-d-300 h-10 px-4 rounded-sm outline-none shadow-md transition-all' 
                ref={titleRef}
                type="text" 
                placeholder='Add a title'
                name="add-title" 
                id="add-title"
                defaultValue={title}
                autoComplete="off" />
            </div>
            
            
          </div>
        </div>

        <div className="px-5 pb-6">
          {children}

          <div className="flex justify-center mt-6">
            <button onClick={handleDelete} className="text-red-500 text-sm flex items-center gap-1 hover:underline transition-all">
              <MdOutlineDeleteForever className="text-2xl" /> Delete This {type}
            </button>
          </div>

        </div>

      </div>
    </dialog>
  )
}