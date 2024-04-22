"use client"
import { useRef } from "react"

export function ResetModal({ showModal, onClose, data }: any ){
  const modalRef = useRef<null | HTMLDialogElement>(null)

  if (showModal){
    modalRef.current?.showModal()
  }

  const closeModal = () => {
    modalRef.current?.close()
  }

  return (
    <dialog ref={modalRef} className="fixed top-0 left-0 z-50  rounded-md backdrop:bg-gray-800/70">
      <div className="cursor-default md:w-[520px] w-full max-w-fullbg-gray-200 flex flex-col">

        <div className="w-full mb-4 py-4 px-5 bg-prim-100">
          <div className="w-full flex pb-5 flex-row justify-between items-center">
            <h1 className="text-lg font-semibold">
              Welcome back!
            </h1>
          </div>
          
          <div className="w-full flex flex-col gap-6">
            
          </div>
        </div>

        <div className="px-5 pt-4 pb-6">
          
          <div className="flex justify-center mt-6">
            <button onClick={closeModal} className="text-red-500 text-sm flex items-center gap-1 hover:underline transition-all">
              Close
            </button>
          </div>

        </div>

      </div>
    </dialog>
  )
}