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
import Login_Register from "./pages/Login_Register/Login_Register";
import AddNews from "./pages/AddNews/AddNews";
import AllNews from "./pages/AllNews/AllNews";
import EditNews from "./pages/EditNews/EditNews"

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

    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      axios
        .get("/auto-login", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          this.loginSuccess(res.data.name);
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
            <Route path="/all-news" component={AllNews} />
            <Route
              path="/add-film"
              render={(props) => <AddFilm {...props} user={this.state.user} />}
            />
            <Route
              path="/edit-film/:id_phim"
              render={(props) => <EditFilm {...props} user={this.state.user} />}
            />
            <Route path="/all-producer" component={AllProducer} />
            <Route
              path="/edit-producer/:id_producer"
              render={(props) => (
                <EditProducer {...props} user={this.state.user} />
              )}
            />
            <Route
              path="/add-news"
              render={(props) => <AddNews {...props} user={this.state.user} />}
            />
            <Route path="/all-actors" component={AllActor} />
            <Route
              path="/edit-actor/:id_actor"
              render={(props) => (
                <EditActor {...props} user={this.state.user} />
              )}
            />
            <Route path="/all-directors" component={AllDirector} />
            <Route
              path="/edit-director/:id_director"
              render={(props) => (
                <EditDirector {...props} user={this.state.user} />
              )}
            />
            <Route
              path="/edit-news/:id_news"
              render={(props) => (
                <EditNews {...props} user={this.state.user} />
              )}
            />
          </Switch>
        </Container>
      </div>
    );
  }
}
