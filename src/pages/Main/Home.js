import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toggle, toggleBrands } from "../../features/filter/filteSlice";
import { getProducts } from "../../features/products/productsSlice";

const Home = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const { products, isLoading } = useSelector(state => state.products);
  const { brands, stock } = filter;

  useEffect(() => {
    // fetch("products.json")
    //   .then((res) => res.json())
    //   .then((data) => setProducts(data));
    dispatch(getProducts());
  }, []);

  const activeClass = "text-white  bg-indigo-500 border-white";

  let content;
  if(isLoading){
    content = <h1>Loading...</h1>
  }
  if (products.length) {
    content = products.map(product => <ProductCard key={product.model} product={product}></ProductCard>)
  }

  if (products.length && (filter.stock || filter.brands.length)) {
    content = products
      .filter((product) => {
        if (stock) {
          return product.status === true;
        }
        return product;
      })
      .filter((product) => {
        if (filter.brands.length) {
          return filter.brands.includes(product.brand);
        }
        return product;
      })
      .map((product) => <ProductCard key={product.model} product={product} />);
  }

  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button
          onClick={() => dispatch(toggle())}
          className={`border px-3 py-2 rounded-full font-semibold ${stock ? activeClass : null
            } `}
        >
          In Stock
        </button>
        <button
          onClick={() => dispatch(toggleBrands("amd"))}
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("amd") ? activeClass : null
            }`}>
          AMD
        </button>
        <button
          onClick={() => dispatch(toggleBrands("intel"))}
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("intel") ? activeClass : null
            }`}>
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
        {content}
      </div>
    </div>
  );
};

export default Home;
