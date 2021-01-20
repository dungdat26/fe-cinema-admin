import React, { Component } from "react";
import { Container, TextField, Button } from "@material-ui/core";
import axios from "../../axios-constain";
import { Redirect } from "react-router-dom";

class EditActor extends Component {
  state = {
    name_actor: "",
    gender: [],
    renderGender: [
      {
        value: "0",
        label: "Male",
      },
      {
        value: "1",
        label: "Female",
      },
    ],
    avatar: "",
    actor_introduce: "",
  };

  changeInputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    const { id_actor } = this.props.match.params;
    console.log(id_actor);

    axios
      .get(`/detail-actor/${id_actor}`)
      .then((res) => {
        this.setState({ ...res.data.actor });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editActorHandler = () => {
    const dataActor = {
      name_actor: this.state.name_actor,
      gender: this.state.gender,
      avatar: this.state.avatar,
      actor_introduce: this.state.actor_introduce,
    };
    const { id_actor } = this.props.match.params;

    axios
      .put("/edit-actor/" + id_actor, dataActor)

      .then((res) => {
        console.log("/edit-actor/ " + id_actor);
        console.log(res.data.body);
        this.setState({ isDone: true });
        console.log("receive");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (this.state.isDone) {
      return <Redirect to="/all-actors" />;
    }
    return (
      <Container
        className="form-edit-film"
        spacing={1}
        style={{ justifyContent: "space-evenly", margin: "24px 0px 0px 100px" }}
      >
        <TextField
          id="name_actor"
          name="name_actor"
          label="Tên diễn viên"
          variant="outlined"
          value={this.state.name_actor}
          onChange={this.changeInputHandler}
        />

        <TextField
          name="gender"
          id="gender"
          select
          label="gender"
          value={this.state.gender}
          onChange={this.changeInputHandler}
          variant="outlined"
        >
          {this.state.renderGender.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="avatar"
          name="avatar"
          label="ảnh diễn viên"
          variant="outlined"
          value={this.state.avatar}
          onChange={this.changeInputHandler}
        />

        <TextField
          id="actor_introduce"
          name="actor_introduce"
          multiline
          rows={4}
          label="actor_introduce"
          variant="outlined"
          value={this.state.actor_introduce}
          onChange={this.changeInputHandler}
        />

        <div className="add-film-button">
          <Button
            variant="contained"
            color="primary"
            onClick={this.editActorHandler}
          >
            Sửa diễn viên
          </Button>

          <Button variant="contained" color="secondary">
            Hủy bỏ
          </Button>
        </div>
      </Container>
    );
  }
}

export default EditActor;
