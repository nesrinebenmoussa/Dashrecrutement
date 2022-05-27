import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
    
  changeStatus,
} from "../../features/condidat/condidatSlice";
import { toast } from "react-toastify";
import { FaTrashAlt, FaEye,   FaLock  , FaUnlock} from "react-icons/fa";

function Annonce({ annonce }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { annonces, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.annonces
  );

  useEffect(() => {}, [
    annonces,
    isError,
    isSuccess,
    message,
    navigate,
    dispatch,
  ]);
  

  const update = ()=>{
      console.log('update clicked')
  }
  
  const consulter = ()=>{
    navigate(`/annonces/${annonce._id}`)
    console.log('delete clicked '+annonce.title )
}
  
  return (
    <> 
             
      <div className='col-sm-4 mb-2 '>
        <div class='card ' style={{ width: "18rem", backgroundColor: "#ddd" }}>
          <div className='card-body text-dark'>
            <h5 className='card-title '>Name : {annonce.title}</h5> 
            <h6> salary : {annonce.salary}</h6>
            <h6>specialite : {annonce.specialite}</h6>
 
            <p class='card-text'>
              {new Date(annonce.createdAt).toLocaleString("en-US")}
            </p>
            
            <button
              type='submit'
              className='btn card-link'
              style={{ backgroundColor: "#005a81", color: "#fff" }}
              onClick={consulter}>
              Consulter <FaEye />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Annonce;
