import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";

import axios from "../../axios-constain";

class EditDirector extends Component {
  state = {
    name_director: "",
    gender: "",
    avatar: "",
    director_introduce: "",
  };

  changeInputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    const { id_director } = this.props.match.params;

    axios
      .get(`/detail-director/${id_director}`)
      .then((res) => {
        this.setState({ ...res.data.director });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editDirectorHandler = () => {
    const dataDirector = {
    name_director: this.state.name_director,
      gender: this.state.gender,
      avatar: this.state.avatar,
      director_introduce: this.state.director_introduce,
    };

    const { id_director } = this.props.match.params;

    console.log(id_director);

    axios
    .put("/edit-director/" + id_director , dataDirector)
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
        return <Redirect to="/all-directors" />;
      }
    return (
      <div>
        <TextField
          style={{ width: "100%", margin: "5px" }}
          name="name_director"
          id=""
          label="Tên Đạo Diễn"
          variant="outlined"
          value={this.state.name_director}
          onChange={this.changeInputHandler}
        ></TextField>

        <FormControl style={{ width: "100%", margin: "5px" }}>
          <InputLabel id="demo-simple-select-label">Giới Tính</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="outlined"
            name="gender"
            value={this.state.gender}
            onChange={(event) => {
              // console.log(event.target.value);
              this.setState({
                gender: event.target.value,
              });
            }}
          >
            <MenuItem value={"0"}>Male</MenuItem>
            <MenuItem value={"1"}>Female</MenuItem>
          </Select>
        </FormControl>

        <TextField
          style={{ width: "100%", margin: "5px" }}
          id=""
          name="avatar"
          label="Avatar"
          variant="outlined"
          value={this.state.avatar}
          onChange={this.changeInputHandler}
        />

        <TextField
          style={{ width: "100%", margin: "5px" }}
          name="director_introduce"
          id=""
          multiline
          rows={4}
          label="Tiểu Sử"
          variant="outlined"
          value={this.state.director_introduce}
          onChange={this.changeInputHandler}
        ></TextField>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          style={{ background: "yellowgreen", margin: "10px" }}
          onClick={this.editDirectorHandler}
        >
          Update thông tin đạo diễn
        </Button>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<CloseIcon />}
          style={{ margin: "10px" }}
        >
          Hủy Update
        </Button>
      </div>
    );
  }
}

export default EditDirector;
