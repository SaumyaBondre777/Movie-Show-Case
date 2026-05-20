// page.tsx

import SearchBar from "components/ui/SearchBar"
import Card from "components/ui/Card"

export default async function Home() {
  try {
    const API_URL = "https://api.imdbapi.dev/titles"

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

    const res = await fetch(`${API_URL}?${queryString}`, {
      headers: { Accept: "application/json" },
    })

    if (!res.ok) throw new Error("Failed to fetch movie data")
    const json = await res.json()

    const mappedData = (json.titles || []).map((item: any) => ({
      id: item.id,
      title: item.primaryTitle || item.originalTitle,
      imageUrl: item.primaryImage?.url || "https://placehold.co/400x600",
      imageWidth: item.primaryImage?.width || 300,
      imageHeight: item.primaryImage?.height || 450,
    }))

    const movies = mappedData

    return (
      <div className="mt-8 flex flex-col items-center">
        <SearchBar />

        {/* Grid container to map out all movies from state */}
        <div className="mt-8 grid w-full grid-cols-1 gap-6 px-8 sm:grid-cols-2 md:grid-cols-4">
          {movies.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              Searching for titles...
            </p>
          ) : (
            movies.map((movie: any) => <Card key={movie.id} data={movie} />)
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Fetch Error:", error)
    return (
      <div className="h-full w-full bg-red-400">
        <h1>Something Went Wrong.....</h1>
      </div>
    )
  }
}
