import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/useAuth';
import { getPostsByUserId } from '../api/post';
import { followUser, unfollowUser } from '../api/user';
import { toast } from 'react-toastify';
import Post from '../components/PostFeeds/Post';

function PersonalPage() {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const { userId: userInfoId } = useParams();
  const [posts, setPosts] = useState([]);
  const [order, setOrder] = useState('desc');
  const [searchValue, setSearchValue] = useState('');

  const handleGetPostsByUserId = async (order, searchValue) => {
    try {
      const res = await getPostsByUserId(userInfoId, order, searchValue);
      setUserInfo(res.data?.user);
      setPosts(res.data?.posts);
      console.log('handleGetPostsByUserId', res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowUser = async () => {
    try {
      const res = await followUser(userInfoId);
      toast.success(res.message);
      handleGetPostsByUserId(userInfoId);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleUnfollowUser = async () => {
    try {
      const res = await unfollowUser(userInfoId);
      toast.success(res.message);
      handleGetPostsByUserId(userInfoId);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSortChange = (event) => {
    const { value } = event.target;
    setOrder(value);
  };

  const handleSearch = () => {
    handleGetPostsByUserId(order, searchValue);
  };

  useEffect(() => {
    handleGetPostsByUserId(order, searchValue);
  }, [userInfoId, order]);

  return (
    <>
      <div className='rounded-lg relative bg-white border-2 border-black-custom mb-4 before:content-[""] before:rounded-lg before:absolute before:top-[8px] before:-left-[8px] before:w-full before:h-full before:border-black-custom before:z-[-1] before:bg-white before:border-2 flex'>
        <img
          src={userInfo?.avatar}
          alt={userInfo?.name}
          className='w-20 border-e-2 border-black-custom rounded-s-lg'
        />
        <div className='p-4 flex justify-between w-full items-center'>
          <div>
            <h2 className='text-xl font-bold'>{userInfo?.name}</h2>
            <p className='text-black-custom'>
              {userInfo?.followers?.length} 人追蹤
            </p>
          </div>
          <div>
            {user?._id !== userInfo?._id &&
              userInfo.followers &&
              (userInfo.followers.findIndex(
                (item) => item.user === user._id
              ) !== -1 ? (
                <button
                  className='bg-gray-custom-light text-black-custom px-4 py-2 rounded-lg button-shadow border-2 border-black-custom'
                  onClick={handleUnfollowUser}
                >
                  取消追蹤
                </button>
              ) : (
                <button
                  className='bg-yellow-custom text-black-custom px-4 py-2 rounded-lg button-shadow border-2 border-black-custom'
                  onClick={handleFollowUser}
                >
                  追蹤
                </button>
              ))}
          </div>
        </div>
      </div>
      <div className='flex gap-3 mb-4 flex-wrap md:flex-nowrap'>
        <div className='w-full md:w-4/12'>
          <select
            className='block w-full h-full border-2 border-black p-2 text-black-custom dark:border-neutral-200 dark:text-white/60'
            name='order'
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
          {posts.length > 0 &&
            posts.map((post) => <Post post={post} key={post._id} />)}
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

export default PersonalPage;
