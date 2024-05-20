import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <>
      <div>
        <img
          src='https://firebasestorage.googleapis.com/v0/b/metawall-social-media.appspot.com/o/images%2Fmetawall-1.webp?alt=media&token=d2dd5565-50d6-4417-b299-743453adbb6c'
          alt='Login'
        />
      </div>
      <Outlet />
    </>
  );
}

export default AuthLayout;
