// page.tsx
import SearchBar from "components/ui/SearchBar"
import Card from "components/ui/Card"

export default async function Home({ searchParams }: any) {
  try {
    const params = await searchParams
    const searchWord = params?.search || ""

    let targetUrl = ""

    // 1. Alternate routing based on search param presence
    if (searchWord.trim() !== "") {
      targetUrl = `https://api.imdbapi.dev/search/titles?query=${encodeURIComponent(searchWord)}`
    } else {
      const BASE_URL = "https://api.imdbapi.dev/titles"
      const filters = {
        types: ["MOVIE", "TV_SERIES"],
        genres: ["Action", "Sci-Fi"],
        countryCodes: ["US"],
        startYear: 2020,
        endYear: 2026,
        minAggregateRating: 7.5,
        sortBy: "SORT_BY_USER_RATING",
        sortOrder: "DESC",
      }

      const queryPairs = Object.entries(filters).flatMap(([key, val]) =>
        Array.isArray(val) ? val.map((v) => [key, v]) : [[key, val]]
      )
      const queryString = new URLSearchParams(queryPairs).toString()
      targetUrl = `${BASE_URL}?${queryString}`
    }

    // 2. Freshly request data from network on demand
    const res = await fetch(targetUrl, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    })

    if (!res.ok) throw new Error("Failed to fetch movie data")
    const json = await res.json()

    // 3. Fallback extraction layer handles different property wrappers gracefully
    const rawItems = json.titles || json.results || json.data || []

    const movies = rawItems.map((item: any) => ({
      id: item.id,
      title: item.primaryTitle || item.originalTitle || item.title,
      imageUrl: item.primaryImage?.url || "https://placehold.co/400x600",
      imageWidth: item.primaryImage?.width || 300,
      imageHeight: item.primaryImage?.height || 450,
    }))

    return (
      <div className="mt-8 flex flex-col items-center">
        <SearchBar />

        {/* Dynamic Card Display Grid */}
        <div className="mt-8 grid w-full grid-cols-1 gap-6 px-8 sm:grid-cols-2 md:grid-cols-4">
          {movies.length === 0 ? (
            <p className="col-span-full py-12 text-center text-gray-500">
              No matching titles found for "{searchWord}".
            </p>
          ) : (
            movies.map((movie: any) => <Card key={movie.id} data={movie} />)
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Fetch Error Details:", error)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-red-500 p-8 text-center font-bold text-white">
        <div>
          <h1 className="mb-2 text-xl">Something Went Wrong With the Server</h1>
          <p className="text-sm font-normal opacity-90">
            Check your terminal log for the raw API response trace.
          </p>
        </div>
      </div>
    )
  }
}
