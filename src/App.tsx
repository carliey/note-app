import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import ViewNote from "./pages/ViewNote";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/:id">
        <Route index element={<ViewNote />} />
        <Route path="edit" element={<h1>edit</h1>} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
