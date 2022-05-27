import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import {  createCondidat,deleteCondidat,getCondidats } from "../../features/condidat/condidatSlice";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

function AddCondidat() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    tel: "",
    adress: "",
  });

  const { name, email, password, tel, adress } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { condidats, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.condidats
  );

  useEffect(() => {
    
 
  }, [condidats, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const Data = {
      name,
      email,
      password,
      tel,
      adress,
      active: true ,
    };
    dispatch(createCondidat(Data)).unwrap().then(
      data=>{
        console.log(data , 'hedhy subscribe fel res ok ')
      toast.success('condidat ajouter ')
      navigate('/condidats')
    }).catch(err=>{console.log(err , 'hedhy subscribe fel not ok ')
    toast.error(err);
  })
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div
        style={{ backgroundColor: "#EFEFEF", height: "80vh" }}
        className="host"
      >
        <div className="container-fluid mt-3">
          <div className="row justify-content-center mb-5">
            <form className="col-lg-6 col-md-8 col-sm-12 col-xs-12" onSubmit={onSubmit}>
              {/* <!-- <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="fas fa-exclamation-triangle me-3"></i> <small>Confirmation de mot de passe incorrect</small>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div> --> */}
              <div className="form-group mb-3">
                <label className="mb-2">Name :</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={name}
                  placeholder="Enter  name"
                  onChange={onChange}
                />
              </div>
              <div className="form-group mb-3">
                <label className="mb-2">Email :</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={email}
                  placeholder="Enter your name"
                  onChange={onChange}
                />
              </div>

              <div className="form-group mb-3">
                <label className="mb-2">Telephone :</label>
                <input
                  type="tel"
                  name="tel"
                  className="form-control"
                  value={tel}
                  placeholder="Enter your name"
                  onChange={onChange}
                />
              </div>

              <div className="form-group mb-3">
                <label className="mb-2">Adress :</label>
                <input
                  type="text"
                  name="adress"
                  className="form-control"
                  value={adress}
                  placeholder="Enter your name"
                  onChange={onChange}
                />
              </div>

              <div className="form-group mb-3">
                <label className="mb-2">Mot de passe :</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={password}
                  placeholder="Enter your name"
                  onChange={onChange}
                />
              </div>

              <div className="d-flex justify-content-center mb-2">
                <button
                  type="submit"
                  className="btn"
                  style={{ backgroundColor: "#005a81", color: "#fff" }}
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <Link to="/condidats">
            {" "}
            <a className="btn">
              <i className="fas fa-arrow-left me-2"></i> retour a la liste{" "}
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
export default AddCondidat;
