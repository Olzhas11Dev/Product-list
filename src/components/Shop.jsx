import React from 'react';
import Axios from 'axios';

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
    await Axios.post('https://61a71b7b8395690017be94e1.mockapi.io/basketData', product);

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
      sum += el.price;
    });
    return sum;
  };

  const hanleRenove = async (elem) => {
    console.log(elem.id);
    await Axios.delete(`https://61a71b7b8395690017be94e1.mockapi.io/basketData/${elem.id}`);

    getBasketProduct();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9 order-1 order-lg-0 order-md-1 ">
          <div className="row">
            <h5 className="mt-4 mb-4">Total: {total.toFixed(2)}</h5>

            {data.map((e) => {
              return (
                <div
                  onClick={() => addToBasket(e)}
                  style={{ cursor: 'pointer' }}
                  className="card item col-lg-3 col-md-4 col-sm-6 col-6"
                  key={e.id}>
                  <img src={e.img} alt="" />
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
                className=" border bg-secondary d-flex align-items-center justify-content-between  mb-2 p-2 text-white">
                <div className="d-flex">
                  <div style={{ width: '120px' }}>{item.title}</div>
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
