import React, { Component } from "react";
import axios from "../../axios-constain";
import ItemProducer from "../../components/ItemProducer/ItemProducer";
import { Grid } from "@material-ui/core";

class AllProducer extends Component {
  state = {
    producers: [],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get("/get-producers")
      .then((res) => {
        // console.log(res.data);
        this.setState({ producers: res.data.producers }, () => {
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
           {this.state.producers.map((producer) => {
          return (
            <Grid
              key={producer.name}
              container
              item
              xs={12}
              md={6}
              lg={3}
              spacing={3}
            >
              <ItemProducer
                name={producer.name}
                website={producer.website}
                introduce={producer.introduce}
                id_producer={producer._id}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default AllProducer;
