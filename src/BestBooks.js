import React from "react";
import axios from "axios";
// import "./styles/BestBooks.css";
import FormModal from "./FormModal";
import UpdateModal from "./UpdateModal";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { withAuth0 } from '@auth0/auth0-react';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showFlag: false,
      status: "",
      books: [],
      currentBooks: {},
    };
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount = () => {
    const { user } = this.props.auth0
    axios
      .get(`https://dee-11.herokuapp.com/books?name=${user.email}`)
      .then((result) => {
        this.setState({
          books: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleShowUpdate = (item) => {
    this.setState({
      showFlag: true,
      currentBooks : item,
    });
  };

  handleCloseUpdate = () => {
    this.setState({
      showFlag: false,
    });
  };

  addBook = (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;
    const obj = {
      title: event.target.title.value,
      description: event.target.description.value,
      status : event.target.status.value,
      name: user.email
    };

      console.log(obj);
      axios
      .post(`https://dee-11.herokuapp.com/books`, obj)
      .then((result) => {
        return this.setState({
          books: result.data,
        });
      })
      .catch((err) =>{
        console.log(err);
      });
      this.handleClose();
    };
    deleteBook = (id) => {
      const { user } = this.props.auth0;
      axios
      .delete(`https://dee-11.herokuapp.com/books/${id}?name=${user.email}`)
      .then((result) => {
        this.setState({
          books: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    };

    updateBook = (event) => {
      event.preventDefault();
      const { user } = this.props.auth0;
      let obj = {
        title: event.target.title.value,
        description: event.target.description.value,
        status : event.target.status.value,
        name: user.email
      }
      console.log(obj)
      const id = this.state.currentBooks._id;
      axios
      .put(`https://dee-11.herokuapp.com/books/${id}` , obj)
      .then(result=> {
        this.setState({
          books : result.data
        })
      })
      .catch(err=> {
        console.log(err);
      })
      this.handleCloseUpdate();
    }


  render() {
    return (
      <>
      <div>
        <div id="form">
          <>
          <Button
          variant="outline-secondary"
          size="lg"
          onClick={this.handleShow}
          >
            Add the book
            </Button>
            <FormModal 
            show={this.state.show}
            handleClose={this.handleClose}
            addBook={this.addBook}
            handleOnChange={this.handleOnChange}
            />
            </>
        </div>
      <div  id="CarouselDiv">
        {this.state.books.length ? (
          <div id="secondaryDiv" style={{ width: "400px" }}>
            <Carousel fade>
              {this.state.books.map((item) => {
                return(
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("./background-react.png")}
                    alt="Slide"
                  />
                  <Carousel.Caption>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>{item.status}</p>
                    <div id="btns">
                      <Button
                      variant="light"
                      onClick={() => this.deleteBook(item._id)}
                      >
                        Delete
                        </Button>
                        <Button
                        variant="outline-light"
                        onClick={() => this.handleShowUpdate(item)}
                        >
                          Update Book
                          </Button>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
                );
              })}
            </Carousel>
            <UpdateModal
            show={this.state.showFlag}
            handleCloseUpdate={this.handleCloseUpdate}
            handleShowUpdate={this.handleShowUpdate}
            updateBook={this.updateBook}
            currentBooks={this.state.currentBooks}
            />
          </div>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </div>
    </div>
         </>
    );
  }
}


export default withAuth0(BestBooks);
