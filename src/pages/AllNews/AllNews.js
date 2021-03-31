import React, { Component } from "react";
import axios from "../../axios-constain";
import ItemNews from "../../components/ItemNews/ItemNews";
import { Grid } from "@material-ui/core";

class AllNews extends Component {
  state = {
     news: [],
     
  };


  componentDidMount() {
    axios
      .get("/get-allNews")
      .then((res) => {
        console.log(res.data);
        this.setState({ news: res.data.news }, () => {
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
        {this.state.news.map((newss) => {
          return (
            <Grid
              key={newss.name_news}
              container
              item
              xs={12}
              md={6}
              lg={3}
              spacing={3}
            >
              <ItemNews
                name_news={newss.title}
                urlImg={newss.urlImg}
                urlNewsClip={newss.urlNewsClip}
                source={newss.source}
                id_news={newss._id}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default AllNews;
