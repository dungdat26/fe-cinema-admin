import { Switch, Route } from "react-router-dom";

import { Container } from "@material-ui/core";

import "./App.scss";
import Appbar from "./components/Appbar/Appbar";
import AllFilm from "./pages/AllFilm/AllFilm";
import AddFilm from "./pages/AddFilm/AddFilm";
import EditFilm from "./pages/EditFilm/EditFilm";
import AddProducer from "./pages/AddProducer/AddProducer";
import TabsAdd from './components/TabsAdd/TabsAdd';
import AllProducer from "./pages/AllProducer/AllProducer";
import EditProducer from './pages/EditProducer/EditProducer';
import AllActor from "./pages/AllActor/AllActor";
import EditActor from "./pages/EditActor/EditActor";
import AllDirector from "./pages/AllDirector/AllDirector";
import EditDirector from "./pages/EditDirector/EditDirector";
function App() {
  return (
    <div style={{ minHeight: "200vh" }}>
      <Appbar />

      <Container>
        <Switch>
          <Route path="/all-film" component={AllFilm} />
          <Route path="/add-film" component={AddFilm} />
          <Route path="/edit-film/:id_phim" component={EditFilm} />
          <Route path="/add-producer" component={AddProducer} />
          <Route path="/all-producer" component={AllProducer} />
          <Route path="/edit-producer/:id_producer" component={EditProducer} />
          <Route path="/all-actors" component={AllActor} />
          <Route path="/edit-actor/:id_actor" component={EditActor} />
          <Route path="/all-directors" component={AllDirector} />
          <Route path="/edit-director/:id_director" component={EditDirector} />
        </Switch>
      </Container>

      
    </div>
  );
}

export default App;
