import { PartyPopper } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useNavigate } from "react-router-dom";

const ReceiptModal = ({ isOpen, onClose, receipt,name }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();
  const deleteCart = async () => {
    try {
      const { data } = await axiosInstance.delete(API_PATHS.CART.DELETE_CART);
      if(data?.success){

        navigate('/');
      }
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-md text-center relative animate-fadeIn">
        <div className="flex justify-center mb-4">
          <PartyPopper size={72} className="text-yellow-500 animate-bounce" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🎉 Congratulations {name||'Shopper'}!
        </h2>

        <p className="text-gray-600 mb-4">Your checkout was successful.</p>

        <div className="bg-gray-100 rounded-xl py-3 mb-4">
          <p className="text-lg font-semibold text-gray-700">
            Total: <span className="text-green-600">${receipt.total}</span>
          </p>
          <p className="text-sm text-gray-500">
            {new Date(receipt.timestamp).toLocaleString()}
          </p>
        </div>

        <button
          onClick={()=>{deleteCart();onClose()}}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;
