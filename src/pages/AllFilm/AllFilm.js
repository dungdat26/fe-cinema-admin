import React, { Component } from "react";
import { Grid } from "@material-ui/core";

import axios from "../../axios-constain";
import ItemFilm from "../../components/ItemFilm/ItemFilm";

class AllFilm extends Component {
  state = {
    films: [],
    producers: [],
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get("/")
      .then((res) => {
        console.log(res.data);
        this.setState({ films: res.data.films }, () => {});
      })

      .catch((err) => {
        console.log(err);
      });


 
  };

  render() {
    return (
      <Grid
        container
        spacing={1}
        style={{ justifyContent: "space-evenly", margin: "24px 0px 0px 100px" }}
      >
        {this.state.films.map((film) => {
          return (
            <Grid
              key={film.EN_name}
              container
              item
              xs={12}
              md={6}
              lg={3}
              spacing={3}
            >
              <ItemFilm
                EN_name={film.EN_name}
                VN_name={film.VN_name}
                urlImg={film.urlImg}
                id_phim={film._id}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default AllFilm;
