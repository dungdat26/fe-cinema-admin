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

class AddDirector extends Component {
  state = {
    name_director: '',
    gender: '',
    avatar: '',
    director_introduce: '',
  };


  changeInputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = (e) => {
    const directorData = {
      ...this.state,
    };

    console.log(directorData);

    axios
      .post("/add-director", directorData)
      .then((res) => {
        console.log(res.data);

        // đây là component CHA được truyền props từ component ông NỘI và gửi lên BE để add vào db 
        this.props.addDirectorSuccess(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }
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
            <MenuItem value={'0'}>Male</MenuItem>
            <MenuItem value={'1'}>Female</MenuItem>
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
        {this.state.avatar ? (
              <img src={this.state.avatar} alt={this.state.avatar} />
            ) : null}


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
          onClick={this.submitHandler}
        >
          Thêm Đạo Diễn
        </Button>

        <Button
        
          variant="contained"
          color="secondary"
          startIcon={<CloseIcon />}
          style={{ margin: "10px" }}
        >
          Hủy Thêm
        </Button>
      </div>
    );
  }
}

export default AddDirector;
