import React from "react";
import { Alert, ListGroup, Spinner } from "react-bootstrap";
import { format, parseISO } from "date-fns";

// render will be called ONCE after the constructor (for displaying the initial state of your component)
// it will be called AGAIN every time there is a change in the state or in the props

class Reservations extends React.Component {
  constructor(props) {
    super(props);
    // this is really the first method invoked upon component construction
    console.log("THIS IS THE CONSTRUCTOR");
    // the constructor is useless for 90% of the time
  }

  // let's learn a couple of things about component lifecycle

  state = {
    timer: null,
    isLoading: true,
    isError: false,
    reservations: [],
  };

  componentDidMount = async () => {
    // this will just happen once!!
    console.log("THIS IS COMPONENTDIDMOUNT");
    // componentDidMount is the PERFECT PLACE for fetching outside data and update our state
    // fetch
    try {
      let response = await fetch(
        "https://striveschool.herokuapp.com/api/reservation"
      );
      console.log(response);
      if (response.ok) {
        let reservations = await response.json();
        console.log(reservations);
        this.timer = setTimeout(
          () =>
            this.setState({
              // reservations: reservations
              reservations,
              isLoading: false,
            }),
          5000
        );
      } else {
        this.setState({
          isLoading: false,
          isError: true,
        });
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        isError: true,
      });
      console.log(error);
    }
  };

  render() {
    console.log("THIS IS THE RENDER", this.state);
    // render is triggered everytime the component is re-rendered
    // a re-render happens every time there is a change in the STATE or in the PROPS of this component

    // this.setState({
    //     reservations: [{ name: 'Stefano', numberOfPersons: '5', dateTime: '9817984389' }]
    // })
    // THIS IS BAD, YOUR COMPONENT WILL BE STUCK INTO AN INFINITE LOOP

    return (
      <>
        <h3>RESERVATIONS</h3>
        <div className="my-3 text-center">
          {/* here we'll put our map */}
          {this.state.isLoading && (
            <Spinner animation="border" variant="success" />
          )}

          {!this.state.isLoading &&
            this.state.reservations.length === 0 &&
            !this.state.isError && <p>No reservations yet!</p>}

          {this.state.isError && (
            <Alert variant="danger">
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>
                Change this and that and try again. Duis mollis, est non commodo
                luctus, nisi erat porttitor ligula, eget lacinia odio sem nec
                elit. Cras mattis consectetur purus sit amet fermentum.
              </p>
            </Alert>
          )}

          {this.state.reservations.map((res) => (
            <ListGroup key={res._id}>
              <ListGroup.Item>
                <p>
                  From: {res.name}, for {res.numberOfPersons} people,
                </p>
                {/* <p>at {res.dateTime}</p> */}
                <p>
                  at {format(parseISO(res.dateTime), "yyyy-MMM-dd | HH:mm")}
                </p>
              </ListGroup.Item>
            </ListGroup>
          ))}
        </div>
      </>
    );
  }
}

export default Reservations;

// whenever you need to fetch data for your component
// you'll need a class based component

// initially, the state is empty and so we're not displaying anything from our .map()
// then componentDidMount happens and we fetch the data. then we save the data into the state
// because there's a change in the state, react will invoke render() again
// and now the array of reservations is filled up! so the map will output all the reservations
