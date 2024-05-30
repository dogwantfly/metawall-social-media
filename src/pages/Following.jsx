import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserFollowing } from '../api/user';

function Following() {
  const [followList, setFollowList] = useState([]);
  const handleUserFollowing = async () => {
    try {
      const res = await getUserFollowing();
      console.log('following list',res);
      setFollowList(res.data?.following);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleUserFollowing();
  }, []);
  return (
    <>
      <h2 className='relative text-center text-xl font-bold py-4 bg-white border-2 border-black-custom mb-4 before:content-[""] before:absolute before:top-[6px] before:-left-[6px] before:w-full before:h-full before:border-black-custom before:z-[-1] before:bg-white before:border-2'>
        追蹤名單
      </h2>
    
      <ul className=''>
        {followList.length > 0 && followList.map((item) => (


        <li
              key={item._id}
              className='p-6 border-2 border-black-custom text-black-custom bg-white rounded-lg card-shadow mb-4'
            >
              <div className='flex items-center gap-4 mb-4 hover:text-blue-custom'>
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
                    <div className='text-neutral-500 text-sm'>
                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
        </li>))}
        </ul>
    </>
  );
}

export default Following;