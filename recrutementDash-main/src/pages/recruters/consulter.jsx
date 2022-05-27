import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

import {
  deleteRecruter,
  getRecruterById,
  update,
} from "../../features/recruter/recruterSlice";

import React from "react";

function ConsulterRecruter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recruters } = useSelector((state) => state.recruters);
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.recruters
  );

  const [formData, setFormData] = useState({
    name: recruters.name,
    email: recruters.email,
    password: recruters.password,
    tel: recruters.tel,
    adress: recruters.adress,
  });

  useEffect(() => {}, [
    recruters,
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

    dispatch(getRecruterById(id))
      .unwrap()
      .then((data) => {
       console.log(data , 'response')
      })
      .catch((err) => {
        console.log(err);
      });
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
        navigate("/recruters");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    console.log(formData, "after changing ");
  };

  const OnDelete = () => {
    var answer = window.confirm("Delete data?");
    if (answer) {
    dispatch(deleteRecruter(id))
    if(isSuccess){

        toast.success("recruter supprumer ");
        navigate("/recruters");
    }
 if(isError) toast.error(message);
  };
  }
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
                      defaultValue={recruters.name}
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
                      defaultValue={recruters.email}
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
                      defaultValue={recruters.adress}
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
                      defaultValue={recruters.tel}
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
                    value={recruters._id}
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

export default ConsulterRecruter;
