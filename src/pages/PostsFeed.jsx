import { useState, useEffect } from 'react';
import { getPosts } from '../api/post';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import { Collapse, Dropdown, Ripple, initTWE } from 'tw-elements';

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
    initTWE({ Collapse, Dropdown, Ripple });
  }, []);
  return (
    <>
      <div className='flex gap-3 mb-4 flex-wrap md:flex-nowrap'>
        <div className='w-full md:w-4/12'>
          <select
            className='block w-full h-full border-2 border-black p-2 text-black-custom dark:border-neutral-200 dark:text-white/60'
            defaultValue='1'
          >
            <option value='1'>最新貼文</option>
            <option>選擇一個</option>
            <option>选择一個</option>
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
            />
            <button
              type='button'
              className='relative m-0 flex-none border-s-0 border-2 border-black-custom bg-blue-custom bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none hover:bg-blue-custom/80'
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
