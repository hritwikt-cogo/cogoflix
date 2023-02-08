import "wired-elements";
import { FaHeart } from "react-icons/fa";
import Modal from "react-modal";
import React, { useState } from "react";
import axios from "axios";
import { SpinnerDotted } from "spinners-react"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const handleWindow = () => {
  console.log("gg");
};

function Window({ mov }) {
  const [dialog, setDialog] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  let subtitle;

  const getById = async (id) => {
    const req = await axios.get(
      `https://www.omdbapi.com/?i=${id}&apikey=e524be6f&`
    );
    console.log(req.data);
    setDialog(req.data);
    setLoad(false);

  };

  function openModal(e) {
    setIsOpen(true);
    getById(e);
    // console.log(e)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
   
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {load ? (
            <SpinnerDotted />
) : (
            <div>
            <wired-card elevation="3">
              
              <h3>{dialog.Title}</h3>
              <div>Metascore:{dialog.Metascore}</div>
              <img src={dialog.Poster} alt="" />
              <div>Title:{dialog.Title}</div>
              <div>Year:{dialog.Year}</div>
              <div>Plot:{dialog.Plot}</div>
              {dialog.genre}
              <wired-button style={{marginTop:"10px",marginBottom:"10px"}} onClick={closeModal}>close</wired-button>
            </wired-card>
          </div>
        )}
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirecion: "row",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >

        {mov.length > 0
          ? mov.map((r) => {
              return (
                <>
                  <div
                    style={{
                      Width: "200px",
                      marginLeft: "10px",
                      marginRight: "10px",
                      paddingBottom: "20px",
                    }}
                  >
                    <wired-card elevation="9">
                      <div style={{ width: "200px" }}>
                        <img
                          style={{ height: "300px", width: "200px" }}
                          src={r.Poster}
                          alt="OMDB bad"
                        />
                        <div
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.Title}
                        </div>
                        <div>{r.Year}</div>
                        {/* <div>{r.Type}</div> */}
                        {/* <div>{r.imdbID}</div> */}
                        <wired-button
                          onClick={() => {
                            openModal(r.imdbID);
                            setLoad(true)
                            // console.log(r.imdbID);
                          }}
                        >
                          More Info
                        </wired-button>
                        <wired-icon-button
                          style={{ position: "absolute", right: "0px" }}
                          onClick={() => console.log(r.imdbID)}
                        >
                          <FaHeart />
                        </wired-icon-button>
                      </div>
                    </wired-card>
                  </div>
                </>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default Window;
