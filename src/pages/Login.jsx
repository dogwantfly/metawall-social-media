import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema as schema } from '../type/schema';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
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
        </div>

        <div className='relative mb-8'>
          <input
            type='password'
            className='peer block min-h-[auto] w-full border-2 border-black-custom bg-white px-6 py-4 leading-[1.6] outline-none transition-all duration-200 ease-linear font-azeret-mono focus:placeholder:opacity-100 peer-focus:text-black-custom data-[twe-input-state-active]:placeholder:opacity-100 placeholder:font-azeret-mono'
            id='password'
            placeholder='Password'
            {...register('password')}
          />
        </div>
        <p className='text-red-custom mb-2 text-center'>{errors.email?.message}</p>
        <p className='text-red-custom mb-2 text-center'>{errors.password?.message}</p>
        <div
          className={
            errors.email || errors.password ? 'cursor-not-allowed' : ''
          }
        >
          <button
            type='button'
            className='w-full rounded bg-blue-custom border-2 border-black-custom button-shadow py-4 font-azeret-mono font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-custom/80  focus:outline-none focus:ring-0 active:bg-blue-custom/80 active:shadow-blue-custom-2 mb-4 disabled:bg-gary-custom disabled:border-gary-custom-dark'
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
