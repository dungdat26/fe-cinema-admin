import React, { Component } from "react";
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Input,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { Redirect } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import axios from "../../axios-constain";

const status = [
  {
    value: "0",
    label: "Ngưng chiếu",
  },
  {
    value: "1",
    label: "Sắp chiếu",
  },

  {
    value: "2",
    label: "Đang chiếu",
  },
];

class EditFilm extends Component {
  state = {
    EN_name: "",
    VN_name: "",
    actors: [],
    content: "",
    country: "",
    date: new Date().toLocaleDateString(),
    directors: [],
    discount: "",
    duration: "0",
    producers: [],
    price: "",
    status: "0",
    types: [],
    urlImg: "",
    urlFilm: "",
    // id_phim: '',
    isDone: false,
    render: {
      actors: [],
      directors: [],
      types: [],
      producers: [],
    },
  };

  componentDidMount() {
    const { id_phim } = this.props.match.params;

    axios
      .get(`/detail-film/${id_phim}`)
      .then((res) => {
        const receiveData = { ...res.data.film };
        receiveData.directors = receiveData.directors.map(
          (director) => director.directorId
        );
        receiveData.actors = receiveData.actors.map((actor) => actor.actorId);
        receiveData.types = receiveData.types.map((type) => type.typeId);
        receiveData.producers = receiveData.producers.map(
          (producer) => producer.producerId
        );

        this.setState({ ...receiveData });
      })
      .catch((err) => {
        console.log(err);
      });

    [
      "/get-directors",
      "/get-producers",
      "/get-the_loai",
      "/get-actors",
    ].forEach((link) => {
      axios
        .get(link)
        .then((res) => {
          const newRender = { ...this.state.render, ...res.data };
          this.setState({ render: newRender });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  changeInputHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  editFilmHandler = () => {
    const dataFilm = {
      EN_name: this.state.EN_name,
      VN_name: this.state.VN_name,
      actors: this.state.actors,
      content: this.state.content,
      country: this.state.country,
      date: this.state.date,
      directors: this.state.directors,
      discount: this.state.discount,
      duration: this.state.duration,
      producers: this.state.producers,
      price: this.state.price,
      status: this.state.status,
      types: this.state.types,
      urlImg: this.state.urlImg,
      urlFilm: this.state.urlFilm,
    };

    console.log(dataFilm);

    const { id_phim } = this.props.match.params;

    axios
      .put("/edit-film/" + id_phim, dataFilm)

      .then((res) => {
        console.log(res.data);
        this.setState({ isDone: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteFilmHandler = () => {
    this.setState({ isDone: true });
  };

  render() {
    if (this.state.isDone) {
      return <Redirect to="/all-film" />;
    }
    return (
      <Container className="form-add-film">
        <h3 style={{ marginTop: "30px" }}>Edit Phim</h3>
        <Row>
          <Col>
            <TextField
              id="urlImg"
              name="urlImg"
              label="Url Hình ảnh"
              variant="outlined"
              value={this.state.urlImg}
              onChange={this.changeInputHandler}
            />

            {this.state.urlImg ? (
              <img
                src={this.state.urlImg}
                alt={this.state.urlImg}
                style={{
                  height: "300px",
                  width: "250px",
                  margin: "50px 100px",
                }}
              />
            ) : null}
            <TextField
              id="urlFilm"
              name="urlFilm"
              label="link phim"
              variant="outlined"
              value={this.state.urlFilm}
              onChange={this.changeInputHandler}
            />

            {this.state.urlFilm ? (
              <iframe
                src={this.state.urlFilm}
                alt={this.state.urlFilm}
                title="halo"
              />
            ) : null}
          </Col>
          <Col>
            <TextField
              id="EN_name"
              name="EN_name"
              label="Tên gốc của phim"
              variant="outlined"
              value={this.state.EN_name}
              onChange={this.changeInputHandler}
            />
            <TextField
              id="VN_name"
              name="VN_name"
              label="Tên dịch của phim"
              variant="outlined"
              value={this.state.VN_name}
              onChange={this.changeInputHandler}
            />

            <TextField
              name="status"
              id="status"
              select
              label="Trạng thái"
              value={this.state.status}
              onChange={this.changeInputHandler}
              variant="outlined"
            >
              {status.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>

            <TextField
              id="duration"
              name="duration"
              label="Thời lượng"
              variant="outlined"
              value={this.state.duration}
              onChange={this.changeInputHandler}
            />

            <FormControl style={{ width: "100%" }} variant="outlined">
              <InputLabel id="demo1">Thể loại</InputLabel>
              <Select
                labelId="demo1"
                id="types"
                name="types"
                multiple
                value={this.state.types}
                onChange={this.changeInputHandler}
                input={<Input />}
                variant="outlined"
              >
                {this.state.render.types.map((type) => (
                  <MenuItem key={type._id} value={type._id}>
                    {type.type_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl style={{ width: "100%" }} variant="outlined">
              <InputLabel id="demo2">Đạo diễn</InputLabel>
              <Select
                labelId="demo2"
                id="directors"
                name="directors"
                multiple
                value={this.state.directors}
                onChange={this.changeInputHandler}
                input={<Input />}
                variant="outlined"
              >
                {this.state.render.directors.map((director) => (
                  <MenuItem key={director._id} value={director._id}>
                    {director.name_director}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl style={{ width: "100%" }} variant="outlined">
              <InputLabel id="demo3">Diễn viên</InputLabel>
              <Select
                labelId="demo3"
                id="actors"
                name="actors"
                multiple
                value={this.state.actors}
                onChange={this.changeInputHandler}
                input={<Input />}
                variant="outlined"
              >
                {this.state.render.actors.map((actor) => (
                  <MenuItem key={actor._id} value={actor._id}>
                    {actor.name_actor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl style={{ width: "100%" }} variant="outlined">
              <InputLabel id="demo4">Nhà sản xuất</InputLabel>
              <Select
                labelId="demo4"
                id="producers"
                name="producers"
                multiple
                value={this.state.producers}
                onChange={this.changeInputHandler}
                input={<Input />}
                variant="outlined"
              >
                {this.state.render.producers.map((producer) => (
                  <MenuItem key={producer._id} value={producer._id}>
                    {producer.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="country"
              name="country"
              label="Quốc gia"
              variant="outlined"
              value={this.state.country}
              onChange={this.changeInputHandler}
            />

            <TextField
              id="date"
              name="date"
              type="date"
              value={this.state.date}
              onChange={this.changeInputHandler}
              //   label="Ngày chiếu"
              variant="outlined"
            />
            <TextField
              id="price"
              name="price"
              label="giá phim"
              variant="outlined"
              value={this.state.price}
              onChange={this.changeInputHandler}
            />
            <TextField
              id="discount"
              name="discount"
              label="giá giảm"
              variant="outlined"
              value={this.state.discount}
              onChange={this.changeInputHandler}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              id="content"
              name="content"
              label="Nội dung phim"
              multiline
              rows={4}
              variant="outlined"
              value={this.state.content}
              onChange={this.changeInputHandler}
            />
          </Col>
        </Row>
        <div className="add-film-button">
          <Button
            variant="contained"
            style={{ background: "yellowgreen" }}
            startIcon={<EditIcon />}
            onClick={this.editFilmHandler}
          >
            Sửa phim
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteOutlineIcon />}
            onClick={this.deleteFilmHandler}
          >
            Xóa phim
          </Button>
        </div>
      </Container>
    );
  }
}

export default EditFilm;
