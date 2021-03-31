import { Container, TextField, Button } from "@material-ui/core";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import axios from "../../axios-constain";
class AddNews extends Component {
  state = {
    urlImg: "",
    urlImg2: "",
    urlImg3: "",
    urlNewsClip: "",
    title: "",
    source: "",
    content: "",
    content2: "",
    content3: "",
    content4: "",
    content5: "",
    brief: "",
  };
  changeInputHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // console.log(event.target.value);
  };
  submitHandler = () => {
    const newsdata = { ...this.state };
    console.log(newsdata);
    axios
      .post("/post-news", newsdata)
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
      return <Redirect to="/all-news" />;
    }
    return (
      <Container>
        <h2>Thêm tin tức</h2>

        <TextField
          style={{ width: "100%", marginTop: "30px" }}
          id="urlNewsClip"
          name="urlNewsClip"
          label="link clip tin tức"
          variant="outlined"
          value={this.state.urlNewsClip}
          onChange={this.changeInputHandler}
        />

        {this.state.urlNewsClip ? (
          <iframe
            src={this.state.urlNewsClip}
            alt={this.state.urlNewsClip}
            title="halo"
          />
        ) : null}

        <TextField
          style={{ width: "100%", marginTop: "30px" }}
          id="title"
          name="title"
          label="Tiêu đề "
          variant="outlined"
          value={this.state.title}
          onChange={this.changeInputHandler}
        />
        <TextField
          style={{ width: "100%", marginTop: "30px" }}
          id="source"
          name="source"
          label="Nguồn hoặc tác giả "
          variant="outlined"
          value={this.state.source}
          onChange={this.changeInputHandler}
        />
        <TextField
          style={{ width: "100%", marginTop: "30px" }}
          id="brief"
          name="brief"
          label="Brief "
          variant="outlined"
          value={this.state.brief}
          onChange={this.changeInputHandler}
        />

        <TextField
          style={{ width: "100%", marginTop: "30px" }}
          id="content"
          name="content"
          label="Nội dung tin tức"
          multiline
          rows={8}
          variant="outlined"
          value={this.state.content}
          onChange={this.changeInputHandler}
        />
        <TextField
          style={{ width: "100%", marginTop: "30px" }}
          id="urlImg"
          name="urlImg"
          label="Url Hình ảnh"
          variant="outlined"
          value={this.state.urlImg}
          onChange={this.changeInputHandler}
        />
        {this.state.urlImg ? (
          <img src={this.state.urlImg} alt={this.state.urlImg} />
        ) : null}

        <TextField
          style={{ width: "100%", marginTop: "30px" }}
          id="content2"
          name="content2"
          label="Nội dung tin tức 2"
          multiline
          rows={8}
          variant="outlined"
          value={this.state.content2}
          onChange={this.changeInputHandler}
        />
        <TextField
          style={{ width: "100%", marginTop: "30px" }}
          id="urlImg2"
          name="urlImg2"
          label="Url Hình ảnh 2"
          variant="outlined"
          value={this.state.urlImg2}
          onChange={this.changeInputHandler}
        />
        {this.state.urlImg2 ? (
          <img src={this.state.urlImg2} alt={this.state.urlImg2} />
        ) : null}
        <TextField
          style={{ width: "100%", marginTop: "30px" }}
          id="content3"
          name="content3"
          label="Nội dung tin tức 3"
          multiline
          rows={8}
          variant="outlined"
          value={this.state.content3}
          onChange={this.changeInputHandler}
        />

        <TextField
          style={{ width: "100%", marginTop: "30px" }}
          id="urlImg3"
          name="urlImg3"
          label="Url Hình ảnh 3"
          variant="outlined"
          value={this.state.urlImg3}
          onChange={this.changeInputHandler}
        />
        {this.state.urlImg ? (
          <img src={this.state.urlImg3} alt={this.state.urlImg3} />
        ) : null}
        <TextField
          style={{ width: "100%", marginTop: "30px" }}
          id="content4"
          name="content4"
          label="Nội dung tin tức 4"
          multiline
          rows={8}
          variant="outlined"
          value={this.state.content4}
          onChange={this.changeInputHandler}
        />
        <TextField
          style={{ width: "100%", marginTop: "30px" }}
          id="content5"
          name="content5"
          label="Nội dung tin tức 5"
          multiline
          rows={8}
          variant="outlined"
          value={this.state.content5}
          onChange={this.changeInputHandler}
        />

        <div
          className="add-film-button"
          style={{ marginTop: "30px", marginLeft: "500px" }}
        >
          <Button
            variant="contained"
            style={{ background: "yellowgreen" }}
            onClick={this.submitHandler}
            disabled={!this.props.user}
          >
            Thêm Tin Tức
          </Button>
          <Button variant="contained" color="secondary">
            Hủy bỏ
          </Button>
        </div>
      </Container>
    );
  }
}

export default AddNews;
