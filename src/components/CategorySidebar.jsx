import { sidebarCategories } from "../data/mockProducts.js";

const subcategories = {
  "Woman's Fashion": ["Dresses", "Tops", "Shoes", "Bags"],
  "Men's Fashion": ["Shirts", "Jeans", "Jackets", "Shoes"],
};

export function CategorySidebar() {
  return (
    <aside className="hidden lg:block w-64 shrink-0 pr-6 border-r border-gray-100">
      <ul>
        {sidebarCategories.map((cat) => (
          <li key={cat.name} className="relative group">
            <div className="flex items-center justify-between py-3 text-sm text-gray-700 hover:text-brand-red cursor-pointer">
              <span>{cat.name}</span>
              {cat.hasChildren && <span className="text-xs">›</span>}
            </div>
            {cat.hasChildren && (
              <div className="hidden group-hover:block absolute left-full top-0 ml-2 bg-white border rounded-md shadow-lg p-4 w-48 z-20">
                <ul className="space-y-2 text-sm text-gray-600">
                  {subcategories[cat.name].map((sub) => (
                    <li
                      key={sub}
                      className="hover:text-brand-red cursor-pointer"
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
