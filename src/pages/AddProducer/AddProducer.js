import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { TextField, Button } from "@material-ui/core";

import axios from "../../axios-constain";

class AddProducer extends Component {
  state = {
    name: "",
    website: "",
    introduce: "",
    isDone: false,
  };

  changeInputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClose = () => {
    
    this.setState ({ isDone: false });
  };
  submitHandler = (e) => {
    const producerData = {
      ...this.state,
    };

    console.log(producerData);

    axios
      .post("/add-producer", producerData)
      .then((res) => {
        console.log(res.data);
        this.setState({ isDone: true });
        // đây là component CHA được truyền props từ component ông NỘI và gửi lên BE để add vào db
        this.props.addProducerSuccess(res.data);
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
          name="name"
          id=""
          label="Tên nhà sản xuất"
          variant="outlined"
          value={this.state.name}
          onChange={this.changeInputHandler}
        ></TextField>

        <TextField
          style={{ width: "100%", margin: "5px" }}
          name="website"
          id=""
          label="website"
          variant="outlined"
          value={this.state.website}
          onChange={this.changeInputHandler}
        ></TextField>

        <TextField
          style={{ width: "100%", margin: "5px" }}
          name="introduce"
          id=""
          multiline
          rows={4}
          label="Giới thiệu"
          variant="outlined"
          value={this.state.introduce}
          onChange={this.changeInputHandler}
        ></TextField>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          style={{ background: "yellowgreen", margin: "10px" }}
          onClick={this.submitHandler}
        >
          Thêm Nhà Sản xuất
        </Button>

        <Button 
       
          variant="contained"
          color="secondary"
          onClick = {this.handleClose}
          startIcon={<CloseIcon />}
          style={{ margin: "10px" }}
        >
          Hủy Thêm
        </Button>
      </div>
    );
  }
}

export default AddProducer;
