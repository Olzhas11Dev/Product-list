import React from 'react';
import Axios from 'axios';

function Shop() {
  const [data, setData] = React.useState([]);
  const [basketData, setBasketData] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    Axios.get('https://61a71b7b8395690017be94e1.mockapi.io/products').then((res) => {
      setData(res.data);
    });
    getDataBasket();
  }, []);

  const getDataBasket = async () => {
    const response = await Axios.get('https://61a71b7b8395690017be94e1.mockapi.io/basketData');
    setBasketData(response.data);
    setTotal(getTotal(response.data));
  };

  const getTotal = (data) => {
    let sum = 0;
    data?.map((item) => {
      sum += item.price;
    });
    return sum;
  };

  const addToBasket = async (item) => {
    await Axios.post('https://61a71b7b8395690017be94e1.mockapi.io/basketData', item);
    getDataBasket();
    setTotal(getTotal(basketData));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <div className="row">
            <h5 className="mt-4 mb-4">{total.toFixed(2)}</h5>

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
        <div className="col-lg-3  ">
          <h5 className="mt-4 mb-4">Basket</h5>

          {basketData.map((item) => {
            return (
              <div
                key={item.id}
                className=" border bg-secondary d-flex justify-content-between mb-2 p-2 text-white">
                <div>{item.title}</div>
                <div>{item.price}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Shop;
