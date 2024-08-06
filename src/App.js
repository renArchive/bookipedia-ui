import {
  RouterProvider, 
  createBrowserRouter
} from 'react-router-dom';

import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import Login from './pages/Login';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/books",
      element: <Catalogue />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Login type={'signup'}/>,
    },
    {
      path: "/reset-password",
      element: <Login type={'reset'}/>,
    },
  ]);
  
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
