import Navbar from './components/Navbar';
import { Route, Switch, withRouter } from 'react-router-dom';
import Categories from './components/Categories';
import ProductPage from './components/ProductPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/:category/:productName" component={ProductPage} />
        <Route path="/:category" children={Categories} />
        <Route exact path="/" children={Categories} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
