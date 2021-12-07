import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <div className="containerd-flex justify-content-center " style={{ marginTop: '10rem' }}>
        <div className="d-flex justify-content-center ">
          <Link className="w-25 rounded border" to="/shop">
            <img className="img-fluid   " src="img/food.png" style={{ cursor: 'pointer' }} alt="" />
          </Link>
          <Link className="w-25 rounded border" to="/addItems">
            <img className="img-fluid  " src="img/shop.png" style={{ cursor: 'pointer' }} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
