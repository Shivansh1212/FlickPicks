import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AppState } from "../App";

const Header = () => {
  const useAppState = useContext(AppState);
  return (
    <div className="sticky z-10 header top-0 bg-black text-3xl flex font-bold p-3 border-b-2 border-gray-500 justify-between items-center text-red-500 ">
      <Link to={"/"}>
        <span>
          Flick<span className="text-white">Picks</span>
        </span>
      </Link>
      {useAppState.login ? (
        <Link to={"/addmovie"}>
          <h1 className="text-lg text-white flex items-center">
            <Button>
              <AddIcon className="mr-1" />{" "}
              <span className="text-white">Add New</span>
            </Button>
          </h1>
        </Link>
      ) : (
        <Link to={"/login"}>
          <h1 className="text-lg bg-green-500 text-white flex items-center">
            <Button>
              <span className="text-white font-medium capitalize">Login</span>
            </Button>
          </h1>
        </Link>
      )}
    </div>
  );
};

export default Header;
