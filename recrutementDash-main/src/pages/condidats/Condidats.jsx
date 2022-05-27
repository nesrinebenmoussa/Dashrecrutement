import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import {
  getCondidats,
  reset,
} from "../../features/condidat/condidatSlice";
import Condidat from "./Condidat";

function Condidats() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { condidats } = useSelector((state) => state.condidats);
  const { isLoading, isError, message } = useSelector(
    (state) => state.condidats
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getCondidats())
      .unwrap()
      .then((data) => {
        console.log(data);
      });

    dispatch(reset())
  }, [user, navigate, dispatch]);
  
  if (isLoading) {
    return <Spinner />;
  }
else
  return (
    <>
 
 
      <div className="add-btn mb-4">
      <Link to="/addCondidat">
          <a
            className="btn"
            style={{
              backgroundColor: "#005a81",
              color: "#FFFFFF",
              fontWeight: "bold",
            }}
          >
         Ajouter nouveau condidat
          </a>
        </Link>
      </div>
<div className="row">
      
        {condidats.length > 0 ? (
          < >
            {condidats.map((c) => (
              <Condidat key={c._id} condidat={c} />
            ))}
          </>
        ) : (
          <h3>You have not any condidat</h3>
        )}
    
      </div>
    </>
  );
}

export default Condidats;
