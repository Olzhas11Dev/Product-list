import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <div className="containerd-flex justify-content-center " style={{ marginTop: '10rem' }}>
        <div className="row d-flex justify-content-center">
          <Link className=" col-lg-3  col-md-4 col-sm-6 col-5 " to="/shop">
            <img
              className="img-fluid  max-width: 100% height: auto "
              src="img/food.png"
              style={{ cursor: 'pointer' }}
              alt=""
            />
          </Link>
          <Link className=" col-lg-3  col-md-4 col-sm-6 col-5 " to="/addItems">
            <img
              className="img-fluid max-width: 100% height: auto "
              src="img/shop.png"
              style={{ cursor: 'pointer' }}
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
