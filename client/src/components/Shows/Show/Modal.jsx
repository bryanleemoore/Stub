import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./modal.css";
import { useDispatch } from 'react-redux';
import {addToList} from "../../../actions/shows";
import { fetchLists } from "../../../api";
import genreNames from "../genre";
import imdbLogo from "../../../images/imdblogo.png";
import {getLocalUser} from "../../../actions/login";


const Modal = props => {

  const dispatch = useDispatch();
  const [lists, setLists] = useState([]);
  const imdbRatingNormalized = props.showInfo.imdbRating/10;

  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    async function getList() {
      const listGet = await fetchLists();
      var userID = JSON.parse(localStorage.getItem('userLoginData')).id;
      listGet.data.forEach(async listElement => {
        if (listElement.ownerID === userID)
        {
          lists.push(listElement);
        }
      })
    }
    if (getLocalUser() != null)
    {
      getList();
    }

    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);


  //ADD SHOW TO LIST
  const handleAddToList = (show, listID) => {
    dispatch(addToList(show, listID));
  }

  function findMovieGenres(genre){
    let movieGenres = []
    for(let i=0; i<genre.length; i++){
      movieGenres.push(genreNames[genre[i]])
    }
    return movieGenres.join(", ")
  }
  
  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-body">
          <div>
            <button onClick={props.onClose} className="button closeButton">
              x
            </button>
            <img src={props.movieImage} alt={props.title} width="899px"></img>
          </div>
          <tr className="modalTable">
          
            <td className="modalOverview">
              <div className="modal-title-div">
                {
                  {
                    'netflix': <h2 className="modal-title">{props.title} <a href={props.link}><img className="streamingLink" src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-N-Symbol-logo-red-transparent-RGB-png.png" alt="streaming logo" width="30"></img></a></h2>,
                    'prime' : <h2 className="modal-title">{props.title} <a href={props.link}><img className="streamingLink" src="https://www.pngfind.com/pngs/m/394-3944103_amazon-prime-video-logo-png-transparent-png.png" alt="streaming logo" width="30"></img></a></h2>,
                    'disney' : <h2 className="modal-title">{props.title} <a href={props.link}><img className="streamingLink" src="https://cdn.icon-icons.com/icons2/2657/PNG/256/disney_plus_icon_161064.png" alt="streaming logo" width="30"></img></a></h2>,
                    'hbo' : <h2 className="modal-title">{props.title} <a href={props.link}><img className="streamingLink" src="https://cdn-icons-png.flaticon.com/512/5968/5968668.png" alt="streaming logo" width="30"></img></a></h2>,
                    'hulu' : <h2 className="modal-title">{props.title} <a href={props.link}><img className="streamingLink" src="https://d29fhpw069ctt2.cloudfront.net/icon/image/38688/preview.svg" alt="streaming logo" width="30"></img></a></h2>,
                    'peacock' : <h2 className="modal-title">{props.title} <a href={props.link}><img className="streamingLink" src="https://play-lh.googleusercontent.com/IdHOrlnq_yC9w5NGHollnGnunojuEW1_-8g32VaETN3kkXkTOTi001XN2TBykRC3Tg" alt="streaming logo" width="30"></img></a></h2>,
                    'paramount' : <h2 className="modal-title">{props.title} <a href={props.link}><img className="streamingLink" src="https://cdn.mos.cms.futurecdn.net/UFo74BuGo7FYxhAE3DrWUP.jpg" alt="streaming logo" width="30"></img></a></h2>,
                    'apple' : <h2 className="modal-title">{props.title} <a href={props.link}><img className="streamingLink" src="https://cdn.iconscout.com/icon/free/png-256/apple-tv-1859952-1575940.png" alt="streaming logo" width="30"></img></a></h2>
                  }[props.service]
                }
                <h3 className="modal-rating">IMDB: {imdbRatingNormalized}/10</h3>
                <a href={"https://www.imdb.com/title/"+props.showInfo.imdbID}><img src={imdbLogo} alt="imdb logo" width="50px"></img></a>
              </div>
              <p><b>Release Date: </b>{props.date} <b>Runtime: </b> {props.runtime} minutes</p>
              <p>{props.overview}</p>
            </td>
            <td className="modalInfo">

              {props.cast.length===0 ? null : <p> <b>Cast: </b> {props.cast.join(", ")}</p>}

              <p><b>Genre: </b> {findMovieGenres(props.showInfo.genres)}</p>
            </td>
            </tr>
          <p>{props.children}</p>
          </div>
          <div className="modal-footer">
          {!(getLocalUser() == null) ?
            <div className = "dropdown">
              <div className = "editMenuContent">
                  {/* {console.log(genreNames[props.showInfo.genres])} */}
                  {lists.map((listItem, index) => {
                    return (
                      <button key = {listItem} className = "dropdownLink" onClick={() => handleAddToList(props, listItem._id)}>Add to {listItem.name}</button>
                    )
                  })}
                </div>
              <button className = "editButton">Add To List</button>
            </div>
          :null} 
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
