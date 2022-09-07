import React from "react";
import  Button  from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

class FormModal extends React.Component{

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Book to Favorites</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.props.addBook}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                            type="text"
                            name="title"
                            placeholder="Insert the book name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select id="Status">
                            <option>Choose a Status</option>
                                <option value="Life Changing">Life Changing</option>
                                <option value="Favorite Five">Favorite Five</option>
                                <option value="Reccomended To Me">Reccomended To Me</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Please Insert Book
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default FormModal;