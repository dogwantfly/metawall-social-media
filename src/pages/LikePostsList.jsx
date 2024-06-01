import { useEffect, useState } from 'react';
import { getLikeList } from '../api/user';
import { unLikePost } from '../api/post';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function LikePostsList() {
  const [likePosts, setLikePosts] = useState([]);
  const [isLoading, setIsLoading] = useState({
    like: false,
  });

  const handleGetLikeList = async () => {
    try {
      const res = await getLikeList();
      console.log('like list', res);
      setLikePosts(res.data?.likes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelLikePost = async (postId) => {
    try {
      setIsLoading((prevState) => ({
        ...prevState,
        like: true,
      }));
      const res = await unLikePost(postId);
      handleGetLikeList();
      toast.success('取消按讚成功');
      console.log('handleLike', res);
    } catch (error) {
      toast.error('取消按讚失敗');
      console.log(error);
    } finally {
      setIsLoading((prevState) => ({
        ...prevState,
        like: false,
      }));
    }
  };

  useEffect(() => {
    handleGetLikeList();
  }, []);

  return (
    <>
      <h2 className='relative text-center text-xl font-bold py-4 bg-white border-2 border-black-custom mb-4 before:content-[""] before:absolute before:top-[6px] before:-left-[6px] before:w-full before:h-full before:border-black-custom before:z-[-1] before:bg-white before:border-2'>
        我按讚的貼文
      </h2>
      <ul>
        {likePosts.length > 0 &&
          likePosts.map((item) => (
            <li
              key={item._id}
              className='p-4 border-2 border-black-custom text-black-custom bg-white rounded-lg card-shadow mb-4 pe-10'
            >
              <div className='flex items-end justify-between gap-4 flex-wrap'>
                <div className='flex items-center gap-x-4'>
                  <Link
                    to={{
                      pathname: `/personalPage/${item.user._id}`,
                      state: { userInfo: item.user },
                    }}
                  >
                    <img
                      src={item.user?.avatar}
                      alt={item.user?.name}
                      className='w-[45px] h-[45px] rounded-full border-2 border-black-custom'
                    />
                  </Link>

                  <div>
                    <Link
                      className='hover:text-blue-custom'
                      to={{
                        pathname: `/personalPage/${item.user._id}`,
                        state: { userInfo: item.user },
                      }}
                    >
                      <h3 className='font-bold'>{item.user.name}</h3>
                    </Link>
                    <div className='text-gray-custom-100 text-sm'>
                      {`發文時間：${new Date(item.createdAt).toLocaleString()}`}
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-x-9 justify-center w-full sm:w-auto'>
                  <button
                    type='button'
                    className='flex flex-col items-center group hover:text-blue-custom'
                    onClick={() => handleCancelLikePost(item._id)}
                    disabled={isLoading.like}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      className='size-6 stroke-blue-custom mb-1 group-hover:fill-blue-custom-light fill-none'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
                      />
                    </svg>
                    取消
                  </button>
                  <Link
                    to={`/post/${item._id}`}
                    className='flex flex-col items-center group hover:text-blue-custom'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      className='size-6 fill-none stroke-black-custom group-hover:fill-blue-custom-light mb-1 group-hover:stroke-black-custom'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                      />
                    </svg>
                    查看
                  </Link>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

export default LikePostsList;
