import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Shop() {
  const [data, setData] = React.useState([]);
  const [basketData, setBasketData] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  //Render carts
  React.useEffect(async () => {
    const response = await Axios.get('https://61a71b7b8395690017be94e1.mockapi.io/products');
    setData(response.data);

    getBasketProduct();
  }, []);

  const addToBasket = async (product) => {
    let founded = basketData.find((el) => el.title === product.title);
    if (founded) {
      founded.quantity += 1;
      await Axios.put(
        `https://61a71b7b8395690017be94e1.mockapi.io/basketData/${founded.id}`,
        founded,
      );
    } else {
      await Axios.post('https://61a71b7b8395690017be94e1.mockapi.io/basketData', product);
    }
    // await Axios.post('https://61a71b7b8395690017be94e1.mockapi.io/basketData', product);

    getBasketProduct();
  };

  const getBasketProduct = async () => {
    const respose = await Axios.get('https://61a71b7b8395690017be94e1.mockapi.io/basketData');
    setBasketData(respose.data);

    setTotal(getTotal(respose.data));
  };

  const getTotal = (data) => {
    let sum = 0;
    data.map((el) => {
      sum += el.price * el.quantity;
    });
    return sum;
  };

  const hanleRenove = async (elem) => {
    await Axios.delete(`https://61a71b7b8395690017be94e1.mockapi.io/basketData/${elem.id}`);

    getBasketProduct();
  };

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
            <h5 className="mt-4 mb-4">Total: {total.toFixed(2)}</h5>

            {data.map((e) => {
              return (
                <div
                  onClick={() => addToBasket(e)}
                  style={{ cursor: 'pointer' }}
                  className="card item col-lg-3 col-md-4 col-sm-6 col-6 "
                  key={e.id}>
                  <img className="img-fluid max-width: 100% height: auto" src={e.img} alt="" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-lg-3 order-lg-1 order-md-0 order-0 ">
          <h5 className="mt-4 mb-4">Basket</h5>

          {basketData.map((item) => {
            return (
              <div
                key={item.id}
                className=" border bg-secondary d-flex align-items-center justify-content-between  mb-2 p-2 text-white rounded ">
                <div className="d-flex">
                  <div style={{ width: '120px' }}>
                    {item.title} {item.quantity}
                  </div>
                  <div style={{ marginLeft: '20px' }}>| {item.price}</div>
                </div>
                <button onClick={() => hanleRenove(item)} className="btn btn-secondary">
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
