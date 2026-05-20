// components/ui/Card.tsx
import Image from "next/image"

export default function Card({ data }: { data: any }) {
  // Guard clause: If the data hasn't loaded into state yet, return a skeleton/null
  if (!data) {
    return <div className="text-white">Loading card data...</div>
  }

  return (
    <div className="overflow-hidden rounded-lg bg-secondary shadow-md">
      {/* Top Section: Image */}
      <Image
        src={data.imageUrl}
        alt={data.title || "Card Image"}
        width={data.imageWidth}
        height={data.imageHeight}
        className="bg-white object-cover"
        unoptimized // Use this temporary flag so Next.js ignores external domain validation limits during testing
      />

      {/* Bottom Section: Content */}
      <div className="flex items-center justify-center bg-secondary p-4">
        <h5 className="text-m font-bold tracking-tight text-primary">
          {data.title}
        </h5>
      </div>
    </div>
  )
}
