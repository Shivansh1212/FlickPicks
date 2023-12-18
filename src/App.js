import Header from "./components/header";
import Cards from "./components/cards";
import AddMovie from "./components/addMovie";
import { Route, Routes } from "react-router-dom";
import Detail from "./components/detail";
import { createContext, useState } from "react";
import Login from "./components/login";
import Signup from "./components/signup"

const AppState = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <AppState.Provider value={{login, userName, setLogin, setUserName}}>
    <div className="App relative">
    <Header />
    <Routes>
      <Route path="/" element={<Cards/>}/>
      <Route path="/addmovie" element={<AddMovie />} />
      <Route path="/detail/:id" element={<Detail/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </div>
    </AppState.Provider>
  );
}

export default App;
export {AppState}