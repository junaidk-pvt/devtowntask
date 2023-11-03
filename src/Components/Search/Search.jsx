// import classNames from 'classnames'
import React, { useContext, useEffect, useState } from 'react'

import styles from './search.module.scss'
import searchIcon from '../../assets/search.png'
import filterIcon from '../../assets/filter.png'
import ProductContext from '../../context/ProductContext'

const Search = () => {
  const [search, setSearch] = useState("")
  const { products, filterProducts, setFilterProducts, category, setCategory } = useContext(ProductContext)
  // const [filterCategory, setFilterCategory] = useState(category)
  const [filterPrice, setFilterPrice] = useState(0)
  const [openFilter, setOpenFilter] = useState(false)
  const [priceFilterOptions, setPriceFilterOptions] = useState([{
    label: "Sort by Low to High",
    value: 1,
    checked: false
  }, {
    label: "Sort by High to Low",
    value: 2,
    checked: false
  }, {
    label: "Reset",
    value: 3,
    checked: false
  }
  ])

  const handleFilter = (e) => {
    e.stopPropagation()
    setOpenFilter(!openFilter)
  }
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const manageFilter = (price, categories) => {
    console.log('price', price)
    console.log('category', categories)
    let sortedProducts;
    if (price === 1) {
      sortedProducts = [...products].sort((a, b) => a.price - b.price);
    } else if (price === 2) {
      sortedProducts = [...products].sort((a, b) => b.price - a.price);
    } else {
      sortedProducts = [...products];
    }
    let filteredProducts = sortedProducts;
    if (categories?.length > 0  ) {
      filteredProducts = sortedProducts
      .filter(product => categories.includes(product.category))
        .filter(product => categories.includes(product.category));
        console.log('filteredProducts', filteredProducts)
    }
    setFilterProducts(filteredProducts);
  }

  const onFilterPrice = (e, op) => {
    const updatedOptions = priceFilterOptions.map((option) => {
      if (option.value === op) {
        return { ...option, checked: e.target.checked };
      }
      return { ...option, checked: false };
    });
    console.log('updatedOptions', updatedOptions)
    setPriceFilterOptions(updatedOptions);
    setFilterPrice(op)
    const updatedCategory = category.filter((option) => option.checked).map((option) => option.value);
    manageFilter(op, updatedCategory)
  }

  const onFilterCategory = (e, op) => {
    const updatedOptions = category.map((option) => {
      if (option.value === op?.value) {
        return { ...option, checked: e.target.checked };
      }
      return option;
    });
    setCategory(updatedOptions)        
    const updatedCategory = updatedOptions.filter((option) => option.checked).map((option) => option.value);
    manageFilter(filterPrice, updatedCategory)
  }
  // Bruteforce  (Above I have optimizsed the code)

  // const onFilterPrice = (e, op) => {
  //   const updatedOptions = priceFilterOptions.map((option) => {
  //     return { ...option, checked: option.value === op && e.target.checked };
  //   });
  //   setPriceFilterOptions(updatedOptions);
  //   let sortedProducts;
  //   if (op === 1) {
  //     sortedProducts = [...products].sort((a, b) => a.price - b.price);
  //   } else if (op === 2) {
  //     sortedProducts = [...products].sort((a, b) => b.price - a.price);
  //   } else {
  //     sortedProducts = [...products];
  //   }
  //   let filteredProducts = sortedProducts;
  //   if (filterCategory?.length > 0) {
  //     filteredProducts = sortedProducts.filter(product => filterCategory.includes(product.category));
  //   }
  //   setFilterProducts(filteredProducts);
  // };

  // const onFilterCategory = (e, op) => {
  //   let updatedFilterCategory;
  //   if (e.target.checked) {
  //     updatedFilterCategory = [...filterCategory, op];
  //   } else {
  //     updatedFilterCategory = filterCategory.filter(category => category !== op);
  //   }
  //   setFilterCategory(updatedFilterCategory);
  //   let filteredProducts = products;
  //   if (updatedFilterCategory.length > 0) {
  //     filteredProducts = products.filter(product => updatedFilterCategory.includes(product.category));
  //   }
  //   setFilterProducts(filteredProducts);
  // };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpenFilter(false);
    });
    return () => {
      document.body.removeEventListener("click", () => {
        setOpenFilter(false);
      });
    };
  }, []);

  useEffect(() => {
    const x = setTimeout(() => {
      search && setFilterProducts(products?.filter(product => {
        return product?.title?.toLowerCase().includes(search.toLowerCase())
      }))
      !search && setFilterProducts(products)
    }, 500);
    return () => {
      clearTimeout(x);
    };

  }, [search, products])

  return (
    <>
      <div className={styles.container}>
        <img
          className={styles.filterIcon}
          src={filterIcon}
          alt='filter Icon'
          onClick={handleFilter}
        />
        {openFilter &&
          <div className={styles.filter} onClick={(e) => { e.stopPropagation(); }}>
            <p className={styles.filterTitle}> Filter by Price</p>
            {priceFilterOptions.map((options) => {
              return (
                <label className={styles?.option}>
                  <input
                    containerclassname={styles?.checkbox}
                    id=""
                    type="radio"
                    name="filterPrice"
                    checked={options?.checked}
                    className={styles.memberCheckBox}
                    onChange={(e) => onFilterPrice(e, options?.value)}
                  />
                  <p className={styles?.memberName}>{options?.label}</p>
                </label>
              )
            })}
            <p className={styles.filterTitle}> Filter by Category</p>
            {category?.map((option) => {
              return (
                <label className={styles?.option}>
                  <input
                    containerclassname={styles?.checkbox}
                    id=""
                    type="checkbox"
                    name="filterCategory"
                    checked={option?.checked}
                    className={styles.memberCheckBox}
                    onChange={(e) => onFilterCategory(e, option)}
                  />
                  <p className={styles?.memberName}>{option?.value}</p>
                </label>
              )
            })}
            <button onClick={()=>{setOpenFilter(false)}}> Close </button>
          </div>
        }
        <img className={styles.searchIcon} src={searchIcon} alt='search Icon' />
        <input
          className={`${styles.inputField} ${styles.searchInput}`}
          type="search"
          placeholder='Search by Product Name'
          onChange={(e) => { handleSearch(e) }}
        />
      </div>
    </>
  )
}

export default Search
