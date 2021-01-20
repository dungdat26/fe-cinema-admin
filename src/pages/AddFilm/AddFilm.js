import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";

import axios from "../../axios-constain";
import { Row, Col } from "react-bootstrap";
import Input from "@material-ui/core/Input";
import TabsAdd from "../../components/TabsAdd/TabsAdd";
// 0 ngưng chiếu
// 1 sắp chiếu
// 2 đang chiếu
// 3 vy béo

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

class AddFilm extends Component {
  state = {
    EN_name: "",
    VN_name: "",
    status: "0",
    types: [],
    duration: "0",
    urlImg: "",
    country: "",
    date: new Date().toLocaleDateString(),
    content: "",
    price: "",
    discount: "",
    urlFilm: "",
    producers: [],
    types: [],
    director: "",
    producerName: [],
    directorName: [],
    personName: [],
    typeName: [],
    renderActor: [],
    renderDirector: [],
    renderProducer: [],
    renderType: [],
  };

  componentDidMount() {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    this.setState({ date: `${year}-${month}-${day}` });

    axios
      // get producers từ db và map theo tên để  select tên hiện thị trong input
      //renderProducer dùng để hiện thị name các producer trong input selection
      .get("/get-producers")
      .then((res) => {
        console.log(res.data);
        const producers = [...res.data.producers];
        this.setState({ producers: producers });

        const renderProducer = producers.map((producer) => {
          return producer.name;
        });
        console.log(producers);
        console.log(renderProducer);
        this.setState({ renderProducer });
      })
      .catch((err) => {
        console.log(err);
      });
    // get directors từ db và map theo tên để  select tên hiện thị trong input
    //renderDirector dùng để hiện thị name_director các directors trong input selection
    axios
      .get("/get-directors")
      .then((res) => {
        // console.log(res.data);
        const directors = [...res.data.directors];

        this.setState({ directors: directors });

        const renderDirector = directors.map((director) => {
          return director.name_director;
        });
        // console.log(directors);
        console.log(renderDirector);
        this.setState({ renderDirector });
      })
      .catch((err) => {
        console.log(err);
      });

    // get actors từ db và map theo tên để  select tên hiện thị trong input
    //renderActor dùng để hiện thị name_actor các actors trong input selection
    axios
      .get("/get-actors")
      .then((res) => {
        // console.log(res.data);

        const actors = [...res.data.actors];
        this.setState({ actors: actors });

        const renderActor = actors.map((actor) => {
          return actor.name_actor;
        });
        // console.log(actors);
        console.log(renderActor);
        this.setState({ renderActor });
      })
      .catch((err) => {
        console.log(err);
      });

    // get the_loai từ db và map theo tên để  select tên hiện thị trong input
    //renderType dùng để hiện thị type_name các the_loai trong input selection
    axios
    .get("/get-the_loai")
    .then((res) => {
      // console.log(res.data);
      const types = [...res.data.types];
      // console.log(types);
      this.setState({ types: types });
      const renderType = types.map((type) => {
        return type.type_name;
      });
      // console.log(renderType);
      this.setState({ renderType });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  changeInputHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  //onchange cho multiple Selector(chọn nhiều diễn viên) cho Actor trong input
  changeInputMultipleActor = (e) => {
    const value = e.target.value;
    console.log(e.target.value);
    this.setState({ personName: value }, () => {
      console.log(this.state.personName);
    });
  };

  //onchange cho multiple Selector(chọn nhiều đạo diễn) cho Actor trong input
  changeInputMultipleDirector = (e) => {
    const value = e.target.value;
    console.log(e.target.value);
    this.setState({ directorName: value }, () => {
      console.log(this.state.directorName);
    });
  };

  //onchange cho multiple Selector(chọn nhiều nhà sản xuất) cho Actor trong input
  changeInputMultipleProducer = (e) => {
    const value = e.target.value;
    console.log(e.target.value);
    this.setState({ producerName: value }, () => {
      console.log(this.state.producerName);
    });
  };

  //onchange cho multiple Selector(chọn nhiều thể loại) cho Actor trong input
  changeInputMultipleType = (e) => {
    const value = e.target.value;
    console.log(e.target.value);
    this.setState({ typeName: value }, () => {
      console.log(this.state.typeName);
    });
  };

  submitHandler = () => {
    const filmData = {
      ...this.state,
    };

    //map actors theo _id khi gửi lên BE sẽ có dạng là Array và String
    //nên khi vào BE phải map lại lần nữa theo dạng Array và Object để đúng với modal trong be
    filmData.actors = filmData.personName.map((name) => {
      return filmData.actors.find((actor) => {
        return actor.name_actor === name;
      })._id;
    });

    //map directors theo _id khi gửi lên BE sẽ có dạng là Array và String
    //nên khi vào BE phải map lại lần nữa theo dạng Array và Object để đúng với modal trong be
    filmData.directors = filmData.directorName.map((name1) => {
      return filmData.directors.find((director) => {
        return director.name_director === name1;
      })._id;
    });

    //map producers theo _id khi gửi lên BE sẽ có dạng là Array và String
    //nên khi vào BE phải map lại lần nữa theo dạng Array và Object để đúng với modal trong be
    filmData.producers = filmData.producerName.map((name2) => {
      return filmData.producers.find((producer) => {
        return producer.name === name2;
      })._id;
    });

    //map types theo _id khi gửi lên BE sẽ có dạng là Array và String
    //nên khi vào BE phải map lại lần nữa theo dạng Array và Object để đúng với modal trong be
    filmData.types = filmData.typeName.map((name3) => {
      console.log(filmData.typeName);
      return filmData.types.find((type) => {
        return type.type_name === name3;
      })._id;
    });

    //delete bớt các element trong array vì gửi lên BE chỉ gửi những thứ cần thiết 
    //không cần thiết gửi tất cả thông tin không xài đến 
    delete filmData.typeName;
    delete filmData.producerName;
    delete filmData.personName;
    delete filmData.directorName;
    delete filmData.renderActor;
    delete filmData.renderDirector;
    delete filmData.renderProducer;
    delete filmData.renderType;

    //axios khi post lên BE để xử lý
    axios
      .post("/add-film", filmData)
      .then((res) => {
        this.state.actors.push(filmData.actors);
        this.state.directors.push(filmData.directors);
        this.state.directors.push(filmData.producers);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //nhưng vì đây là component CHÁU 
  //nên phải truyền từ conmponent ông NỘI là TabsAdd.js chứa 3 modal add
  //sau đó tiếp tục truyền tới mỗi form add là Component CHA tiếp đến Component Cháu
  //mới GET được ĐATA từ DB mà 3 form component CHA gửi lên db
  //xử lý modal add actors vào tại trang add film mà không cần refresh page
  //tên actors vừa add được sẽ được update liền tại input để chọn 
  addActorSuccess = (data) => {
    console.log(data);
    // console.log(res.data);

    const actors = [...this.state.actors, data.actor];
    console.log(actors);
    this.setState({ actors: actors });

    const renderActor = actors.map((actor) => {
      return actor.name_actor;
    });
    // console.log(actors);
    console.log(renderActor);
    this.setState({ renderActor });
  };

   //tên directors vừa add được sẽ được update liền tại input để chọn 
  addDirectorSuccess = (data) => {
    console.log(data);

    // console.log( [...this.state.directors, data.director]);
    const directors = [...this.state.directors, data.director];
    console.log(directors);

    this.setState({ directors: directors });

    const renderDirector = directors.map((director) => {
      return director.name_director;
    });
    console.log(directors);
    console.log(renderDirector);
    this.setState({ renderDirector });
  };

  //tên producers vừa add được sẽ được update liền tại input để chọn 
  addProducerSuccess = (data) => {
    console.log(data);

    // console.log( [...this.state.producers, data.producers]);
    const producers = [...this.state.producers, data.producer];
    console.log(producers);

    this.setState({ producers: producers });

    const renderProducer = producers.map((producer) => {
      return producer.name;
    });
    console.log(producers);
    console.log(renderProducer);
    this.setState({ renderProducer });
  };

  render() {
    if (this.state.isDone) {
      return <Redirect to="/add-film" />;
    }
    return (
      <Container className="form-add-film">
        {/* đây là component CHÁU được truyền xuống từ component CHA và Ông NỘI */}
        <TabsAdd
          addActorSuccess={this.addActorSuccess}
          addDirectorSuccess={this.addDirectorSuccess}
          addProducerSuccess={this.addProducerSuccess}
        />
        <h3 style={{ marginTop: "30px" }}>Thêm Phim</h3>
        <Row>
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
              <InputLabel id="demo-mutiple-chip-label">Thể loại</InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="type"
                multiple
                value={this.state.typeName}
                onChange={this.changeInputMultipleType}
                input={<Input />}
                variant="outlined"
              >
                {this.state.renderType.map((name3) => (
                  <MenuItem key={name3} value={name3}>
                    {name3}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
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

            <FormControl style={{ width: "100%" }} variant="outlined">
              <InputLabel id="demo-mutiple-chip-label">Đạo diễn</InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="directors"
                multiple
                value={this.state.directorName}
                onChange={this.changeInputMultipleDirector}
                input={<Input />}
                variant="outlined"
              >
                {this.state.renderDirector.map((name1) => (
                  <MenuItem key={name1} value={name1}>
                    {name1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Col>
          <Col>
            <FormControl style={{ width: "100%" }} variant="outlined">
              <InputLabel id="demo-mutiple-name-label">diễn viên</InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="actors"
                multiple
                value={this.state.personName}
                onChange={this.changeInputMultipleActor}
                input={<Input />}
                variant="outlined"
              >
                {this.state.renderActor.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl style={{ width: "100%" }} variant="outlined">
              <InputLabel id="demo-mutiple-chip-label">Nhà Sản Xuất</InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="producers"
                multiple
                value={this.state.producerName}
                onChange={this.changeInputMultipleProducer}
                input={<Input />}
                variant="outlined"
              >
                {this.state.renderProducer.map((name2) => (
                  <MenuItem key={name2} value={name2}>
                    {name2}
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
              id="price"
              name="price"
              label="Giá phim"
              variant="outlined"
              value={this.state.price}
              onChange={this.changeInputHandler}
            />

            <TextField
              id="discount"
              name="discount"
              label="Giá giảm"
              variant="outlined"
              value={this.state.discount}
              onChange={this.changeInputHandler}
            />

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

            <TextField
              id="date"
              name="date"
              type="date"
              value={this.state.date}
              onChange={this.changeInputHandler}
              //   label="Ngày chiếu"
              variant="outlined"
            />
          </Col>
        </Row>

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

        <div className="add-film-button">
          <Button
            variant="contained"
            style={{ background: "yellowgreen" }}
            onClick={this.submitHandler}
          >
            Thêm phim
          </Button>
          <Button variant="contained" color="secondary">
            Hủy bỏ
          </Button>
        </div>
      </Container>
    );
  }
}

export default AddFilm;
