import React, { Component } from "react";
import { connect } from "react-redux";
import "./movieDetails.css";

class MovieDetails extends Component {
  constructor() {
    super();
  }

  render() {
    const data = this.props.posts.slice(-1)[0];
    return (
      <div>
        {typeof this.props.posts !== "undefined" &&
        this.props.posts.length > 0 ? (
          <div className="flex-cls mt-3">
            <img
              src={
                data.picture !== null
                  ? `http://image.tmdb.org/t/p/w185${data.picture}`
                  : `https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`
              }
            />
            <div className="ml-3">
              <div className="flex-cls">
                <b>{data.name || data.title}</b>
                <p>({data.rating}/10)</p>
              </div>

              <div>
                <p>Release Date: {data.year || data.first_air_date}</p>
                <p>Description: {data.overview}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>Something Went wrong.....</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state,
  };
};
export default connect(mapStateToProps)(MovieDetails);
