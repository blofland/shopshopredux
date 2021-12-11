import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import Cart from "../components/Cart";
import { useDispatch, useSelector } from "react-redux";
// import { useStoreContext } from "../utils/GlobalState";
// import {
//   REMOVE_FROM_CART,
//   UPDATE_CART_QUANTITY,
//   ADD_TO_CART,
//   UPDATE_PRODUCTS,
// } from "../utils/actions";
import { REMOVE_FROM_CART, ADD_TO_CART, UPDATE_CART_QUANTITY } from "../store/ui/ui";
import { UPDATE_PRODUCTS } from "../store/entities/product";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from '../assets/spinner.gif'

function Detail() {
  const dispatch = useDispatch()
  const products = useSelector(s => s.entities.products)
  const cart = useSelector(s => s.ui.cart)
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);


  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    } 
    else if (data) {
      dispatch(UPDATE_PRODUCTS(data.products))

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch(UPDATE_PRODUCTS(indexedProducts))
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)
    if (itemInCart) {
      dispatch(UPDATE_CART_QUANTITY({
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      }))

      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch(ADD_TO_CART)
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });

    }
  }

  const removeFromCart = () => {
    dispatch(REMOVE_FROM_CART({
      _id: currentProduct._id
    }))
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button onClick={addToCart}>
              Add to Cart
            </button>
            <button 
              disabled={!cart.find(p => p._id === currentProduct._id)} 
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
      <Cart />
    </>
  );
};

export default Detail;
