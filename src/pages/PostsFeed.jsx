import { useState, useEffect } from 'react';
import { getPosts } from '../api/post';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import { Collapse, Dropdown, Ripple, initTWE } from 'tw-elements';

function PostsFeed() {
  const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState('desc');
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  }

  

  const handleSortChange = (event) => {
    const { value } = event.target;
    setOrder(value);
  };

  const handleGetPosts = async (order, searchValue) => {
    try {
      const res = await getPosts(order, searchValue);

      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    handleGetPosts(order, searchValue)
  }

  const breakLine = (content) => {
    return { __html: content.replace(/\n/g, '<br>') };
  };
  useEffect(() => {
    handleGetPosts(order, searchValue);
    
  }, [order, searchValue]);

  useEffect(() => {
    initTWE({ Collapse, Dropdown, Ripple });
  },[])
  return (
    <>
      <div className='flex gap-3 mb-4 flex-wrap md:flex-nowrap'>
        <div className='w-full md:w-4/12'>
          <select
            className='block w-full h-full border-2 border-black p-2 text-black-custom dark:border-neutral-200 dark:text-white/60'
            name="order"
            value={order}
            onChange={handleSortChange}
          >
            <option value='desc'>最新貼文</option>
            <option value='asc'>最舊貼文</option>
          </select>
        </div>
        <div className='w-full md:w-8/12'>
          <div className='relative flex flex-wrap items-stretch h-full'>
            <input
              type='search'
              className='relative m-0 block flex-auto border-2 border-black-custom bg-white bg-clip-padding p-3 text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-black-custom focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary'
              placeholder='搜尋貼文'
              aria-label='搜尋貼文'
              aria-describedby='basic-addon1'
              value={searchValue}
              onChange={handleSearchChange}
            />
            <button
              type='button'
              className='relative m-0 flex-none border-s-0 border-2 border-black-custom bg-blue-custom bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none hover:bg-blue-custom/80'
              onClick={handleSearch}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2.5}
                stroke='currentColor'
                className='w-6 h-6 text-white'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className='grid gap-4'>
          {posts.map((post) => (
            <div
              key={post._id}
              className='p-6 border-2 border-black-custom text-black-custom bg-white rounded-lg card-shadow'
            >
              {post.user && (
                <div className='flex items-center gap-4 mb-4'>
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className='w-[45px] h-[45px] rounded-full border-2 border-black-custom'
                  />
                  <div>
                    <h3 className='font-bold'>{post.user.name}</h3>
                    <div className='text-neutral-500 text-sm'>
                      {new Date(post.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
              <div
                className='mb-4'
                dangerouslySetInnerHTML={breakLine(post.content)}
              ></div>

              {post.image && (
                <img
                  src={post.image}
                  alt='image'
                  className='border-2 border-black-custom rounded-lg'
                />
              )}

              <div className="flex">
                <button type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                  </svg>
                </button>
                {post.likes.length > 0 && post.likes.length}
              </div>

              {/* <div>
                {post.tags &&
                  post.tags.map((tag) => <div key={tag}>{tag}</div>)}
              </div> */}
            </div>
          ))}
        </div>
      ) : (
        <div className='border-2 border-black-custom text-center text-neutral-500 bg-white rounded-lg card-shadow'>
          <div className='border-b-2 border-black-custom p-4'>
            <div className='flex items-center gap-1.5'>
              <div className='bg-[#DE4B63] rounded-full w-[10px] h-[10px] border border-[#707070]'></div>
              <div className='bg-[#FAA722] rounded-full w-[10px] h-[10px] border border-[#707070]'></div>
              <div className='bg-[#83C51D] rounded-full w-[10px] h-[10px] border border-[#707070]'></div>
            </div>
          </div>
          <div className='p-8'>目前尚無動態，新增一則貼文吧！</div>
        </div>
      )}
    </>
  );
}

export default PostsFeed;
