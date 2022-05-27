import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../components/Spinner";

import { reset } from "../features/auth/authSlice";
import SideBar from "./SideBar";
import Header from "../components/Header";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user  } = useSelector((state) => state.auth);
  
 

  useEffect(() => {
  

    if (!user) {
      navigate("/login");
    }



    return () => {
      dispatch(reset());
    };
  }, [
    user,
    navigate,
    dispatch,
 
  ]);

 

  return (
    <>  
<input type="checkbox" id="nav-toggle" />
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main-content">
 
        <Header />
        <main>
          <Outlet />
        </main> 
      </div>
    </>

 
 
  );
}

export default Dashboard;
