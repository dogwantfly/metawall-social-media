import { ToastContainer, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import 'animate.css';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PostsFeed from './pages/PostsFeed';
import CreatePost from './pages/CreatePost';

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
        <Routes>
          <Route path='/' element={<PostsFeed />} />
          <Route path='/createPost' element={<CreatePost />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
