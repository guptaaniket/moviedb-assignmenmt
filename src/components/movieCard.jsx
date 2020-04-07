import React, { Component } from "react";
import "./movieDetails.css";
import { withRouter } from "react-router-dom";

class MovieCard extends Component {
  render() {
    return (
      <div
        className="movie-card"
        onClick={this.props.onClick}
      >
        <img
          className="card-img-top radius" style={{height:'150px'}}
          src={
            this.props.image !== null
              ? `http://image.tmdb.org/t/p/w185${this.props.image}`
              : `https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`
          }
          alt="hero"
        ></img>
        <div className="card-body">
          <div style={{ display: "flex" ,justifyContent:'space-between'}}>
            <a  className='cursor'> {this.props.title}</a>
            <p>({this.props.rating}/10)</p>
          </div>
          <p>{this.props.description}</p>
        </div>
      </div>
    );
  }
}
export default withRouter(MovieCard);
