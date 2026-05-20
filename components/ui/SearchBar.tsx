import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="flex flex-row">
      <input
        type="text"
        className="h-8 w-lg rounded-tl rounded-bl bg-primary px-4 text-xs text-black"
      />
      <button className="h-8 rounded-tr rounded-br bg-primary px-2 text-xs text-black">
        <Search />
      </button>
    </div>
  )
}
