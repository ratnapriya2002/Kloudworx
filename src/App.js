import {useState, useEffect} from 'react'
import {BiSearch} from 'react-icons/bi'
import EachProduct from './components/EachProduct'
import './App.css'

const App = () => {
  const [searchProduct, setSearchedProduct] = useState('')
  const [dropDown, setDropDown] = useState('')
  const [skip, setSkip] = useState(0)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${skip}`,
      )
      const data = await response.json()
      console.log(data.products)
      setProducts(data.products)
    }
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${skip}`,
    )
    const data = await response.json()
    // console.log(data.products)
    setProducts(data.products)
  }

  const onChangeProducts = async event => {
    setSearchedProduct(event.target.value)
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchProduct}`,
    )
    const data = await response.json()
    setProducts(data.products)
  }

  const onChangeCategory = async event => {
    await setDropDown(event.target.value)
    const filter = event.target.value
    const response = await fetch(
      `https://dummyjson.com/products/category/${filter}`,
    )
    const data = await response.json()
    // console.log(dropDown, data.products)
    await setProducts(data.products)
    // console.log(dropDown)
  }

  const displayNextProducts = () => {
    setSkip(skip + 10)
    getProducts()
  }

  const displayPrevProducts = () => {
    if (skip > 0) {
      setSkip(skip - 10)
    }
    getProducts()
    // console.log(skip)
  }

  const resetCategory = () => {
    getProducts()
  }

  return (
    <div>
      <div className="display-item">
        <div>
          <select
            className="search"
            onChange={onChangeCategory}
            value={dropDown}
          >
            <option value="" disabled>
              select category
            </option>
            <option value="smartphones" selected>
              smartphones
            </option>
            <option value="skincare">skincare</option>
            <option value="groceries">groceries</option>
            <option value="home-decoration">home decoration</option>
            <option value="laptops">laptops</option>
          </select>
          <button type="button" className="button" onClick={resetCategory}>
            Reset
          </button>
        </div>
        <div className="display">
          <p className="search">
            <BiSearch />
          </p>
          {'  '}
          <input
            type="search"
            className="search"
            onChange={onChangeProducts}
            placeholder="search products..."
          />
        </div>
      </div>
      <table className="table table-container">
        <thead>
          <tr>
            <th className="table-heading">Image</th>
            <th className="table-heading">Name</th>
            <th className="table-heading">Stock</th>
            <th className="table-heading">Price</th>
            <th className="table-heading">cart</th>
          </tr>
        </thead>
        <tbody className="table-bottom-container table-container">
          {products.map(item => (
            <EachProduct ItemDetails={item} key={item.id} />
          ))}
        </tbody>
      </table>
      <div className="display-item">
        <button type="button" className="button" onClick={displayPrevProducts}>
          Prev
        </button>
        <button type="button" className="button" onClick={displayNextProducts}>
          Next
        </button>
      </div>
    </div>
  )
}

export default App