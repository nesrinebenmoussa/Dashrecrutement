import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { unwrapResult } from "@reduxjs/toolkit";
 

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
  

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData))
      .unwrap()
      .then((data) => {
        navigate("/");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div
        className='p-3'
        style={{ backgroundColor: "#EFEFEF", height: "100vh" }}>
        <div
          className='d-flex justify-content-center mb-2'
          style={{ height: "180px" }}>
          <img
            src='../assets/undraw_welcome_cats_thqn.svg'
            alt=''
            width='100%'
          />
        </div>

        <div className='container-fluid'>
          <div className='d-flex justify-content-center'>
            <form className='col-lg-4 col-md-6 col-xs-12'>
              <div className='text-center'>
                <img
                  src='../assets/undraw_profile_pic_ic-5-t.svg'
                  alt='avatar'
                  width='100px'
                />
              </div>
              <hr />
              <div className='form-group mb-3'>
                <label className='mb-2'>Identifiant :</label>
                <input
                  className='form-control'
                  type='email'
                  id='email'
                  name='email'
                  value={email}
                  placeholder='Enter your email'
                  onChange={onChange}
                />
              </div>
              <div className='form-group mb-3'>
                <label className='mb-2'>Mot de passe :</label>
                <input
                  className='form-control'
                  type='password'
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Enter password'
                  onChange={onChange}
                />
              </div>
              <div className='d-flex justify-content-center mb-3'>
                <button
                  type='submit'
                  className='btn'
                  style={{ backgroundColor: "#FF3B3F", color: "#fff" }}
                  onClick={onSubmit}>
                  Connexion
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
