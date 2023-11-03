import React, { useEffect, useState } from "react";
import ProductContext from "./ProductContext";

const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([])
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
          .then(res => res.json())
          .then(json => {
            setCategory(
                json
                  .map(product => product.category)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map(category => ({ value: category, checked: false }))
              );              
            setProducts(json);
            setFilterProducts([]);
          });
      }, []);
    return (
        <ProductContext.Provider value={{ products, setProducts, filterProducts, setFilterProducts, category, setCategory }}>
        
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider