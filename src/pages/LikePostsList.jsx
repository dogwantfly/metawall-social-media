import { useEffect, useState } from 'react';
import { getLikeList } from '../api/user';
import { Link } from 'react-router-dom';

function LikePostsList() {
  const [likePosts, setLikePosts] = useState([]);
  const handleGetLikeList = async () => {
    try {
      const res = await getLikeList();
      console.log('like list', res);
      setLikePosts(res.data?.likes);
    } catch (error) {
      console.log(error);
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
              className='p-4 border-2 border-black-custom text-black-custom bg-white rounded-lg card-shadow mb-4'
            >
              <div className='flex items-end justify-between gap-4'>
                <div className='flex items-center gap-x-4'>
                  <Link>
                    <img
                      src={item.user?.avatar}
                      alt={item.user?.name}
                      className='w-[45px] h-[45px] rounded-full border-2 border-black-custom'
                    />
                  </Link>

                  <div>
                    <Link className='hover:text-blue-custom'>
                      <h3 className='font-bold'>{item.user.name}</h3>
                    </Link>
                    <div className='text-gray-custom-100 text-sm'>
                      {`追蹤時間：${new Date(item.createdAt).toLocaleString()}`}
                    </div>
                  </div>
                </div>
               
              </div>
            </li>
          ))}
      </ul>
  </>)
}

export default LikePostsList;