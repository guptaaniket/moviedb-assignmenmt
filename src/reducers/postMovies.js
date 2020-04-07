const postMovies = (state = [], action) => {
  console.log("action",action)
  switch (action.type) {
    case "POST_MOVIES":
      return state.concat([action.movies]);
    case "DELETE_MOVIES":
      return []
      // return state.filter((post) => post.id === action.id);
    default:
      return state;
  }
};

export default postMovies;
