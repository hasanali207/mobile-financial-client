import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Components/Home";
import Register from "../Components/Register";
import Login from "../Components/Login";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "../Private/PrivateRoute";
import SendMoneyForm from "../Dashboard/User/SendMoneyForm";
import CashOutForm from "../Dashboard/User/CashOutForm";

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
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {   
                path:'profile',
                element:  <h1>Hello</h1>
            },
            {   
                path:'sendMoney',
                element:  <SendMoneyForm></SendMoneyForm>
            },
            {   
                path:'cashout',
                element:  <CashOutForm></CashOutForm>
            },
]}
  ]);
  export default router;