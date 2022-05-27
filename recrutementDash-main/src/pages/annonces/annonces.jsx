import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../../components/Spinner";
import { getAll, reset } from "../../features/annonce/annonceSlice";

import { Link } from "react-router-dom";
import Annonce from "./annonce";

function Annonces() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { annonces, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.annonces
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // if (isSuccess || !user) {
    //   navigate("/login");
    // }
    dispatch(getAll());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className='add-btn mb-4'>
        <Link to='/createAnnonce'>
          <a
            className='btn'
            style={{
              backgroundColor: "#005a81",
              color: "#FFFFFF",
              fontWeight: "bold",
            }}>
            Ajouter nouveau annonce
          </a>
        </Link>
      </div>
      <h1>annonces</h1>
      {annonces.length > 0 ? (
        <div className='row'>
          {annonces.map((an) => (
            <Annonce annonce={an} />
          ))}
        </div>
      ) : (
        <h3>You have not set any annonces</h3>
      )}
    </>
  );
}

export default Annonces;
