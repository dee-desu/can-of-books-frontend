import React from "react";
import  Button  from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

class UpdateModal extends React.Component {

    render() {

        return (
            <Modal show={this.props.show} onHide= {this.props.handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Please update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.props.updateBook}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                             name="title"
                             placeholder="Insert the book name"
                             defaultValue={this.props.currentBooks.title} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                            type="text"
                            name="description"
                            placeholder="Insert the description"
                            defaultValue={this.props.currentBooks.description}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select id="status" defaultValue={this.props.currentBooks.status}>
                                <option>Choose status</option>
                                <option value="Life Changing">Life Changing</option>
                                <option value="Favorite Five">Favorite Five</option>
                                <option value="Recommended To Me">Recommended To Me</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleCloseUpdate}>
                        Exit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default UpdateModal;