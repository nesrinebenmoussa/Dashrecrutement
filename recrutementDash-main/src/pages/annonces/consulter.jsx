import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

import { remmove, getById, update } from "../../features/annonce/annonceSlice";
import { getRecruterById } from "../../features/recruter/recruterSlice";

import React from "react";

function ConsulterAnnonce() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { annonces, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.annonces
  );
  const [formData, setFormData] = useState({
    title: " ",
    specialite: " ",
    salary: " ",
  });
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getById(id));
    console.log(annonces, "annnnn");
    dispatch(getRecruterById(annonces.recruter));

    formData.title = annonces.title;
    formData.specialite= annonces.specialite;
    formData.salary = annonces.salary

    console.log(formData , 'init form ')
  }, [ isSuccess]);

  const onclick = () => {
    
    formData._id = id
    console.log( formData, "daata");
    dispatch(update( formData)).unwrap().then((data)=>
      {toast.success('updated ') 
      navigate('/annonces')}
    ).catch(err => toast.error(message))

       
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const OnDelete = () => {
    var answer = window.confirm("Delete data?");
    if (answer) {

      console.log(id , 'hedha li besh yetfassakh ')
  dispatch(remmove(id))
   
    navigate("/annonces");
 
   
}
 


  
  };
  if (isLoading) {
    return <Spinner />;
  } else
    return (
      <>
        <div className='container rounded bg-white mt-5 mb-5'>
          <div className='row'>
            <div className='col-md-5 border-right'>
              <div className='p-3 py-5'>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                  <h4 className='text-right'>{annonces.title}</h4>
                </div>
                <div className='row mt-3'>
                  <div className='col-md-12'>
                    <label className='labels'>Title </label>
                    <input
                      type='text'
                      className='form-control'
                      placeHolder='enter email id'
                      defaultValue={annonces.title}
                      name='title'
                      onChange={onChange}
                    />
                  </div>

                  <div className='col-md-12'>
                    <label className='labels'>Specialtite</label>
                    <input
                      type='text'
                      className='form-control'
                      placeHolder='enter address line 2'
                      defaultValue={annonces.specialite}
                      name='specialite'
                      onChange={onChange}
                    />
                  </div>

                  <div className='col-md-12'>
                    <label className='labels'>Salary </label>
                    <input
                      type='number'
                      className='form-control'
                      placeHolder='enter email id'
                      defaultValue={annonces.salary}
                      name='salary'
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='mt-5 text-center'>
                  <button
                    className='btn btn-primary mr-4 profile-button'
                    type='button'
                    onClick={onclick}>
                    Update 
                  </button>

                  <button
                    className='btn btn-primary profile-button'
                    type='button'
                    onClick={OnDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className='col-md-4 mt-4'> 
            <div className='d-flex justify-content-between align-items-center mt-3'>
                  <h4 className='text-right'>{annonces.title}</h4>
                </div>
              <div className='p-3 py-5'>
                <br />
               
                <div className='col-md-12'>
                  <label className='labels'>Questionire</label>
                  <input
                    type='text'
                    className='form-control'
                    placeHolder='additional details'
                    value={annonces._id}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default ConsulterAnnonce;
