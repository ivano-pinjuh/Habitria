type Props = {}

export default function NoteItem({}: Props) {
  return (
    <div className="flex flex-col w-[23%] h-40 py-4 px-4 rounded border border-bg-d-300 dark:border-none bg-bg-l-200 dark:bg-bg-d-200 shadow-lg">
      <h6 className="font-semibold text-lg">
        title
      </h6>
      <p className="text-xs">
        note
      </p>
    </div>
  )
}