import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddItems from './components/AddItems';
import Home from './components/Home';
import Shop from './components/Shop';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/addItems" element={<AddItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
