import Navbar from './components/Navbar';
import { Route, Switch, withRouter } from 'react-router-dom';
import Categories from './components/Categories';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/women" component={Categories} />
        <Route path="/men" component={Categories} />
        <Route path="/kids" component={Categories} />
        <Route exact path="/" component={Categories} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
