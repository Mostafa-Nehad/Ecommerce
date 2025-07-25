import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(res => setCategories(res.data.data))
      .catch(err => console.log(err))
  }, [])

  const [subCategories, setSubCategories] = useState([])

  useEffect(() => {
  document.title = 'Categories';
    if (selectedCategory) {
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${selectedCategory._id}/subcategories`)
        .then(res => setSubCategories(res.data.data))
        .catch(err => console.log(err))
    }
  }, [selectedCategory])

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div
            key={cat._id}
            className="card border border-gray-300 transition duration-300 hover:shadow-[1px_1px_10px_#4fa74f] rounded cursor-pointer "
            onClick={() => setSelectedCategory(cat)}
          >
            <img src={cat.image} alt={cat.name} className="w-full h-[300px] object-cover rounded-t" />
            <div className="card-body p-4">
              <p className="text-green-700 text-2xl text-center font-semibold ">{cat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <>
          <h2 className="text-center text-green-600 text-3xl my-10 font-semibold">
            {selectedCategory.name} Subcategories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {subCategories.map(sub => (
              <div
                key={sub._id}
                className="card border border-gray-200 rounded stransition duration-300 hover:shadow-[1px_1px_10px_#4fa74f]"
              >
                <p className="text-center text-lg p-4">{sub.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}