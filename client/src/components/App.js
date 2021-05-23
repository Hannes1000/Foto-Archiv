import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import "./App.css"
// pages for this product
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import LandingPage from './views/LandingPage/LandingPage';
import FotoAddingPage from './views/FotoAddingPage/FotoAddingPage';
import DropAndDragTags from './views/DropAndDragTags/DropAndDragTags';
import ViewingPage from './views/ViewingPage/ViewingPage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div id="body-background">
        <Switch>
          <Route exact path="/landingPage" component={Auth(LandingPage, true)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/fotos/add" component={Auth(FotoAddingPage, true)} />
          <Route exact path="/fotos/view" component={Auth(ViewingPage, true)} />
          <Route exact path="/test" component={Auth(DropAndDragTags, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
