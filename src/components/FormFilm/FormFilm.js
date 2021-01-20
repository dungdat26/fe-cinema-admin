import React, { Component } from "react";
import { TextField } from "@material-ui/core";

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

class FormFilm extends Component {
  render() {
    return (
      <>
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

        <TextField
          id="type"
          name="type"
          label="Thể loại"
          variant="outlined"
          value={this.state.type}
          onChange={this.changeInputHandler}
        />

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

        <TextField
          id="director"
          name="director"
          label="Đạo diễn"
          variant="outlined"
          value={this.state.director}
          onChange={this.changeInputHandler}
        />

        <TextField
          id="actors"
          name="actors"
          label="Tên các diễn viên"
          variant="outlined"
          value={this.state.actors}
          onChange={this.changeInputHandler}
        />

        <TextField
          id="producer"
          name="producer"
          label="Nhà sản xuất"
          variant="outlined"
          value={this.state.producer}
          onChange={this.changeInputHandler}
        />

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
          id="content"
          name="content"
          label="Nội dung phim"
          multiline
          rows={4}
          variant="outlined"
          value={this.state.content}
          onChange={this.changeInputHandler}
        />
      </>
    );
  }
}

export default FormFilm;
