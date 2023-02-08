import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import Card from "./components/Card";
// import Navbar from "./components/Navbar";
import Window from "./components/Window";
import Loader from "./components/Loader";
import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.0";
import "wired-elements";
import {FaHeart} from "react-icons/fa";


const App = () => {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState();
  // const [page, setPage] = useState();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("galaxy");



  let textInput = React.createRef();

  function handleClick() {
    // window.alert(`Hello ${textInput.current.value}!`);
    textInput.current.value
      ? getMovies(textInput.current.value, 1)
      : window.alert("Oops! no value searched");
  }

  const getMovies = async (key = "galaxy", p = 1) => {
    const movieReq = await axios.get(
      `http://www.omdbapi.com/?s=${key}&apikey=e524be6f&page=${p}`
    );
    console.log(movieReq);
    setMovies(movieReq.data.Search);
    setTotal(Math.ceil(movieReq.data.totalResults / 10));
    setLoading(false);
  };

  const handlePageClick = (e) => {
    console.log(e);
    getMovies(title, e.selected + 1);
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      {/* <div style={{background:"linear-gradient(142deg, rgba(0,0,0,0.6965379901960784) 0%, rgba(255,255,255,1) 56%)"}}></div> */}
      

      


      <div>
        <div
          style={{
            marginBottom: "40px",
            display: "flex",
            flexDirection: "row",
            height: "40px",
            justifyContent: "flex-start",
            alignItems: "center",
            verticalAlign: "text-top",
          }}
        >
          <h1>Cogo-Flix</h1>
          <FaHeart onClick={() => console.log("kjwbvkb")} style={{width:"25px" , height:'25px',marginLeft:'10px'}} />
          <div style={{ position: "absolute", right: "10px" }}>
            <wired-input placeholder="Title" ref={textInput} type="text" />
            <wired-button elevation="2" onClick={handleClick}>
              Search
            </wired-button>
          </div>
        </div>
      </div>
      {/* <Card mov={movies} /> */}

      <Window mov={movies} />

      <wired-card elevation="20" style={{ listStyleType: "none " }}>
        <ReactPaginate
          previousLabel={"Back"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={total}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </wired-card>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
