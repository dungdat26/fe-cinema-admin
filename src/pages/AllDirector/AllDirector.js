import React, { Component } from "react";
import axios from "../../axios-constain";
import ItemDirector from "../../components/ItemDirector/ItemDirector";
import { Grid } from "@material-ui/core";

class AllActor extends Component {
  state = {
    directors: [],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get("/get-directors")
      .then((res) => {
        console.log(res.data);
        this.setState({ directors: res.data.directors }, () => {
          console.log(this.state);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Grid
        container
        spacing={1}
        style={{ justifyContent: "space-evenly", margin: "24px 0px 0px 100px" }} >
           {this.state.directors.map((director) => {
          return (
            <Grid
              key={director.name_director}
              container
              item
              xs={12}
              md={6}
              lg={3}
              spacing={3}
            >
              <ItemDirector
                name_director={director.name_director}
                avatar={director.avatar}
                
                director_introduce={director.director_introduce}
                id_director={director._id}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default AllActor;
