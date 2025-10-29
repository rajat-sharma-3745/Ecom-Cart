import React, { useState } from 'react'
import Header from '../components/Header'
import ProductGrid from '../components/ProductGrid'
import { useOutletContext } from 'react-router-dom'

const Home = () => {
  const {search} = useOutletContext()
  // console
  return (
    <div>
      <ProductGrid search={search}/>
    </div>
  )
}

export default Home