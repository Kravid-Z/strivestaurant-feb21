import React from "react";
import { ListGroup, Alert, Button } from "react-bootstrap";

class DishComments extends React.Component {
  render() {
    return (
      <>
        {this.props.selectedDish && (
          <ListGroup>
            <h2>Comments for {this.props.selectedDish.name}</h2>
            {this.props.selectedDish.comments.map((c) => (
              <ListGroup.Item key={c.id}>{c.comment}</ListGroup.Item>
            ))}
          </ListGroup>
        )}
        {!this.props.selectedDish && (
          <Alert variant="warning">
            No Comments yet... Be the first <Button variant="outline-success">New Comment</Button>
          </Alert>
        )}
      </>
    );
  }
}

export default DishComments;

// mapping props.selectedDish.comments
