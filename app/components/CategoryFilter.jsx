"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function CategoryFilter({ categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  function handleSelect(categoryName) {
    const params = new URLSearchParams(searchParams);
    if (categoryName) {
      params.set("category", categoryName);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-4">
      <button
        onClick={() => handleSelect(null)}
        className={`px-4 py-2 rounded-full border text-sm font-medium transition
          ${!activeCategory
            ? "bg-orange-600 text-white border-orange-600"
            : "bg-base-200 text-gray-700 border-gray-300 hover:bg-base-300"}`}
      >
        All Menu
      </button>

      {categories.map((cat) => (
        <button
          key={cat.idCategory}
          onClick={() => handleSelect(cat.strCategory)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition
            ${activeCategory === cat.strCategory
              ? "bg-orange-600 text-white border-orange-600"
              : "bg-base-200 text-gray-700 border-gray-300 hover:bg-base-300"}`}
        >
          {cat.strCategory}
        </button>
      ))}
    </div>
  );
}