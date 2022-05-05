import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Footer, Home, Lists, Settings, Logout } from "./components/jsx";
import { isLoggedIn } from './actions/login';
import PrivateRoute from './components/jsx/PrivateRoute';
import ListAdder from './components/jsx/listAdder';
import ListsPage from "./components/ListsFolder/ListsPage.jsx";
import ListPage from "./components/ListsFolder/ListPage.jsx"
import DevPage from "./components/jsx/DevPage.jsx"
const App = () => {
  const [LoggedIn, setLoggedIn] = useState(isLoggedIn)

  return (
    <Router>
      <Navigation LoggedInState={LoggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} /> {/*Test */}
        {/* <Route path="/logout" element={<Logout LoggedInState={LoggedIn} setLoggedIn={setLoggedIn}/>} /> */}
        {/* Parent route for url ".../lists" */}
    </Routes>
    <Footer />
  </Router>
  );
};

export default App;
