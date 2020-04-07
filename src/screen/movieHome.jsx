import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { NavLink, withRouter } from "react-router-dom";
import MovieCard from "../components/movieCard";
import HomeIcon from "@material-ui/icons/Home";
import axios from "axios";

class MovieHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: "",
      movieDetails: null,
      noData: false,
      movieAllData: "",
    };
    this.apiKey = process.env.REACT_APP_API;
  }

  componentDidMount() {
    this.getMovieData();
  }

  searchMovieData(key) {
    console.log(key);
    if (key !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=bb53a597c8f7f89abb6f2374d72ca36b&query=${key}`
      ).then((data) => {
        data.json().then((resp) => {
          if (Object.keys(resp) !== undefined) {
            this.setState({ movieData: resp.results, noData: false });
          } else {
            return "";
          }
        });
      });
    } else {
      this.getMovieData();
    }
  }

  getMovieData = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/all/week?api_key=bb53a597c8f7f89abb6f2374d72ca36b"
      )
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            movieAllData: res,
            movieData: res.data.results,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  movieDetails(item) {
    console.log(item)
    const movies = {
      id:item.id,
      title: item.title,
      name: item.original_name,
      rating: item.vote_average,
      picture: item.poster_path ,
      year: item.release_date,
      date: item.first_air_date,
      overview: item.overview,
    };
    this.props.dispatch({
      type: "POST_MOVIES",
      movies,
    });
    this.props.history.push('./movie-info')
  }

  showMovieCard = () => {
    const movieData = this.state.movieData;
    return movieData
      ? movieData.map((item) => (
          <div className="movie-card">
            <img
              className="card-img-top radius"
              style={{ height: "150px" }}
              src={
                item.backdrop_path !== null
                  ? `http://image.tmdb.org/t/p/w185${item.backdrop_path}`
                  : `https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`
              }
              alt="hero"
            ></img>
            <div className="card-body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <a style={{cursor:'pointer'}} onClick={(id) => this.movieDetails(item)}>
                <b>
                  {item.title
                    ? item.title.split("(", 1)
                    : "" || item.name.split("(", 1)}
                    </b>
                </a>
                <p>({item.vote_average}/10)</p>
              </div>
              <p>{item.overview.slice(0, 45) + "..."}</p>
            </div>
          </div>
        ))
      : "";
  };

  render() {
    const movieData = this.state.movieData;

    return (
      <div>
        <div
          className="container-fluid"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <input
            className="form-group search-box mt-3 ml-2"
            type="text"
            placeholder="Search..."
            name="search"
            onChange={(e) => {
              this.searchMovieData(e.target.value);
            }}
          ></input>
          <div className="home-ic">
            <NavLink to="/">
              <HomeIcon style={{ color: "#9b9b9b" }} />
            </NavLink>
          </div>
        </div>

        <div className="partition mb-1"> </div>
        {}
        <div
          className="container-fluid"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {movieData ? this.showMovieCard() : <div> Loading.. .</div>}
        </div>
      </div>
    );
  }
}

export default compose(withRouter,connect())(MovieHome);
