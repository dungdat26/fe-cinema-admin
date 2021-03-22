import { Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import { Container } from "@material-ui/core";
import axios from "./axios-constain";
import "./App.scss";
import Appbar from "./components/Appbar/Appbar";
import AllFilm from "./pages/AllFilm/AllFilm";
import AddFilm from "./pages/AddFilm/AddFilm";
import EditFilm from "./pages/EditFilm/EditFilm";
import AddProducer from "./pages/AddProducer/AddProducer";
import AllProducer from "./pages/AllProducer/AllProducer";
import EditProducer from "./pages/EditProducer/EditProducer";
import AllActor from "./pages/AllActor/AllActor";
import EditActor from "./pages/EditActor/EditActor";
import AllDirector from "./pages/AllDirector/AllDirector";
import EditDirector from "./pages/EditDirector/EditDirector";

export default class App extends Component {
  state = {
    user: "",
  };
  loginSuccess = (user) => {
    console.log(user);
    this.setState({ user: user });
  };
  logout = () => {
    localStorage.removeItem("token");
    this.setState({ user: "" });
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);

    const cart_str = JSON.parse(localStorage.getItem("gio_hang")) || [];
    this.setState({ cart: cart_str });

    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("/auto-login", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          // console.log(res.data.balance)
          this.loginSuccess(res.data.name, res.data.balance);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  render() {
    return (
      <div className="App" style={{ minHeight: "200vh" }}>
        <Appbar
          loginSuccess={this.loginSuccess}
          user={this.state.user}
          logout={this.logout}
        />

        <Container>
          <Switch>
            <Route path="/all-film" component={AllFilm} />
            <Route path="/add-film" component={AddFilm} />
            <Route path="/edit-film/:id_phim" component={EditFilm} />
            <Route path="/add-producer" component={AddProducer} />
            <Route path="/all-producer" component={AllProducer} />
            <Route
              path="/edit-producer/:id_producer"
              component={EditProducer}
            />
            <Route path="/all-actors" component={AllActor} />
            <Route path="/edit-actor/:id_actor" component={EditActor} />
            <Route path="/all-directors" component={AllDirector} />
            <Route
              path="/edit-director/:id_director"
              component={EditDirector}
            />
          </Switch>
        </Container>
      </div>
    );
  }
}
