'use client'
function CategoryFilter({ selectedCategory, setSelectedCategory, categories }) {
    return (
      <div className="flex items-center justify-center mt-4 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 mx-1 rounded-full text-sm whitespace-nowrap transition-all ${
              selectedCategory === category
                ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 text-cyan-300"
                : "bg-gray-900/30 border border-gray-800 text-gray-400 hover:text-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }
  
  export default CategoryFilter;
  