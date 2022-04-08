import React, {useState} from 'react';
import './lists.css';
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import ListUpdate from '../jsx/ListChange';
import {deleteList} from '../../actions/lists.js';
import {updateList} from '../../actions/lists.js';
import {addListShow} from '../../actions/lists.js';
import {editListName} from '../../actions/lists.js';
import { getThemeProps } from '@material-ui/styles';
import useStyles from './styles';

import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core/';

import white from '../../images/white.jpeg';
import axios from 'axios';
//import { editListName } from '../../api';

function List(prop){

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = (payload) => {
    dispatch(deleteList(payload));
  }
  const handleEdit = (payload, e) => {
    console.log("List.jsx update fn" + payload + " E: " + e);
    dispatch(editListName(payload, e));
  }

  const handleAddShow = () => {
    console.log("List.jsx handleAddShow: " + prop.shows + ", " + prop._id);
    dispatch(addListShow(prop._id, [...prop.shows, "hello"]));
  }

  function CreatePoster(prop){
    console.log(prop.shows)
    return <img className='listImagePosters' src={prop.shows[prop.i].showInfo.posterURLs.original} alt="movie poster"></img>
  }


  function getListImages(shows){
    console.log("djakhjfaesjjaf")
    console.log(shows)
    if(shows.length >= 1){
      if(3<=shows.length){
        return (<>
          <CreatePoster i = {0} shows = {prop.shows} />
          <CreatePoster i = {1} shows = {prop.shows} />
          <CreatePoster i = {2} shows = {prop.shows} />
        </>)
      }
      else if(2===shows.length){
        return (<>
          <CreatePoster i = {0} shows = {prop.shows} />
          <CreatePoster i = {1} shows = {prop.shows} />
          <CreatePoster i = {0} shows = {prop.shows} />
        </>)
      }
      else if(1===shows.length){
        return (<>
          <CreatePoster i = {0} shows = {prop.shows} />
          <CreatePoster i = {0} shows = {prop.shows} />
          <CreatePoster i = {0} shows = {prop.shows} />
        </>)
      }
      
    }
    else{
      return (
      <>
      <img className='listImagePosters' src={white} alt="blank image"></img>
      <img className='listImagePosters' src={white} alt="blank image"></img>
      <img className='listImagePosters' src={white} alt="blank image"></img>
      </>
      )
    }
    // console.log("posters: "+imagePosters)
      
  }


  // console.log("testing "+ JSON.stringify(prop.shows[0].showInfo))

    return (
        <Card className={classes.card}>
          <div className="listButton">
            <Link className="link-list" to={"/lists/"+prop.name}>
              <div className="areaOfButton">
                <div className="listHeaderDiv">
                    <div className='listButtonImages'>
                      {getListImages(prop.shows)}
                    </div>
                </div>
                <h1 className="listHeader">{prop.name}</h1>
                <div className="listItem">
                <div className="dropdown">
                  <button className ="editButton">edit</button>
                  <div className="editMenuContent">
                    <button className="dropdownLink" onClick={() => handleEdit(prop._id, "testing one two")}>Edit</button>
                    <button className="dropdownLink" onClick={() => handleDelete(prop._id)}>Delete</button>
                  </div>
                </div>
              </div>
              </div>
                
            </Link>
              
          </div>
        </Card>
  );
}

export default List;
