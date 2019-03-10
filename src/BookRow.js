import React, { Component } from "react";

class BookRow extends Component {
  render() {
    const book = this.props.book;
    let authorsDetail = book.authors.map(author => (
      <div key={author.id}> {author.name} </div>
    ));
    return (
      <tr>
        <td>{book.title}</td>
        <td>{authorsDetail}</td>
        <td>
          <button className="btn" style={{ backgroundColor: book.color }} />
        </td>
      </tr>
    );
  }
}

export default BookRow;
