import React, { useEffect, useState } from 'react'
import ReceiptModal from '../components/ReceiptModal';
import { useAppContext } from '../context/AppContext';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const Checkout = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [showModal, setShowModal] = useState(false);
  const [receipt, setReceipt] = useState({total:1100,timestamp:new Date()});
  const {cart,getCart} = useAppContext()

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkout= async(cart) => {
    try {
      const {data} = await axiosInstance.post(API_PATHS.CHECKOUT.PROCESS,{cartItems:cart.items})
      if(data?.success){
        setShowModal(p=>!p);
        setReceipt(data?.receipt)
      }
    } catch (error) {
      console.error(error)
    }
  }

 useEffect(()=>{
  getCart();
 },[cart])

  const total = cart?.items?.reduce((sum, item) => sum + item?.price*item?.qty, 0);

  return (
    <div className="max-w-7xl pt-4 px-8 lg:mx-auto flex justify-center gap-10 flex-wrap font-sans text-gray-700">
      
      {/* Checkout Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 w-full md:w-[45%] h-max">
        <h2 className="text-xl font-semibold mb-4">Checkout</h2>

        {/* Dynamic Rendering */}
        {cart?.items.map((product) => (
          <div
            key={product.productId}
            className="flex justify-between items-start border-b pb-3 mb-3"
          >
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet</p>
            </div>
            <span className="font-medium">${product?.price*product?.qty}</span>
          </div>
        ))}

        <div className="flex justify-between items-center text-lg font-semibold">
          <h3>Total</h3>
          <span>${total}</span>
        </div>
      </div>

     
      <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-[45%] h-max">
        <h3 className="text-lg font-semibold mb-4">Personal Details</h3>

        <div className="mb-4">
          <label className="text-xs text-gray-500 block mb-1">Name</label>
          <input
            type="text"
            name='name'
            value={form.name}
            onChange={changeHandler}
            placeholder="Alan Doe"
            className="w-full border rounded-md p-3 text-sm outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-500 block mb-1">
           Email
          </label>
          <input
            type="email"
            placeholder="alan@gmail.com"
            name='email'
            value={form.value}
            onChange={changeHandler}
            
            className="w-full border rounded-md p-3 text-sm outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button onClick={()=>checkout(cart)} disabled={!form.name||!form.email} className="disabled:bg-blue-400 disabled:cursor-not-allowed cursor-pointer w-full bg-blue-600 hover:bg-blue-700 transition text-white rounded-md py-3 font-medium">
          Proceed
        </button>
      </div>
      <ReceiptModal name={form.name} isOpen={showModal} onClose={()=>setShowModal(false)} receipt={receipt}/>
    </div>
  );
}

export default Checkout