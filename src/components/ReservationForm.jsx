import React from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";

// name
// phone
// numberOfPersons
// smoking
// dateTime
// specialRequests
let stringfunc;

class ReservationForm extends React.Component {
  state = {
    reservation: {
      name: "",
      phone: "",
      numberOfPersons: 1,
      smoking: false,
      dateTime: "",
      specialRequests: {
        id: "testOne1KD",
        name: "testing our APIComments",
        randomN: (min, max) => Math.random() * (max - min) + min,
        // get printN() {
        //   return console.log(
        //     this.state.reservation.specialRequests.randomN(1, 10)
        //   );
      },
    },
    show: false,
    setShow: false,
    variant: "",
    MessgModal: "",
    titleModal: "",
  };
  toStringMyObjFunc = () => {
    stringfunc = this.state.reservation.specialRequests.randomN.toString();
    console.log(stringfunc);
  };

  handleClose = () => this.setState({ show: false, setShow: false });
  handleShow = () => this.setState({ show: true, setShow: true });

  handleInput = (e) => {
    let id = e.target.id; // name or phone or numberOfPersons
    console.log("ID OF THIS INPUT FIELD IS", id);
      
    this.setState({
      reservation: {
        ...this.state.reservation,
        [id]: id === "smoking" ? e.target.checked : e.target.value, // ex. name: 'Stefano', phone: '123'
      },
    });
  };
  submitData = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://striveschool.herokuapp.com/api/reservation",
        {
          method: "POST",
          body: JSON.stringify(this.state.reservation),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        this.setState({
          reservation: {
            name: "",
            phone: "",
            numberOfPersons: 1,
            smoking: false,
            dateTime: "",
            specialRequests: "",
          },
          MessgModal:
            "We have sent a sms to your phonenumber to confirm your booking",
          titleModal: "Booking done",
          variant: "success",
        });
        this.handleShow();
      } else {
        this.setState({
          MessgModal: "Please check your booking and try again",
          titleModal: "Something went wrong",
          variant: "danger",
        });
        this.handleShow();
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log(this.state);
    this.toStringMyObjFunc();
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Alert variant={this.state.variant}>
                {this.state.titleModal}
              </Alert>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.MessgModal}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <h2>Book your table NOW!!</h2>
        <Form onSubmit={this.submitData}>
          <Form.Group>
            <Form.Label>Your name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              placeholder="Enter your name"
              // onChange={e => {
              //     this.setState({
              //         reservation: {
              //             ...this.state.reservation, // I'm adding to the new reservation all the existing
              //             // properties already in the state
              //             name: e.target.value
              //         }
              //     })
              // }}
              onChange={this.handleInput}
              value={this.state.reservation.name}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              id="phone"
              placeholder="Enter your phone"
              // onChange={e => {
              //     this.setState({
              //         reservation: {
              //             ...this.state.reservation, // I'm adding to the new reservation all the existing
              //             // properties already in the state
              //             phone: e.target.value
              //         }
              //     })
              // }}
              onChange={this.handleInput}
              value={this.state.reservation.phone}
            />
          </Form.Group>

          <Form.Group>
            <Form.Check
              type="checkbox"
              id="smoking"
              label="Smoking?"
              onChange={this.handleInput}
              checked={this.state.reservation.smoking}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>How many people?</Form.Label>
            <Form.Control
              id="numberOfPersons"
              as="select"
              value={this.state.reservation.numberOfPersons}
              onChange={this.handleInput}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Date for the reservation</Form.Label>
            <Form.Control
              type="datetime-local"
              id="dateTime"
              onChange={this.handleInput}
              value={this.state.reservation.dateTime}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Any special request?</Form.Label>
            <Form.Control
              as="textarea"
              id="specialRequests"
              rows={5}
              onChange={this.handleInput}
              value={this.state.reservation.specialRequests}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

export default ReservationForm;
