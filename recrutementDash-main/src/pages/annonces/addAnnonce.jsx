import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getRecruters } from "../../features/recruter/recruterSlice";

import { create, reset } from "../../features/annonce/annonceSlice";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

function CreateAnnonce() {
  const [formData, setFormData] = useState({
    recruter: "",
    title: "",
    salary: "",
    specialite: " ",
  });

  const { recruter, title, salary, specialite } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recruters } = useSelector((state) => state.recruters);
  const { annonces, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.annonces
  );

  useEffect(() => {
    dispatch(getRecruters())
      .unwrap()
      .then((data) => {
        console.log(recruters, "hedhom recruters");
      });
  }, [ isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const Data = {
      recruter,
      title,
      salary,
      specialite,
    };
    console.log(Data);
    dispatch(create(Data))
      .unwrap()
      .then((data) => {
        console.log(data, "hedhy subscribe fel res ok ");
        toast.success("annonce ajouter ");
        navigate("/annonces");
      })
      .catch((err) => {
        console.log(err, "hedhy subscribe fel not ok ");
        toast.error(err);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div
        style={{ backgroundColor: "#EFEFEF", height: "80vh" }}
        className='host'>
        <div className='container-fluid mt-3'>
          <div className='row justify-content-center mb-5'>
            <form
              className='col-lg-6 col-md-8 col-sm-12 col-xs-12'
              onSubmit={onSubmit}>
              <div className='form-group mb-3'>
                <label className='mb-2'>Title :</label>
                <input
                  type='text'
                  name='title'
                  className='form-control'
                  value={title}
                  placeholder='Enter  title'
                  onChange={onChange}
                />
              </div>
              <div className='form-group mb-3'>
                <label className='mb-2'>Salary :</label>
                <input
                  type='number'
                  name='salary'
                  className='form-control'
                  value={salary}
                  placeholder='Enter salary'
                  onChange={onChange}
                />
              </div>

              <div className='form-group mb-3'>
                <label className='mb-2'>Specialite :</label>
                <input
                  type='text'
                  name='specialite'
                  className='form-control'
                  value={specialite}
                  placeholder='Enter specialite'
                  onChange={onChange}
                />
              </div>

              <div className='form-group mb-3'>
                <select
                  value={recruter}
                  className='form-control'
                  name='recruter'
                  onChange={onChange}>
                  <option>choose recruter</option>
                  {recruters.length>0 ?(recruters?.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.name}
                    </option>
                  ))) :( <option>choose recruter</option>)}
                  ;
                </select>
              </div>

              <div className='d-flex justify-content-center mb-2'>
                <button
                  type='submit'
                  className='btn'
                  style={{ backgroundColor: "#005a81", color: "#fff" }}>
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <Link to='/annonces'>
            <a className='btn'>
              <i className='fas fa-arrow-left me-2'></i> retour a la liste
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
export default CreateAnnonce;
