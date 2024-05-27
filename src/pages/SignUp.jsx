import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema as schema } from '../type/schema';

function SignUp() {
    const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
            type='text'
            className='peer block min-h-[auto] w-full border-2 border-black-custom bg-white px-6 py-4 leading-[1.6] outline-none transition-all duration-200 ease-linear font-azeret-mono focus:placeholder:opacity-100 peer-focus:text-black-custom data-[twe-input-state-active]:placeholder:opacity-100 placeholder:font-azeret-mono'
            id='nickname'
            placeholder='暱稱'
            {...register('nickname')}
          />
          <p className='text-red-custom mb-2'>{errors.nickname?.message}</p>
        </div>
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

        <div className='relative mb-4'>
          <input
            type='password'
            className='peer block min-h-[auto] w-full border-2 border-black-custom bg-white px-6 py-4 leading-[1.6] outline-none transition-all duration-200 ease-linear font-azeret-mono focus:placeholder:opacity-100 peer-focus:text-black-custom data-[twe-input-state-active]:placeholder:opacity-100 placeholder:font-azeret-mono'
            id='password'
            placeholder='Password'
            {...register('password')}
          />
          <p className='text-red-custom mb-2'>{errors.password?.message}</p>
        </div>
        <div className='relative mb-8'>
          <input
            type='password'
            className='peer block min-h-[auto] w-full border-2 border-black-custom bg-white px-6 py-4 leading-[1.6] outline-none transition-all duration-200 ease-linear font-azeret-mono focus:placeholder:opacity-100 peer-focus:text-black-custom data-[twe-input-state-active]:placeholder:opacity-100 placeholder:font-azeret-mono'
            id='confirmPassword'
            placeholder='確認密碼'
            {...register('confirmPassword')}
          />
          <p className='text-red-custom mb-2'>{errors.confirmPassword?.message}</p>
        </div>
        
        
        <div
          className={
            !isValid  ? 'cursor-not-allowed' : ''
          }
        >
          <button
            type='button'
            className={`w-full rounded border-2 button-shadow py-4 font-azeret-mono font-medium uppercase leading-normal text-white transition duration-150 ease-in-out mb-4 ${!isValid ? 'bg-gray-custom border-gray-custom-dark' : 'bg-blue-custom border-black-custom hover:bg-blue-custom/80 focus:outline-none focus:ring-0 active:bg-blue-custom/80 active:shadow-blue-custom-2'}`}
            disabled={!isValid}
          >
            註冊
          </button>
        </div>
        <div className='flex justify-center'>
          <Link to='/auth/login' className='hover:text-blue-custom p-3'>
            登入
          </Link>
        </div>
      </form>
    </>);
}

export default SignUp;
