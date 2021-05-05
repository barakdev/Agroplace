import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import NavBanner from './components/Nav/NavBanner';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ProductForm from './components/product_form/product_form';
import ProductFormCreate from './components/product_form/product_form_create';
import ProductFormQuery from './components/product_form/product_form_query';
import ProductFormUpdate from './components/product_form/product_form_update';
import AllOrders from './components/AllOrders/AllOrders';
import OrderHistory from './components/OrderHistory/OrderHistory';
//import "./App.css";
import Catalog from './components/Catalog/Catalog.jsx';
import Form from './components/formCategories/Form';
import './scss/_App.scss';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';
import Order from './components/Order/Order';
import Signup from './components/Signup/Signup';
import ManageAccount from './components/Admin/ManageAccount';
import AuthRoute from './components/FrontAuth/AuthRoute';
import UserScreen from './components/UserScreen/UserScreen';
import Newsletter from './components/Newsletter/Newsletter';
import Successful from './components/Mercadopago/Successful';
import ResetPassword from './components/Admin/ResetPassword';
import EmailPassword from './components/Admin/EmailPassword';
import SuccessfulPaypal from './components/Paypal/Successful';
import MapContainer from './components/LocationStock/DistributionCenters';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Nav} />
      <Route exact path="/" component={NavBanner} />
      <Route exact path="/" component={Home} />
      <Switch>
        <Route exact path="/product/cart" component={Cart} />
        <Route exact path="/catalog" component={Catalog} />

        {/* <Route exact path="/map" component={MapContainer} /> */}

        <Route exact path="/user/login" component={Signup} />
        <Route exact path="/reset/password/:token" component={ResetPassword} />
        <Route exact path="/forgot/email" component={EmailPassword} />
        <Route exact path="/order/completada" component={Successful} />
        <Route exact path="/:id" component={ProductDetails} />
        <Route exact path="/order/completada" component={Successful} />
        <Route exact path="/order/complete" component={SuccessfulPaypal} />
        <AuthRoute path="/admin" type="admin">
          <Route exact path="/admin/categories" component={Form} />
          <Route exact path="/admin/orders" component={AllOrders} />
          <Route exact path="/admin/product/form" component={ProductForm} />

          <Route
            exact
            path="/admin/product/form/create"
            component={ProductFormCreate}
          />
          <Route
            exact
            path="/admin/product/form/query"
            component={ProductFormQuery}
          />
          <Route
            exact
            path="/admin/product/form/update"
            component={ProductFormUpdate}
          />
        </AuthRoute>
        <AuthRoute path="/user" type="user">
          <Route exact path="/user/orders" component={OrderHistory} />
          <Route exact path="/user/cart/order" component={Order} />
          <Route exact path="/user/info" component={UserScreen} />
          <Route exact path="/user/admin" component={ManageAccount} />
          <Route exact path="/user/newsletter" component={Newsletter} />
        </AuthRoute>
      </Switch>
      <Route path="/" component={Footer} />
    </div>
  );
}

export default App;
