import React from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
// import "./styles/BestBooks.css";
import FormModal from "./FormModal";
import UpdateModal from "./UpdateModal";
import Button from "react-bootstrap/Button";

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
    axios
      .get("https://dee-11.herokuapp.com/books")
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

      const obj = {
        title: event.target.title.value,
        description: event.target.description.value,
        status: event.target.status.value
      };

      console.log(obj);
      axios
      .post(`https://dee-11.herokuapp.com/books`)
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
      axios
      .delete(`https://dee-11.herokuapp.com/books/${id}`)
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
      let obj = {
        title: event.target.title.value,
        description: event.target.description.value,
        status : event.target.status.value
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
            Insert the book
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
                    src="https://play-lh.googleusercontent.com/DmpYQrVcldrDuz5uyATqGbNvTALsJ1Bg3fpXM0p-VsRNM19osEB9-_ByvdjSbTvZQg=w450-h300-rw"
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
                        Remove the Book
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


export default BestBooks;
