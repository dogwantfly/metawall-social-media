import { useEffect, useContext } from 'react';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import { Collapse, Dropdown, initTWE } from 'tw-elements';
import { Link, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { getAuthToken } from '../context/AuthUtils';
import { AuthContext } from '../context/useAuth';

function FrontLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    initTWE({ Collapse, Dropdown });
  }, []);

  useEffect(() => {
    const authToken = getAuthToken();
    if (!authToken) {
      navigate('/auth/login');
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' />;
  }

  return (
    <>
      <nav className='flex-no-wrap relative flex w-full items-center justify-between bg-white py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4 border-b-[3px] border border-black-custom'>
        <div className='container flex w-full flex-wrap items-center justify-between px-3 mx-auto'>
          <div
            className='!visible flex-grow items-center lg:!flex'
            id='navbarSupportedContent1'
            data-twe-collapse-item
          >
            <a
              className='mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0 font-family-paytone-one text-[26px]'
              href='#'
            >
              Metawall
            </a>
          </div>
          <div className='relative flex'>
            <div
              className='relative'
              data-twe-dropdown-ref
              data-twe-dropdown-alignment='end'
            >
              <a
                className='flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none border-2 border-black rounded-full'
                href='#'
                id='dropdownMenuButton2'
                role='button'
                data-twe-dropdown-toggle-ref
                aria-expanded='false'
              >
                <img
                  src={
                    user?.avatar ||
                    'https://tecdn.b-cdn.net/img/new/avatars/2.jpg'
                  }
                  className='rounded-full'
                  alt=''
                  loading='lazy'
                  style={{ height: '25px', width: '25px' }}
                />
              </a>
            </div>
            <div
              className='relative border-b-2 border-black-custom ms-2.5'
              data-twe-dropdown-ref
              data-twe-dropdown-alignment='end'
            >
              <a
                className='text-black-custom dark:text-white font-azeret-mono font-bold leading-6 block px-1'
                href='#'
                id='dropdownMenuButton1'
                role='button'
                data-twe-dropdown-toggle-ref
                aria-expanded='false'
              >
                {user?.name || 'Member'}
              </a>
              <ul
                className="absolute z-[1000] m-0 hidden md:min-w-max list-none bg-white text-left text-base data-[twe-dropdown-show]:block divide-y-2 divide-black-custom  before:content-[''] before:absolute before:top-[6px] before:right-[-6px] before:w-full before:h-full before:border-black-custom before:z-[-10] before:bg-white before:border-2"
                aria-labelledby='dropdownMenuButton1'
                data-twe-dropdown-menu-ref
              >
                <li>
                  <Link
                    className='block w-full whitespace-nowrap bg-white px-4 py-2 font-normal text-black-custom hover:bg-gray-custom-light focus:bg-gray-custom-light focus:outline-none active:bg-gray-custom-light active:no-underline border-2 border-black-custom border-b-0'
                    to={{
                      pathname: `/personalPage/${user?._id}`,
                      state: { userId: user?._id },
                    }}
                    data-twe-dropdown-item-ref
                  >
                    我的貼文牆
                  </Link>
                </li>
                <li>
                  <Link
                    className='block w-full whitespace-nowrap bg-white px-4 py-2 font-normal text-black-custom hover:bg-gray-custom-light focus:bg-gray-custom-light focus:outline-none active:bg-gray-custom-light active:no-underline border-x-2 border-black-custom'
                    to='/profileUpdate'
                    data-twe-dropdown-item-ref
                  >
                    修改個人資料
                  </Link>
                </li>
                <li>
                  <button
                    type='button'
                    className='block w-full whitespace-nowrap bg-white px-4 py-2 font-normal text-black-custom hover:bg-gray-custom-light focus:bg-gray-custom-light focus:outline-none active:bg-gray-custom-light active:no-underline border-2 border-black-custom border-t-0'
                    data-twe-dropdown-item-ref
                    onClick={logout}
                  >
                    登出
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <main className='container py-[48.5px]'>
        <div className='flex -mx-3 flex-wrap'>
          <div className='w-full md:w-8/12 px-3'>
            <Outlet />
          </div>
          <div className='hidden md:block w-full md:w-4/12 px-3'>
            <div className='border-2 border-black-custom bg-white p-8'>
              <Link
                to='/createPost'
                className='block w-full text-center text-white bg-blue-custom hover:bg-yellow-custom hover:text-black-custom focus:bg-yellow-custom focus:outline-none focus:ring-0 focus:text-black-custom active:bg-yellow-custom/80 active:no-underline active:text-black-custom py-4 border-2 border-black-custom rounded-lg button-shadow mb-6'
              >
                張貼動態
              </Link>
              <ul className='grid gap-4'>
                <li>
                  <Link
                    to={{
                      pathname: `/personalPage/${user?._id}`,
                      state: { userId: user?._id },
                    }}
                    className='flex items-center gap-4 font-bold hover:text-blue-custom hover:ease-in-out focus:text-blue-custom active:text-blue-custom'
                  >
                    <img
                      src={
                        user?.avatar ||
                        'https://tecdn.b-cdn.net/img/new/avatars/2.jpg'
                      }
                      className='block border-2 border-black rounded-full'
                      alt={user?.name}
                      loading='lazy'
                      style={{ height: '50px', width: '50px' }}
                    />
                    {user?.name || '邊緣小杰'}
                  </Link>
                </li>
                <li>
                  <Link
                    to='/following'
                    className='flex items-center gap-4 font-bold hover:text-blue-custom hover:ease-in-out focus:text-blue-custom active:text-blue-custom group'
                  >
                    <div
                      className='border-2 border-black rounded-full bg-blue-custom-light flex items-center justify-center group-hover:bg-blue-custom'
                      style={{ height: '50px', width: '50px' }}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={2.5}
                        stroke='currentColor'
                        className='w-6 h-6 group-hover:stroke-white'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0'
                        />
                      </svg>
                    </div>
                    追蹤名單
                  </Link>
                </li>
                <li>
                  <Link
                    to='/likePostsList'
                    className='flex items-center gap-4 font-bold hover:text-blue-custom hover:ease-in-out focus:text-blue-custom active:text-blue-custom group'
                  >
                    <div
                      className='border-2 border-black rounded-full bg-blue-custom-light flex items-center justify-center group-hover:bg-blue-custom'
                      style={{ height: '50px', width: '50px' }}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={2.5}
                        stroke='currentColor'
                        className='w-6 h-6 group-hover:stroke-white'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
                        />
                      </svg>
                    </div>
                    我按讚的文章
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <div className='fixed rounded-full bg-gray-custom-light bottom-0 md:hidden w-full px-3 border-2 border-black-custom'>
        <div className='py-2 flex justify-center items-center gap-4'>
          <Link
            to='/createPost'
            className='rounded-full flex items-center justify-center text-center text-white bg-blue-custom hover:bg-yellow-custom hover:text-black-custom focus:bg-yellow-custom focus:outline-none focus:ring-0 focus:text-black-custom active:bg-yellow-custom/80 active:no-underline active:text-black-custom py-4 border-2 border-black-custom button-shadow'
            style={{ height: '50px', width: '50px' }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              strokeWidth={2.5}
              className='size-6 stroke-white'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 4.5v15m7.5-7.5h-15'
              />
            </svg>
          </Link>
          <Link
            to={{
              pathname: `/personalPage/${user?._id}`,
              state: { userId: user?._id },
            }}
            className='rounded-full flex items-center gap-4 font-bold hover:text-blue-custom hover:ease-in-out focus:text-blue-custom active:text-blue-custom'
          >
            <Link
              to='/likePostsList'
              className='flex items-center gap-4 font-bold hover:text-blue-custom hover:ease-in-out focus:text-blue-custom active:text-blue-custom group'
            >
              <div
                className='border-2 border-black rounded-full bg-blue-custom-light flex items-center justify-center group-hover:bg-blue-custom'
                style={{ height: '50px', width: '50px' }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2.5}
                  stroke='currentColor'
                  className='w-6 h-6 group-hover:stroke-white'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
                  />
                </svg>
              </div>
            </Link>
          </Link>

          <Link
            to='/following'
            className='flex items-center gap-4 font-bold hover:text-blue-custom hover:ease-in-out focus:text-blue-custom active:text-blue-custom group'
          >
            <div
              className='border-2 border-black rounded-full bg-blue-custom-light flex items-center justify-center group-hover:bg-blue-custom'
              style={{ height: '50px', width: '50px' }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2.5}
                stroke='currentColor'
                className='w-6 h-6 group-hover:stroke-white'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0'
                />
              </svg>
            </div>
          </Link>
          <Link
            to='/likePostsList'
            className='flex items-center gap-4 font-bold hover:text-blue-custom hover:ease-in-out focus:text-blue-custom active:text-blue-custom group'
          >
            <div
              className='border-2 border-black rounded-full bg-blue-custom-light flex items-center justify-center group-hover:bg-blue-custom'
              style={{ height: '50px', width: '50px' }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2.5}
                stroke='currentColor'
                className='w-6 h-6 group-hover:stroke-white'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default FrontLayout;
