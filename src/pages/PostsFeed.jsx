import { useState, useEffect } from 'react';
import { getPosts } from '../api/post';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import {
  Collapse,
  Dropdown,
  initTWE,
} from "tw-elements";



function PostsFeed() {
  const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const handleGetPosts = async () => {
    try {
      const res = await getPosts();
      console.log(res.data);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const breakLine = (content) => {
    return { __html: content.replace(/\n/g, '<br>') };
  };
  useEffect(() => {
    handleGetPosts();
    initTWE({ Collapse, Dropdown });
  }, []);
  return (
    <>
      <nav
        className="flex-no-wrap relative flex w-full items-center justify-between bg-white py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4 border-b-[3px] border border-[#000400]">
        <div className="container flex w-full flex-wrap items-center justify-between px-3 mx-auto">
          <button
            className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-twe-collapse-init
            data-twe-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span
              className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd" />
              </svg>
            </span>
          </button>
          <div
            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-twe-collapse-item>
            <a
              className="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0 font-family-paytone-one text-[26px]"
              href="#">
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
          <div className="relative flex items-center">
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
              className="relative"
              data-twe-dropdown-ref
              data-twe-dropdown-alignment="end">
         
              <a
                className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none border-2 border-black rounded-full"
                href="#"
                id="dropdownMenuButton2"
                role="button"
                data-twe-dropdown-toggle-ref
                aria-expanded="false">
        
                <img
                  src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                  className="rounded-full"
                  alt=""
                  loading="lazy"
                  style={{ height:'25px', width: '25px'}}
                  />
              </a>
      
              <ul
                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                aria-labelledby="dropdownMenuButton2"
                data-twe-dropdown-menu-ref>
         
                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                    href="#"
                    data-twe-dropdown-item-ref
                    >Action</a
                  >
                </li>
                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                    href="#"
                    data-twe-dropdown-item-ref
                    >Another action</a
                  >
                </li>
                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                    href="#"
                    data-twe-dropdown-item-ref
                    >Something else here</a
                  >
                </li>
              </ul>
            </div>
            <div
              className="relative"
              data-twe-dropdown-ref
              data-twe-dropdown-alignment="end">
              <a
                className="me-4 flex items-center text-neutral-600 dark:text-white font-azeret-mono font-bold ms-2.5"
                href="#"
                id="dropdownMenuButton1"
                role="button"
                data-twe-dropdown-toggle-ref
                aria-expanded="false">
                Member
              </a>
          
              <ul
                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                aria-labelledby="dropdownMenuButton1"
                data-twe-dropdown-menu-ref>
          
                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                    href="#"
                    data-twe-dropdown-item-ref
                    >Action</a
                  >
                </li>
                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                    href="#"
                    data-twe-dropdown-item-ref
                    >Another action</a
                  >
                </li>
                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                    href="#"
                    data-twe-dropdown-item-ref
                    >Something else here</a
                  >
                </li>
              </ul>
            </div>

     
            
          </div>
 
        </div>
      </nav>
      <div>
        { posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id}>
                {post.user && (
                  <div>
                    <img src={post.user.avatar} alt='avatar' />
                    <div>{post.user.name}</div>
                  </div>
                )}
                <div dangerouslySetInnerHTML={breakLine(post.content)}></div>
                {post.image && <img src={post.image} alt='image' /> }
                <div>
                  {post.tags && post.tags.map((tag) => <div key={tag}>{tag}</div>)}
                </div>
              </div>
            ))
          ) : (
            <div>目前尚無動態，新增一則貼文吧！</div>
          )
        }
      </div>
    </>
  );
}

export default PostsFeed;
