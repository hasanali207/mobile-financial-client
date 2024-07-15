import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Components/Home";
import Register from "../Components/Register";
import Login from "../Components/Login";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
        },
        {
            path: "/login",
            element: <Login></Login>,

        },
        {
            path: "/register",
            element: <Register></Register>
        },
    ]
    },
  ]);
  export default router;