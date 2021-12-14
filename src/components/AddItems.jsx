import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddNewProducts } from '../actions/productActions';

function AddItems() {
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [errorEpmty, setErrorEmpty] = React.useState(false);
  const [error, setError] = React.useState(false);

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const addToProduct = () => {
    if (!title || !price) {
      setErrorEmpty(true);
      setError(false);
    } else if (isNaN(price)) {
      setErrorEmpty(false);
      setError(true);
    } else {
      let newProduct = {
        title,
        price: +price,
        img: 'img/products/question-mark.png',
        quantity: 1,
        id: Date.now(),
      };

      // await Axios.post('https://61a71b7b8395690017be94e1.mockapi.io/products', newProduct);
      dispatch(AddNewProducts(newProduct));

      setError(false);
      setErrorEmpty(false);
      navigate('/shop');
    }
    setTitle('');
    setPrice('');
  };
  return (
    <div className="container">
      <div className=" d-flex justify-content-between mt-3  ">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h5 className="text-dark">Main Page</h5>
        </Link>
        <Link to="/shop" style={{ textDecoration: 'none' }}>
          <h5 className="text-dark">Shopping</h5>
        </Link>
      </div>
      <div className="form-group mt-5 ">
        <div>
          <label>Title</label>
          <input
            value={title || ''}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Name of product"
            style={{ border: errorEpmty && '1px solid red' }}
          />
          <div style={{ height: '10px', color: 'red' }}>
            {errorEpmty && 'Please add  this fields '}
          </div>
        </div>
        <div>
          <label className="mt-3">Price</label>
          <input
            value={price || ''}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Price of product"
            style={{ border: errorEpmty && '1px solid red' }}
          />
          <div style={{ height: '10px', color: 'red' }}>
            {errorEpmty && 'Please add  these fields '}
            {error && 'Please a number '}
          </div>
        </div>

        <button onClick={addToProduct} className="btn btn-secondary mt-4">
          Add new product
        </button>
      </div>
    </div>
  );
}

export default AddItems;
