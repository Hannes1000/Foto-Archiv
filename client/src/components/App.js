import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import "./App.css"
// pages for this product
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import LandingPage from './views/LandingPage/LandingPage';
import FotoAddingPage from './views/FotoAddingPage/FotoAddingPage';
import ViewingPage from './views/ViewingPage/ViewingPage';
import UserManagePage from './views/UserManagePage/UserManagePage';
import FotoEditingPage from './views/FotoEditingPage/FotoEditingPage';
import AdminLandingPage from './views/AdminLandingPage/AdminLandingPage';
import HomePage from './views/HomePage/HomePage';
import AboutPage from './views/AboutPage/AboutPage';
import TestPage from './views/TestPage/TestPage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div id="body-background">
        <Switch>
          <Route exact path="/" component={Auth(HomePage, false)} />
          <Route exact path="/aboutPage" component={Auth(AboutPage, false)} />
          <Route exact path="/landingPage" component={Auth(LandingPage, true)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/fotos/add" component={Auth(FotoAddingPage, true, true)} />
          <Route exact path="/fotos/view/:id" component={Auth(ViewingPage, true)} />
          <Route exact path="/fotos/edit" component={Auth(AdminLandingPage, true, true)} />
          <Route exact path="/fotos/edit/:id" component={Auth(FotoEditingPage, true, true)} />
          <Route exact path="/users/edit" component={Auth(UserManagePage, true, true)} />
          <Route exact path="/test" component={Auth(TestPage, false)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}
export default App;
