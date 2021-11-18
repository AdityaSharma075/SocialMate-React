export function fetchPosts() {
  return (dispatch) => {
    const url = '/api/v1/posts?page=1&limit=5';
    fetch(url).then((response) => {
      console.log(response);
    });
  };
}
