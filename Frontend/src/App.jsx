import React from 'react'
import User from './Components/User';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Adduser from './addUser/Adduser';
import Updateuser from './updateUser/Updateuser';

const App = () => {

    const route= createBrowserRouter([{
        path: "/",
        element: <User/>
    },{
        path: "/adduser",
        element: <Adduser/>
    },{
        path: "/User",
        element: <User/>
    },
{
    path: "/updateuser/:id",
    element: <Updateuser/>
}
])
      

  return (
    <>
    
     <RouterProvider router={route} />
    </>
  )
}

export default App