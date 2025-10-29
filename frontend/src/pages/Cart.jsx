import { useEffect } from "react";
import CartItem from "../components/CartItem";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import NoProductFound from '../assets/noProductFound.avif'



const Cart = () => {
  const {cart,getCart} = useAppContext();
  const navigate = useNavigate();
  useEffect(()=>{
    getCart();
  },[])
  if(cart && cart?.items?.length<1){
    return <div className="max-w-sm mx-auto">
        <img src={NoProductFound} alt="" className=" p-6" />
        <h1 className="text-center font-semibold text-2xl">
          Cart is empty
        </h1>
      </div>
  }
  
  return (
  
    <div className="pt-4 min-h-screen">
      <div className="max-w-4xl bg-white mx-auto shadow-md rounded-lg p-6 ">
        <div className="flex justify-between items-center mb-4">
      <h2 className="sm:text-xl text-md font-bold text-center ">
        Items in Your Cart
      </h2>
      <button onClick={()=>navigate('/checkout')} className=" cursor-pointer bg-blue-500 text-white text-center sm:px-4 px-2 sm:py-2 py-1 sm:rounded-md rounded">Checkout</button>
      </div>

      {/* Header Row */}
      <div className="flex justify-between pb-2 border-b font-semibold text-gray-600">
        <p className="sm:w-1/2 w-36">Item</p>
        <p className="sm:w-24 w-16 text-center">Price</p>
        <p className="sm:w-24 w-16 text-center">Quantity</p>
        <p className="sm:w-24 w-16 text-center">Action</p>
        <p className="sm:w-24 w-16 text-right">Total</p>
      </div>

      {cart?.items?.map(item => (
        <CartItem key={item.productId} item={item} />
      ))}
    </div>
    </div>
  );
};

export default Cart;
