import { ToastContainer, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import 'animate.css';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import FrontLayout from './pages/FrontLayout';
import PostsFeed from './pages/PostsFeed';
import CreatePost from './pages/CreatePost';
import AuthLayout from './pages/AuthLayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { AuthProvider } from './context/AuthContext';

function App() {
  const bounce = cssTransition({
    enter: 'animate__animated animate__bounceIn',
    exit: 'animate__animated animate__bounceOut',
  });

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={bounce}
        stacked
      />
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<FrontLayout />}>
              <Route index element={<PostsFeed />} />
              <Route path='createPost' element={<CreatePost />} />
            </Route>
            <Route path='/auth' element={<AuthLayout />}>
              <Route path='login' element={<Login />} />
              <Route path='signUp' element={<SignUp />} />
            </Route>
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;
