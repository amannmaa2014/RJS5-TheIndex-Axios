import React, { Component } from "react";

//import authors from "./data.js";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

//axios
import axios from "axios";

class App extends Component {
  state = {
    currentAuthor: null,
    filteredAuthors: [],
    authors: [],
    loading: true
  };

  //selectAuthor = author => this.setState({ currentAuthor: author });

  unselectAuthor = () => this.setState({ currentAuthor: null });

  filterAuthors = query => {
    query = query.toLowerCase();
    let authors = this.state.authors;
    let filteredAuthors = authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ filteredAuthors: filteredAuthors });
  };

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorsList
          authors={this.state.filteredAuthors} //pass the empty array
          selectAuthor={this.selectAuthor}
          filterAuthors={this.filterAuthors}
        />
      );
    }
  };
  selectAuthor = async author => {
    {
      try {
        const response = await axios.get(
          `https://the-index-api.herokuapp.com/api/authors/${author.id}/`
        );
        //assign the array of data returned by the request to the state.authors
        const authorsData = response.data;
        this.setState({
          loading: false,
          currentAuthor: authorsData
        });
      } catch (error) {
        console.error("Unexpected Error");
        console.error(error);
      }
    }
  };
  ///////////////////////////////////////////////
  async componentDidMount() {
    try {
      const response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      //assign the array of data returned by the request to the state.authors
      const authorsData = response.data;
      this.setState({
        authors: authorsData,
        filteredAuthors: authorsData,
        loading: false
      });
    } catch (error) {
      console.error("Unexpected Error");
      console.error(error);
    }
  }
  render() {
    if (this.state.loading) return <div>LOADING PAGE!</div>;
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
