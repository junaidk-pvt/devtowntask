import React, { useContext, useEffect, useState } from 'react'
import styles from './Product.module.scss'
import ProductContext from '../context/ProductContext'

const Product = () => {
  const { setProducts, filterProducts, setFilterProducts } = useContext(ProductContext)
  return (
    <div className={styles.productContainer}>
      {filterProducts?.map((product) => {

        return (
          <div className={styles.cardBox}>
            <img src={product?.image} alt="Prodcuts" />
            <div className={styles.title}>
              <p className={styles.price}> {product?.price} INR  </p>
              <hr></hr>
              <p className={styles.description}> {product?.title} </p>
            </div>
            {/* <p className={styles.description}>Description: {product?.description} </p> */}
          </div>
        )
      })}
    </div>

  )
}

export default Product