import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { Redirect } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
} from "@material-ui/core";
import axios from "../../axios-constain";

const gender = [
  {
    value: "0",
    label: "male",
  },
  {
    value: "1",
    label: "female",
  },
];

class AddActors extends Component {
  state = {
    name_actor: "",
    gender: "",
    actor_introduce: "",
    avatar: "",
  };

  changeInputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    const actorData = {
      ...this.state,
    };

    console.log(actorData);

    axios
      .post("/add-actor", actorData)
      .then((res) => {
        console.log(res.data);

        // đây là component CHA được truyền props từ component ông NỘI và gửi lên BE để add vào db 
        this.props.addActorSuccess(res.data);
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
      <Container className="form-add-film">
        <TextField
          style={{ width: "100%", margin: "5px" }}
          name="name_actor"
          id=""
          label="Tên Diễn Viên"
          variant="outlined"
          value={this.state.name_actor}
          onChange={this.changeInputHandler}
        ></TextField>

        {/* <TextField
          style={{ width: "100%", margin: "5px" }}
          name="gender"
          id=""
          label=""
          variant="outlined"
        ></TextField> */}
        <TextField
          name="gender"
          id="gender"
          select
          label="giới tính"
          value={this.state.gender}
          onChange={this.changeInputHandler}
          variant="outlined"
        >
          {gender.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <TextField
          style={{ width: "100%", margin: "5px" }}
          id=""
          name="avatar"
          label="Avatar"
          variant="outlined"
          value={this.state.avatar}
          onChange={this.changeInputHandler}
        />
        {this.state.avatar ? (
          <img src={this.state.avatar} alt={this.state.avatar} />
        ) : null}

        <TextField
          style={{ width: "100%", margin: "5px" }}
          name="actor_introduce"
          id=""
          multiline
          rows={4}
          label="Giới Thiệu"
          variant="outlined"
          value={this.state.actor_introduce}
          onChange={this.changeInputHandler}
        ></TextField>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          style={{ background: "yellowgreen", margin: "10px" }}
          onClick={this.submitHandler}
        >
          Thêm Diễn Viên
        </Button>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<CloseIcon />}
          style={{ margin: "10px" }}
        >
          Hủy Thêm
        </Button>
      </Container>
    );
  }
}

export default AddActors;
