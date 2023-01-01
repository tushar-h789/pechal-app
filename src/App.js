import Regristration from "./pages/Regristration";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";

let router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Regristration />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Route>
  ) 
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
