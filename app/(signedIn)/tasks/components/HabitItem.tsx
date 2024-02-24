{/*<span className='absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-7 duration-700 text-sm"'>
                <span className='font-semibold'>Tip:</span> To add multiple Habits, separate each one using a line break (Shift + Enter) and then press "Enter".
</span>*/}


import { deleteHabit } from "@/lib/supabase/db-actions"

export default function HabitItem({ title, id, onDelete } : any) {

  const deleteHandler = () => {
    deleteHabit(id)
    onDelete(id)
  }
  return (
    <div className="w-full flex justify-between h-16 bg-bg-l-200 dark:bg-bg-d-300 rounded cursor-grab hover:shadow-xl shadow-md transition-all">
      <div className="w-[9%] flex justify-center items-center rounded-l h-full bg-prim-100">
        <div className="cursor-pointer w-7 h-7 flex items-center text-2xl justify-center bg-black bg-opacity-25 hover:bg-opacity-40 rounded-full transition-all">
          <p className="mb-1">
            +
          </p>
        </div>
      </div>

      <div className="flex justify-between flex-grow px-3 py-2 relative">
        <h6 className="font-semibold">
          {title}
        </h6>
      </div>

      <div className="w-[9%] flex justify-center items-center rounded-r h-full bg-prim-100">
        <div onClick={deleteHandler} className="cursor-pointer w-7 h-7 flex items-center text-2xl justify-center bg-black bg-opacity-25 hover:bg-opacity-40 rounded-full transition-all">
          <p className="mb-[1px]">
            -
          </p>
        </div>
      </div>

    </div>
  )
}

