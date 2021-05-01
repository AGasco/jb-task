import Navbar from './components/Navbar';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Categories from './components/Categories';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/checkout" component={CartPage} />
        <Route path="/:category/:productName" component={ProductPage} />
        <Route path="/:category" children={Categories} />
        <Redirect to="/all" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
