import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from '../../type/schema';
import { updatePassword } from '../../api/user';
import { toast } from 'react-toastify';
import { setAuthToken } from '../../context/AuthUtils';

function PasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(passwordSchema),
  });

  const [loading, setLoading] = useState({
    password: false,
  });

  const onSubmit = async (data) => {
    if (!isValid) return;

    setLoading((prevState) => ({
      ...prevState,
      password: true,
    }));
    try {
      const submitData = {
        password: data.password,
        confirmPassword: data.confirmPassword,
      };
      const res = await updatePassword(submitData);

      if (res.status) {
        await setAuthToken(res.data?.token);
        toast.success('重設密碼成功！');
      }
      reset();
    } catch (error) {
      toast.error('重設密碼失敗！');
      console.log(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        password: false,
      }));
    }
  };

  return (
    <form
      action=''
      className='lg:w-[80%] mx-auto'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='relative mb-4 mt-8'>
        <label htmlFor='password' className='block text-black-custom mb-2'>
          輸入新密碼
        </label>
        <input
          type='password'
          className='peer block min-h-[auto] w-full border-2 border-black-custom bg-white px-6 py-4 leading-[1.6] outline-none transition-all duration-200 ease-linear font-azeret-mono focus:placeholder:opacity-100 peer-focus:text-black-custom data-[twe-input-state-active]:placeholder:opacity-100 placeholder:font-azeret-mono'
          id='password'
          placeholder='請輸入新密碼'
          {...register('password')}
        />
        <p className='text-red-custom mb-2'>{errors.password?.message}</p>
      </div>

      <div className='relative mb-8'>
        <label
          htmlFor='confirmPassword'
          className='block text-black-custom mb-2'
        >
          確認新密碼
        </label>
        <input
          type='password'
          className='peer block min-h-[auto] w-full border-2 border-black-custom bg-white px-6 py-4 leading-[1.6] outline-none transition-all duration-200 ease-linear font-azeret-mono focus:placeholder:opacity-100 peer-focus:text-black-custom data-[twe-input-state-active]:placeholder:opacity-100 placeholder:font-azeret-mono'
          id='confirmPassword'
          placeholder='再次輸入新密碼'
          {...register('confirmPassword')}
        />
        <p className='text-red-custom mb-2'>
          {errors.confirmPassword?.message}
        </p>
      </div>

      <div className='flex justify-center mb-8'>
        <button
          type='submit'
          className={`block w-full md:w-auto md:inline-block rounded bg-blue-custom md:px-[130px] py-4 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out border-2 border-black-custom ${
            !isValid
              ? 'bg-gray-custom text-white border-gray-custom-dark'
              : 'hover:bg-yellow-custom hover:text-black-custom focus:bg-yellow-custom focus:outline-none focus:ring-0 button-shadow'
          }`}
          disabled={!isValid || loading.password}
        >
          重設密碼
        </button>
      </div>
    </form>
  );
}
export default PasswordForm;
