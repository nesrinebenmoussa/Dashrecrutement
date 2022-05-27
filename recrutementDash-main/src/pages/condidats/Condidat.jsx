import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  deleteCondidat,
  getCondidats,
  changeStatus,
} from "../../features/condidat/condidatSlice";
import { toast } from "react-toastify";
import { FaEye,    FaLock  , FaUnlock} from "react-icons/fa";

function Condidat({ condidat }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { condidats, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.condidats
  );

  useEffect(() => {}, [
    condidats,
    isError,
    isSuccess,
    message,
    navigate,
    dispatch,
  ]);

  const consulter = () => {
    navigate(`/condidats/${condidat._id}`);
  };

  const changeCStatus = () => {
    dispatch(changeStatus(condidat._id))
      .unwrap()
      .then((data) => {
        {
          condidat.active
            ? toast.success("Condidat disabled")
            : toast.success("Condidat enabled");
        }

        dispatch(getCondidats());
      })
      .catch((err) => toast.error(err));
  };
  return (
    <>
      <div className='col-sm-4 mb-2 '>
        <div class='card ' style={{ width: "18rem", backgroundColor: "#ddd" }}>
          <div className='card-body text-dark'>
            <h5 className='card-title '> {condidat.name}</h5>
            <h6 className='card-subtitle mb-2 '> {condidat.email}</h6>
            <p class='card-text'>
              {new Date(condidat.createdAt).toLocaleString("en-US")}
            </p>
            <button
              type='submit'
              className='btn card-link'
              onClick={changeCStatus}
              style={{ backgroundColor: "#005a81", color: "#fff" }}>
              {condidat.active ? "  Disable " : "  Enable "}
              {condidat.active ? <FaLock /> : <FaUnlock />}
            </button>
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

export default Condidat;
