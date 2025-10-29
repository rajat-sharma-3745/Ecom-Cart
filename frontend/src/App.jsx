import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import Header from './components/Header'
function App() {

  const router= createBrowserRouter([
    {
      path:'/',
      element:<Header/>
    },
    {
      path:'/cart',
      element:<Cart/>
    },
    {
      path:'/checkout',
      element:<Checkout/>
    },
  ])

  return <RouterProvider router={router}/>
}

export default App
