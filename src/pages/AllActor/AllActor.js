import React, { Component } from "react";
import axios from "../../axios-constain";
import ItemActor from "../../components/ItemActor/ItemActor";
import { Grid } from "@material-ui/core";

class AllActor extends Component {
  state = {
    actors: [],
    gender: [ {
      value: "0",
      label: "Male",
    },
    {
      value: "1",
      label: "Female",
    },
    
    ],
    renderGender:[
      {
        value: "0",
        label: "Male",
      },
      {
        value: "1",
        label: "Female",
      },
    ]
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get("/get-actors")
      .then((res) => {
        console.log(res.data);
        this.setState({ actors: res.data.actors }, () => {
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
        style={{ justifyContent: "space-evenly", margin: "24px 0px 0px 100px" }}
      >
        {this.state.actors.map((actor) => {
          return (
            <Grid
              key={actor.name_actor}
              container
              item
              xs={12}
              md={6}
              lg={3}
              spacing={3}
            >
              <ItemActor
                name_actor={actor.name_actor}
                avatar={actor.avatar}
                actor_introduce={actor.actor_introduce}
                id_actor={actor._id}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default AllActor;
