import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"

import "./server.js"
import Vans from "./pages/Vans.js"
import VanDetail from "./pages/VanDetail.js"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVansAsync } from "./features/vans/vansAction.js";
import { AppDispatch, RootState } from "./store";

function App() {

  const vansState = useSelector((state: RootState) => state.vans);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchVansAsync());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <header>
        <Link className="site-logo" to="/">#VanLife</Link>
        <nav>
          <Link to="/about">About</Link>
          <Link to="/vans">Vans</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/vans" element={<Vans vansState={vansState}/>}></Route>
        <Route path="/vans/:id" element={<VanDetail/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
