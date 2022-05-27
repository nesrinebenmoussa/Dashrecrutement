import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { getRecruters , reset} from "../../features/recruter/recruterSlice";
import Recruter from "./Recruter";

function Recruters() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { recruters } = useSelector((state) => state.recruters);
  const { isLoading, isError, message } = useSelector(
    (state) => state.recruters
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getRecruters())
      .unwrap()
      .then((data) => {
        console.log(data);
      });

    dispatch(reset())
  }, [user, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  } else
    return (
      <>
        <div className='add-btn mb-4'>
          <Link to='/addRecruter'>
            <a
              className='btn'
              style={{
                backgroundColor: "#005a81",
                color: "#FFFFFF",
                fontWeight: "bold",
              }}>
              Ajouter nouveau recruter
            </a>
          </Link>
        </div>
        <div className='row'>
          {recruters.length > 0 ? (
            <>
              {recruters?.map((r) => (
                <Recruter key={r._id} recruter={r} />
              ))}
            </>
          ) : (
            <h3>You have not any recruter</h3>
          )}
        </div>
      </>
    );
}

export default Recruters;
