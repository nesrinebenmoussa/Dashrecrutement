import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getRecruters,
  changeStatus,
} from "../../features/recruter/recruterSlice";
import { FaEye, FaLock, FaUnlock } from "react-icons/fa";

import { toast } from "react-toastify";

function Recruter({ recruter }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { recruters, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.recruters
  );

  useEffect(() => {}, [
    recruters,
    isError,
    isSuccess,
    message,
    navigate,
    dispatch,
  ]);

  const consulter = () => {
    navigate(`/recruters/${recruter._id}`);
  };

  const changeRStatus = () => {
    dispatch(changeStatus(recruter._id))
      .unwrap()
      .then((data) => {
        {
          recruter.status
            ? toast.success("Recruter disabled")
            : toast.success("Recruter enabled");
        }

        dispatch(getRecruters());
      })
      .catch((err) => toast.error(err));
  };

  return (
    <>
      <div className='col-sm-4 mb-2 '>
        <div class='card ' style={{ width: "18rem", backgroundColor: "#ddd" }}>
          <div className='card-body text-dark'>
            <h5 className='card-title '> {recruter.name}</h5>
            <h6 className='card-subtitle mb-2 '> {recruter.email}</h6>
            <p class='card-text'>
              {new Date(recruter.createdAt).toLocaleString("en-US")}
            </p>
            <button
              type='submit'
              className='btn card-link'
              onClick={changeRStatus}
              style={{ backgroundColor: "#005a81", color: "#fff" }}>
              {recruter.status ? "  Disable " : "  Enable "}
              {recruter.status ? <FaLock /> : <FaUnlock />}
            </button>
            <button
              type='submit'
              className='btn card-link'
              style={{ backgroundColor: "#005a81", color: "#fff" }}
              onClick={consulter}>
              Consutlter <FaEye />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recruter;
