import './App.css';
import { Navbar } from './components/navbar/navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {Shop}  from './pages/Shop';
import {ShopCategory}  from './pages/ShopCategory';
import {Product}  from './pages/Product';
import {LoginSignUp}  from './pages/LoginSignUp';
import {Cart}  from './pages/Cart';
import { Footer } from './components/Footer/Footer';
import men_banner from '../src/components/assets/banner_mens.png'
import women_banner from '../src/components/assets/banner_women.png'
import kid_banner from '../src/components/assets/banner_kids.png'

function App() {
  return (
    <div>
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/men" element={<ShopCategory banner={men_banner} category="men"/>} />
      <Route path="/women" element={<ShopCategory  banner={women_banner} category="women" />} />
      <Route path="/kid" element={<ShopCategory  banner={kid_banner} category="kid"/>} />

{/*close the product id inside product as it is a sub path also this helps to create a no param link to product as well*/}
      <Route path="/Product" element={<Product />}>
      <Route path=":ProductId" element={<Product />}/>
      </Route>  

      <Route path="/Login" element={<LoginSignUp />} />
      <Route path="/Cart" element={<Cart />} />
      </Routes>

      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
