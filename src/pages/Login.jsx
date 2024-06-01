import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema as schema } from '../type/schema';
import { AuthContext } from '../context/useAuth';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Login() {
  const { handleLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    await handleLogin(data.email, data.password);
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className='flex justify-center items-center bg-opacity-50 bg-gray-custom absolute top-0 left-0 w-full h-full z-10'>
          <div className='flex justify-center'>
            <Skeleton
              circle={true}
              count={3}
              containerClassName='flex-1'
              height={50}
              width={50}
              inline={true}
              style={{ marginRight: '0.5rem' }}
            />
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-2xl font-bold text-center mb-9'>
          到元宇宙展開全新社交圈
        </h2>
        <div className='relative mb-4'>
          <input
            type='email'
            className='peer block min-h-[auto] w-full border-2 border-black-custom bg-white px-6 py-4 leading-[1.6] outline-none transition-all duration-200 ease-linear font-azeret-mono focus:placeholder:opacity-100 peer-focus:text-black-custom data-[twe-input-state-active]:placeholder:opacity-100 placeholder:font-azeret-mono'
            id='email'
            placeholder='Email'
            {...register('email')}
          />
          <p className='text-red-custom mb-2'>{errors.email?.message}</p>
        </div>

        <div className='relative mb-8'>
          <input
            type='password'
            className='peer block min-h-[auto] w-full border-2 border-black-custom bg-white px-6 py-4 leading-[1.6] outline-none transition-all duration-200 ease-linear font-azeret-mono focus:placeholder:opacity-100 peer-focus:text-black-custom data-[twe-input-state-active]:placeholder:opacity-100 placeholder:font-azeret-mono'
            id='password'
            placeholder='Password'
            {...register('password')}
          />
          <p className='text-red-custom mb-2'>{errors.password?.message}</p>
        </div>
        <div className={!isValid ? 'cursor-not-allowed' : ''}>
          <button
            type='submit'
            className={`w-full rounded border-2 button-shadow py-4 font-azeret-mono font-medium uppercase leading-normal text-white transition duration-150 ease-in-out mb-4 ${
              !isValid
                ? 'bg-gray-custom border-gray-custom-dark'
                : 'bg-blue-custom border-black-custom hover:bg-blue-custom/80 focus:outline-none focus:ring-0 active:bg-blue-custom/80 active:shadow-blue-custom-2'
            }`}
            disabled={!isValid}
          >
            登入
          </button>
        </div>
        <div className='flex justify-center'>
          <Link to='/auth/signUp' className='hover:text-blue-custom p-3'>
            註冊帳號
          </Link>
        </div>
      </form>
    </>
  );
}

export default Login;
