"use client"
import { Search } from "lucide-react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function SearchBar() {
  const [text, setText] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const handleInput = (e: any) => {
    setText(e.target.value)
  }
  const setQuery = (name: any, value: any) => {
    // 1. Create a modified query string

    params.set(name, value)

    // 2. Update the URL
    router.push(`${pathname}?${params.toString()}`)
  }
  return (
    <div className="flex flex-row">
      <input
        type="text"
        value={text}
        onChange={(e) => handleInput(e)}
        className="h-8 w-lg rounded-tl rounded-bl bg-primary px-4 text-xs text-black"
      />
      <button
        className="h-8 rounded-tr rounded-br bg-primary px-2 text-xs text-black"
        onClick={() => setQuery("search", text)}
      >
        <Search />
      </button>
    </div>
  )
}
