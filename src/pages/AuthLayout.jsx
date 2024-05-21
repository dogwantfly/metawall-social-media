import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <section className='container flex items-center min-h-screen'>
      <div className='border-2 border-black-custom flex px-10 py-16 w-full xl:w-3/4 mx-auto auth-shadow auth-bg gap-12'>
        <div className='w-1/2'>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/metawall-social-media.appspot.com/o/images%2Fmetawall-1.webp?alt=media&token=d2dd5565-50d6-4417-b299-743453adbb6c'
            alt='Login'
            className='object-cover'
          />
        </div>
        <div className='w-1/2'>
          <h1 className='text-6xl font-bold font-paytone-one text-blue-custom text-center leading-[1.4]'>
            MetaWall
          </h1>
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default AuthLayout;
