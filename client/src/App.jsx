import { createBrowserRouter , RouterProvider } from "react-router-dom"
import { Home , CaptainLogin , CaptainSignup , UserLogin , UserSignup } from "./pages/index";


const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<UserLogin/>
  },
  {
    path:"/signup",
    element:<UserSignup/>
  },
  {
    path:"/captain-login",
    element:<CaptainLogin/>
  },
  {
    path:"/captain-signup",
    element:<CaptainSignup/>
  },
])


function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
