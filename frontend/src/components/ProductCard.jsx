import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";


const ProductCard = ({ product }) => {
  const {setCart} = useAppContext()
  const [loading,setLoading] = useState(false)
  async function handleAddToCart(product) {
    try {
      setLoading(true)
      const {data}=await axiosInstance.post(API_PATHS.CART.ADD_PRODUCT,{productId:product._id})
      if(data?.success){
        toast.success(data?.message)
        setCart(data?.cart)
      }
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className="border border-gray-200 bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
      <div className="w-full border-b border-gray-200 mb-2">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain rounded-lg mb-3"
      />
      </div>
      <div className="flex flex-1 justify-between items-center px-3 w-full mb-2">
        <h3 className="text-md xl:text-lg font-semibold w-48 overflow-hidden whitespace-nowrap text-ellipsis">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
      </div>
      <button
        onClick={() => handleAddToCart(product)}
        className="bg-gray-900 cursor-pointer hover:bg-gray-950 transition-colors duration-300 text-white px-4 py-2 font-bold rounded-lg w-full"
      >
       {loading?'Adding...':'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
