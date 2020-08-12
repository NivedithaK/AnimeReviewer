import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import AnimeList from "./components/anime-list.component";
import EditAnime from "./components/edit-anime.component";
import CreateAnime from "./components/create-anime.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={AnimeList} />
      <Route path="/edit/:id" exact component={EditAnime} />
      <Route path="/create" exact component={CreateAnime} />
      <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
