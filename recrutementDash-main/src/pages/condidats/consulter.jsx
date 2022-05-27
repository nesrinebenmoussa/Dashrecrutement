import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import {
  deleteCondidat,
  getById,
  update,
} from "../../features/condidat/condidatSlice";

import React from "react";

function ConsulterCondidat() {

  
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { condidats } = useSelector((state) => state.condidats);
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.condidats
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    tel: "",
    adress: "",
  });

  useEffect(() => {}, [
    condidats,
    isError,
    isSuccess,
    message,
    navigate,
    dispatch,
  ]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getById(id))
      
  }, [navigate, dispatch]);

  const onclick = () => {
    console.log("changed ");
    formData.id = id;
    console.log(formData, "hedha fesh nabeeth ");
    dispatch(update(formData))
      .unwrap()
      .then((data) => {
        console.log(data);
        toast.success("recruter info updated ");
        navigate("/condidats");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect (()=>{
    console.log(formData , 'jnaayeeeh ');
    } ,[formData])
  const onChange = (e) => {
    setFormData(({
      ...condidats,
      [e.target.name]: e.target.value,
    }));

    console.log(formData, "after changing ");
  };

  const OnDelete = () => {
    var answer = window.confirm("Delete data?");
if (answer) {
  dispatch(deleteCondidat(id))
  if(isSuccess){

      toast.success("condidat supprumer ");
      navigate("/condidats");
  }
if(isError) toast.error(message);
}
else {
   
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
                  <h4 className='text-right'>Profile Settings</h4>
                </div>

                <div className='row mt-3'>
                  <div className='col-md-12'>
                    <label className='labels'>Full Name</label>
                    <input
                      type='text'
                      className='form-control'
                      placeHolder='enter full name'
                      defaultValue={condidats.name}
                      name='name'
                      onChange={onChange}
                    />
                  </div>
                  <div className='col-md-12'>
                    <label className='labels'>Email </label>
                    <input
                      type='text'
                      className='form-control'
                      placeHolder='enter email '
                      defaultValue={condidats.email}
                      name='email'
                      onChange={onChange}
                    />
                  </div>
                  <div className='col-md-12'>
                    <label className='labels'>Address </label>
                    <input
                      type='text'
                      className='form-control'
                      placeHolder='enter adress  '
                      defaultValue={condidats.adress}
                      name='adress'
                      onChange={onChange}
                    />
                  </div>
                  <div className='col-md-12'>
                    <label className='labels'>Phone </label>
                    <input
                      type='text'
                      className='form-control'
                      placeHolder='enter phone'
                      defaultValue={condidats.tel}
                      name='tel'
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='mt-5 text-center'>
                  <button
                    className='btn btn-primary mr-4 profile-button'
                    type='button'
                    onClick={onclick}>
                    Update Profile
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
            <div className='col-md-4'>
              <div className='p-3 py-5'>
                <br />
                <div className='col-md-12'>
                  <label className='labels'>Additional Details</label>
                  <input
                    type='text'
                    className='form-control'
                    placeHolder='additional details'
                    value={condidats._id}
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
export default ConsulterCondidat;
