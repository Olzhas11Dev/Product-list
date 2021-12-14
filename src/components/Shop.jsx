import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
import { fetchBasketData, addToBasket, removeItemAction } from '../actions/basketActions';

function Shop() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.listProducts);
  const basketProducts = useSelector((state) => state.basketData.basket);
  const basketTotal = useSelector((state) => state.basketData.total);

  React.useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchBasketData());
  }, [dispatch]);

  // const hanleRenove = async (elem) => {
  //   await Axios.delete(`https://61a71b7b8395690017be94e1.mockapi.io/basketData/${elem.id}`);
  // };

  return (
    <div className="container">
      <div className=" d-flex justify-content-between mt-3  ">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h5 className="text-dark">Main Page</h5>
        </Link>
        <Link to="/addItems" style={{ textDecoration: 'none' }}>
          <h5 className="text-dark">Add Items</h5>
        </Link>
      </div>

      <div className="row">
        <div className="col-lg-9 order-1 order-lg-0 order-md-1 ">
          <div className="row">
            <h5 className="mt-4 mb-4">Total: $ {basketTotal.toFixed(2)}</h5>
            <h5 className="mt-4 mb-4">Total:</h5>

            {allProducts.map((e) => {
              return (
                <div
                  onClick={() => dispatch(addToBasket(e, basketProducts))}
                  style={{ cursor: 'pointer' }}
                  className="card item col-lg-3 col-md-4 col-sm-6 col-6 "
                  key={e.id}>
                  <img className="img-fluid max-width: 100% height: auto" src={e.img} alt="" />
                  <div>{e.title}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-lg-3 order-lg-1 order-md-0 order-0 ">
          <h5 className="mt-4 mb-4">Basket</h5>

          {basketProducts.map((item) => {
            return (
              <div
                key={item.id}
                className=" border bg-secondary d-flex align-items-center justify-content-between  mb-2 p-2 text-white rounded ">
                <div className="d-flex" style={{ fontSize: '12px' }}>
                  <div style={{ width: '125px' }}>
                    {item.title} {item.quantity}
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    | {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeItemAction(item))}
                  className="btn btn-secondary">
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Shop;

export const getTotal = (data) => {
  console.log(data);
  let sum = 0;
  data?.map((el) => {
    sum += el.price * el.quantity;
  });
  return sum;
};
