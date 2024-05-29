import { useEffect } from 'react';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import { Collapse, Dropdown, initTWE } from 'tw-elements';
import { Link, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { getAuthToken } from '../context/AuthUtils';

function FrontLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
      <nav className='flex-no-wrap relative flex w-full items-center justify-between bg-white py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4 border-b-[3px] border border-[#000400]'>
        <div className='container flex w-full flex-wrap items-center justify-between px-3 mx-auto'>
          <button
            className='block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden'
            type='button'
            data-twe-collapse-init
            data-twe-target='#navbarSupportedContent1'
            aria-controls='navbarSupportedContent1'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
          </button>
          <div
            className='!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto'
            id='navbarSupportedContent1'
            data-twe-collapse-item
          >
            <a
              className='mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0 font-family-paytone-one text-[26px]'
              href='#'
            >
              Metawall
            </a>
            {/* <ul
              className="list-style-none me-auto flex flex-col ps-0 lg:flex-row"
              data-twe-navbar-nav-ref>
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <a
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  href="#"
                  data-twe-nav-link-ref
                  >Dashboard
                  </a>
              </li>
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <a
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  href="#"
                  data-twe-nav-link-ref
                  >Team
                  </a>
              </li>
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <a
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  href="#"
                  data-twe-nav-link-ref
                  >Projects
                  </a>
              </li>
            </ul> */}
          </div>
          <div className='relative flex'>
            {/* <a className="me-4 text-neutral-600 dark:text-white" href="#">
              <span className="[&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path
                    d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </span>
            </a> */}
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
                  src='https://tecdn.b-cdn.net/img/new/avatars/2.jpg'
                  className='rounded-full'
                  alt=''
                  loading='lazy'
                  style={{ height: '25px', width: '25px' }}
                />
              </a>

              <ul
                className='absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark'
                aria-labelledby='dropdownMenuButton2'
                data-twe-dropdown-menu-ref
              >
                <li>
                  <a
                    className='block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25'
                    href='#'
                    data-twe-dropdown-item-ref
                  >
                    Action
                  </a>
                </li>
                <li>
                  <a
                    className='block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25'
                    href='#'
                    data-twe-dropdown-item-ref
                  >
                    Another action
                  </a>
                </li>
                <li>
                  <a
                    className='block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25'
                    href='#'
                    data-twe-dropdown-item-ref
                  >
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <div
              className='relative border-b-2 border-[#000400] ms-2.5'
              data-twe-dropdown-ref
              data-twe-dropdown-alignment='end'
            >
              <a
                className='text-[#000400] dark:text-white font-azeret-mono font-bold leading-6 block px-1'
                href='#'
                id='dropdownMenuButton1'
                role='button'
                data-twe-dropdown-toggle-ref
                aria-expanded='false'
              >
                Member
              </a>

              <ul
                className='absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark'
                aria-labelledby='dropdownMenuButton1'
                data-twe-dropdown-menu-ref
              >
                <li>
                  <a
                    className='block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25'
                    href='#'
                    data-twe-dropdown-item-ref
                  >
                    Action
                  </a>
                </li>
                <li>
                  <a
                    className='block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25'
                    href='#'
                    data-twe-dropdown-item-ref
                  >
                    Another action
                  </a>
                </li>
                <li>
                  <a
                    className='block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25'
                    href='#'
                    data-twe-dropdown-item-ref
                  >
                    Something else here
                  </a>
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
                className='block w-full text-center text-white bg-blue-custom hover:bg-blue-custom/80 focus:bg-blue-custom/80 focus:outline-none focus:ring-0 active:bg-blue-custom/80 active:no-underline py-4 border-2 border-black-custom rounded-lg button-shadow mb-6'
              >
                張貼動態
              </Link>
              <ul className='grid gap-4'>
                <li>
                  <Link
                    to='/'
                    className='flex items-center gap-4 font-bold hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80'
                  >
                    <img
                      src='https://tecdn.b-cdn.net/img/new/avatars/2.jpg'
                      className='block border-2 border-black rounded-full'
                      alt=''
                      loading='lazy'
                      style={{ height: '50px', width: '50px' }}
                    />
                    邊緣小杰
                  </Link>
                </li>
                <li>
                  <Link
                    to='/'
                    className='flex items-center gap-4 font-bold hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80'
                  >
                    <div
                      className='border-2 border-black rounded-full bg-blue-custom-light flex items-center justify-center'
                      style={{ height: '50px', width: '50px' }}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={2.5}
                        stroke='currentColor'
                        className='w-6 h-6'
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
                    to='/'
                    className='flex items-center gap-4 font-bold hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80'
                  >
                    <div
                      className='border-2 border-black rounded-full bg-blue-custom-light flex items-center justify-center'
                      style={{ height: '50px', width: '50px' }}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={2.5}
                        stroke='currentColor'
                        className='w-6 h-6'
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
    </>
  );
}

export default FrontLayout;
