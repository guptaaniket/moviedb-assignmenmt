import React, { Component } from 'react'
import Details from "../components/movieDetails";
import HomeIcon from "@material-ui/icons/Home";
import { connect } from "react-redux";

import { NavLink, withRouter } from "react-router-dom";

class MovieInfo extends Component {
  constructor() {
    super();
    this.stste = {
      post: null
    };
  }
  render() {
    console.log(this.props)
    return (
        <div>
        <div className="container-fluid">
          <h4>Movie Details</h4>
          <div className="home-ic" 
          style={{top:".5rem"}}
           onClick={() =>
                this.props.dispatch({
                  type: "DELETE_POST" ,
                  id: this.props.posts[0].id
                })
              }
              >
            <NavLink to="/">
              <HomeIcon style={{ color: "#9b9b9b"}} />
            </NavLink>
          </div>
        </div>
        <div className="partition"> </div>
        <div className="container-fluid">
           {
             this.props ?<Details/>:<div>Somethimg went wrong....</div>
           } 
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state,
  };
};
export default connect(mapStateToProps)(MovieInfo);
