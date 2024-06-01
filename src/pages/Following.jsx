import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserFollowing } from '../api/user';
import dayjs from 'dayjs';

function Following() {
  const [followList, setFollowList] = useState([]);
  const handleUserFollowing = async () => {
    try {
      const res = await getUserFollowing();
      console.log('following list', res);
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

      <ul>
        {followList.length > 0 &&
          followList.map((item) => (
            <li
              key={item._id}
              className='p-4 border-2 border-black-custom text-black-custom bg-white rounded-lg card-shadow mb-4'
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
                      {`追蹤時間：${new Date(item.createdAt).toLocaleString()}`}
                    </div>
                  </div>
                </div>
                <p>{`您已追蹤 ${dayjs().diff(item.createdAt, 'day')} 天！`}</p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Following;
