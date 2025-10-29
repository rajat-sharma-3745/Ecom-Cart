import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { data } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const CartItem = ({ item }) => {
  const {getCart} = useAppContext()
  const [quantity, setQuantity] = useState(item?.qty||1);
  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const updateItemQuantity = async(productId,quantity,delta) => {

   try {
    const newQuantity = quantity + delta;
    if(newQuantity>=1){
     const {data} = await axiosInstance.patch(API_PATHS.CART.UPDATE_QUANTITY,{productId,qty:newQuantity})
     if(data.success){
       toast.success(data.message)
     }
    }else{
      toast.info('Quantity cannot be less than 1')
    }
   } catch (error) {
      toast.error(error ||"Something went wrong")
   }
  }

  const removeFromCart = async(id)=>{
    try {
        const {data} = await axiosInstance.delete(API_PATHS.CART.REMOVE_PRODUCT(id))
     if(data.success){
       toast.success(data.message)
        getCart();
     }
    } catch (error) {
      toast.error(error||"Something went wrong")
    }
  }
   
  useEffect(()=>{
    // if(item){
    //   setQuantity(item?.qty);
    // }
  },[])

  return (
    <div className="flex items-center justify-between py-4 border-b ">
      {/* Item Info */}
      <div className="flex items-center gap-4 sm:w-1/2 w-36">
        <img src={item?.image} className="sm:w-16 sm:h-16 w-10 h-10 object-contain rounded" />

        <div>
          <h3 className="font-semibold text-gray-800 sm:w-64 w-16 overflow-hidden whitespace-nowrap text-ellipsis">{item?.name}</h3>
        </div>
      </div>

      {/* Price */}
      <p className="sm:w-24 w-16 text-center">${item?.price}</p>

      {/* Quantity */}
      <div className="flex items-center gap-2">
        <button onClick={()=>{updateItemQuantity(item.productId,quantity,-1);decrease()}} className="sm:px-3 px-1 sm:py-1 border rounded">-</button>
        <span>{quantity}</span>
        <button onClick={()=>{updateItemQuantity(item.productId,quantity,1);increase()}} className="sm:px-3 px-1 sm:py-1 border rounded">+</button>
      </div>

      <div className="text-center sm:w-24 w-16 cursor-pointer" onClick={()=>removeFromCart(item.productId)}>
        <button className=" w-10 h-10 bg-red-500 text-white inline-flex justify-center items-center rounded-md">
          <MdDelete/>
        </button>
      </div>

      {/* Total */}
      <p className="sm:w-24 w-16 text-right font-semibold">${(item?.price * quantity).toFixed(2)}</p>
    </div>
  );
};

export default CartItem;
