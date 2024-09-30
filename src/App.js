import {
  RouterProvider, 
  createBrowserRouter
} from 'react-router-dom';

import Home from './pages/Home';
import Books from './pages/Books';
import Login from './pages/Login';
import BookDetails from './pages/BookDetails';
import ErrorBoundary from './components/ErrorBoundary/error';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "books",
      element: <Books />,
    },
    {
      path: "book/:bookId",
      element: <BookDetails />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Login type={'signup'}/>,
    },
    {
      path: "reset-password",
      element: <Login type={'reset'}/>,
    },
  ]);
  
  return (
    <ErrorBoundary>
      <RouterProvider router={router}/>
    </ErrorBoundary>
  );
}

export default App;
