export const server = import.meta.env.VITE_BACKEND_URL;


export const API_PATHS = {
    PRODUCTS: {
        GET: '/products'
    },
    CART: {
        GET: '/cart',
        ADD_PRODUCT:'/cart',
        DELETE_CART:'/cart',
        REMOVE_PRODUCT:(id)=>`/cart/${id}`,
        UPDATE_QUANTITY:'/cart/update-qty'
    },
    CHECKOUT:{
        PROCESS:'/checkout'
    }
}