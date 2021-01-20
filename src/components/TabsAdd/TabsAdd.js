import React, { Component } from "react";
import { Modal, Button, Tab, Tabs } from "react-bootstrap";
import CloseIcon from "@material-ui/icons/Close";
import AddProducer from "../../pages/AddProducer/AddProducer";
import AddActors from "../../pages/AddActor/AddActor";
import AddDirector from "../../pages/AddDirector/AddDirector";

export default class TabsAdd extends Component {
  state = {
    show: false,
    key: "addfilm",
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };
  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>
          Thêm tất cả
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            <Tabs
              id="controlled-tab-example"
              activeKey={this.key}
              onSelect={(k) => this.setState({ key: k })}
            >
              {/* Đây là component ÔNG NỘI truyền các Props xuống component CHA */}
              <Tab eventKey="addDirector" title="Thêm dao dien">
                <AddDirector
                  addDirectorSuccess={this.props.addDirectorSuccess}
                />
              </Tab>
              <Tab eventKey="addproducer" title="Thêm NSX">
                <AddProducer
                  addProducerSuccess={this.props.addProducerSuccess}
                />
              </Tab>
              <Tab eventKey="addactor" title="Thêm dien vien">
                <AddActors addActorSuccess={this.props.addActorSuccess} />
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button
              data-dismiss="modal"
              variant="contained"
              color="danger"
              onClick={this.handleClose}
              startIcon={<CloseIcon />}
              style={{ margin: "10px" }}
            >
              close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
