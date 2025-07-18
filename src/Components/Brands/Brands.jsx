import React, { useEffect, useState } from 'react';
import style from './Brands.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  
  useEffect(() => {
  document.title = 'Brands';
}, [])

  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  let { data, isError, isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
    select: (data) => data?.data?.data,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>Error.......</h1>;


  return (
    <>
      <h1 className='text-green-600 text-5xl text-center w-fit block mx-auto my-10'>All Brands</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 justify-center">
        {data?.map((brand) => (
          <div
            key={brand._id}
            className='border border-gray-300 rounded transition duration-300 hover:shadow-[1px_1px_10px_#4fa74f] cursor-pointer'
            onClick={() => setSelectedBrand(brand)}
          >
            <div>
              <img src={brand.image} alt={brand.name} className="w-full h-[200px] object-contain p-4" />
            </div>
            <div>
              <h2 className='text-center border-t border-t-gray-300 text-1xl py-5'>{brand.name}</h2>
            </div>
          </div>
        ))}
      </div>

      {selectedBrand && (
<div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg relative">
            <button
              onClick={() => setSelectedBrand(null)}
              className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>

            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-3xl font-bold text-green-600">{selectedBrand.name}</h2>
                <p className="text-gray-500 lowercase mt-1">{selectedBrand.slug}</p>
              </div>
              <img
                src={selectedBrand.image}
                alt={selectedBrand.name}
                className="w-24 h-24 object-contain"
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedBrand(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}