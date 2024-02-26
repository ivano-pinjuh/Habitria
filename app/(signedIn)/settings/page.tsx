/*<div className="hidden md:flex items-center gap-20">
        {(resolvedTheme === "dark" && mounted) && <p className="cursor-pointer" onClick={() => {setTheme("light")}}>toggle light</p>}
        {(resolvedTheme === "light" && mounted) && <p className="cursor-pointer" onClick={() => {setTheme("dark")}}>toggle dark</p>}
      </div>

const [mounted, setMounted] = useState(false)
const { setTheme, resolvedTheme } = useTheme()

useEffect(() => {setMounted(true)}, [])*/

export default function Settings(){
  return (
    <div>
      <div className='pattern-hive-purple-500/5 pattern-hive-scale-75 opacity-80 fixed top-0 left-0 h-screen w-full -z-50'></div>
      
      settings
    </div>
  )
}

