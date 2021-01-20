import React, { Component } from "react";
import { Container, TextField, Button } from "@material-ui/core";
import axios from "../../axios-constain";
import { Redirect } from "react-router-dom";


class EditProducer extends Component {
  
  state = {
    name: "",
    website: "",
    type: "",
  };

  changeInputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    const { id_producer } = this.props.match.params;

    axios
      .get(`/detail-producer/${id_producer}`)
      .then((res) => {
        this.setState({ ...res.data.producer });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  editProducerHandler = () => {
    const dataProducer = {
      name: this.state.name,
      website: this.state.website,
      introduce: this.state.introduce,
    };
    const { id_producer } = this.props.match.params;


    axios
      .put("/edit-producer/" + id_producer, dataProducer)
      .then((res) => {
        console.log(res.data);
        this.setState({ isDone: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (this.state.isDone) {
        return <Redirect to="/all-producer" />;
      }
    return (
      <Container className="form-edit-film" spacing={1}
      style={{ justifyContent: "space-evenly", margin: "24px 0px 0px 100px" }}>
        <TextField
          
          id="name"
          name="name"
          label="Tên nhà sản xuất"
          variant="outlined"
          value={this.state.name}
          onChange={this.changeInputHandler}
        />
        <TextField
          
          id="website"
          name="website"
          label="Website nhà sản xuất"
          variant="outlined"
          value={this.state.website}
          onChange={this.changeInputHandler}
        />
        <TextField
          
          id="introduce"
          name="introduce"
          multiline
          rows={4}
          label="Introduce"
          variant="outlined"
          value={this.state.introduce}
          onChange={this.changeInputHandler}
        />

        <div className="add-film-button">
          <Button
            
            variant="contained"
            color="primary"
            onClick={this.editProducerHandler}
          >
            Sửa Nhà Sản Xuất
          </Button>

          <Button variant="contained" color="secondary">
            Hủy bỏ
          </Button>
        </div>
      </Container>
    );
  }
}

export default EditProducer;
