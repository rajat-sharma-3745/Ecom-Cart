import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { Toaster } from "sonner";


const AppContext = createContext(null);
const AppProvider = ({ children }) => {
    const [cart,setCart] = useState(null)
    const [products,setProducts] = useState([])
    async function getProducts(){
        try {
            
            const {data} = await axiosInstance.get(API_PATHS.PRODUCTS.GET)
            setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }
    async function getCart(){
        try {
            
            const {data} = await axiosInstance.get(API_PATHS.CART.GET)
            setCart(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getProducts()
        getCart()
    },[])
    const value = {cart,products,setCart,setProducts,getCart}
  return <AppContext.Provider value={value}>
        <Toaster position="top-center" />
    {children}
  </AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
export default AppProvider