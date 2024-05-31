// import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useContext } from "react";
import {
  Tab,
  initTWE,
} from "tw-elements";
import { toast } from "react-toastify";
import { uploadImage as uploadImageApi } from "../api/uploadImage";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema as schema } from "../type/schema";
import { updateProfile } from '../api/user';
import { AuthContext } from '../context/useAuth';
import PasswordForm from '../components/ProfileUpdate/PasswordForm';

function ProfileUpdate() {
  const { user, handleUserInfo } = useContext(AuthContext);
  console.log(handleUserInfo);

  useEffect(() => {
    initTWE({ Tab });
  }, []);



  const fileInputRef = useRef(null);
  const [imgUrl, setImgUrl] = useState(user?.avatar || ''); 
  const [loading, setLoading] = useState({
    avatar: false,
    profile: false,
    password: false,
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: user?.name,
      gender: user?.sex || 'female',
    }
  });
  useEffect(() => {
    if (user) {
      setValue('nickname', user.name);
      setValue('gender', user?.sex || 'female');
    }
    if(!imgUrl) {
      setImgUrl(user?.avatar);
    }
  }, [user, setValue, imgUrl]);
  const clickHandler = () => {
    fileInputRef.current.click();
  };

  const uploadImage = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) {
      return;
    }
    setImgUrl('');
    setLoading(prevState => ({
      ...prevState,
      avatar: true
    }));
    try {
      const formData = new FormData();
      formData.append('file-to-upload', file);
      formData.append('type', 'avatar');
      const res = await uploadImageApi(formData);
      console.log(res);
      setImgUrl(res.data.url);
      fileInputRef.current.value = '';
      toast.success('上傳成功！');
    } catch (error) {
      const { data } = error.response;
      toast.error( data.message || error.message);
      console.log(error);
    } finally {
      setLoading(prevState => ({
        ...prevState,
        avatar: false
      }));
    }
  };

  const onSubmit = async (data) => {
    if (!isValid) return; 

    setLoading(prevState => ({
      ...prevState,
      profile: true,
    }));
    try {
      const submitData = {
        name: data.nickname,
        sex: data.gender,
        avatar: imgUrl,
      };
      const res = await updateProfile(submitData);



      if (res.status) {
        await handleUserInfo();
        setImgUrl(res.data?.avatar);
        toast.success('更新個人資料成功！');
      }
      console.log(res);
    } catch (error) {
      toast.error('更新個人資料失敗！');
      console.log(error);
    } finally {
      setLoading(prevState => ({
        ...prevState,
        profile: false,
      }));
    }
  };

  return (
    <>
      <ul
        className="flex list-none flex-row flex-wrap border-b-0 ps-4"
        role="tablist"
        data-twe-nav-ref
      >
        <li role="presentation">
          <a
            href="#tabs-home"
            className="block border-2 border-b-0 border-black-custom px-6 py-2 font-medium uppercase leading-tight text-black-custom hover:isolate hover:bg-black-custom hover:text-white focus:isolate focus:text-white data-[twe-nav-active]:bg-black-custom data-[twe-nav-active]:text-white rounded-t-lg bg-white"
            data-twe-toggle="pill"
            data-twe-target="#tabs-home"
            data-twe-nav-active
            role="tab"
            aria-controls="tabs-home"
            aria-selected="true"
          >
            暱稱修改
          </a>
        </li>
        <li role="presentation">
          <a
            href="#tabs-profile"
            className="block rounded-t-lg border-2 border-b-0 border-black-custom bg-white px-6 py-2 font-medium uppercase leading-tight text-black-custom hover:isolate hover:bg-black-custom hover:text-white focus:isolate focus:text-white data-[twe-nav-active]:bg-black-custom data-[twe-nav-active]:text-white"
            data-twe-toggle="pill"
            data-twe-target="#tabs-profile"
            role="tab"
            aria-controls="tabs-profile"
            aria-selected="false"
          >
            重設密碼
          </a>
        </li>
      </ul>

      <div className="mb-6">
        <div
          className="border-2 border-black-custom rounded-lg p-8 bg-white card-shadow hidden opacity-100 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
          id="tabs-home"
          role="tabpanel"
          aria-labelledby="tabs-home-tab"
          data-twe-tab-active
        >
          <form action="" className="lg:w-[80%] mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <img src={imgUrl || "https://firebasestorage.googleapis.com/v0/b/metawall-social-media.appspot.com/o/images%2Fuser_default%402x.png?alt=media&token=91fce5a4-14a1-40e5-bfb6-4c6b2a69e0af"} alt="avatar" className="w-[107px] h-[107px] mx-auto mb-4 mt-8"/>
            <button
              type="button"
              className="mx-auto block px-4 py-2 
              bg-black-custom 
              text-white hover:bg-black-custom/80 mb-3" 
              onClick={clickHandler} 
              disabled={loading.avatar}>
              上傳大頭照
            </button>
            <input
              hidden
              type='file'
              ref={fileInputRef}
              onChange={uploadImage}
              accept='image/jpeg, image/png, .jpg, .jpeg, .png'
            />

            <div className='relative mb-4'>
              <label htmlFor="nickname" className="block text-black-custom mb-2">暱稱</label>
              <input
                type='text'
                className='peer block min-h-[auto] w-full border-2 border-black-custom bg-white px-6 py-4 leading-[1.6] outline-none transition-all duration-200 ease-linear font-azeret-mono focus:placeholder:opacity-100 peer-focus:text-black-custom data-[twe-input-state-active]:placeholder:opacity-100 placeholder:font-azeret-mono'
                id='nickname'
                placeholder='暱稱'
                {...register('nickname')}

              />
              <p className='text-red-custom mb-2'>{errors.nickname?.message}</p>
            </div>
            <label htmlFor="gender" className="block text-black-custom mb-2">性別</label>
            <div className="flex gap-x-8 mb-2">
              <div className="mb-[0.125rem] inline-block min-h-[1.5rem] ps-[1.5rem]">
                <input
                  className="relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-black-custom before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-black-custom checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-black-custom checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-black-custom checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right" 
                  type="radio"
                  name="gender"
                  id="male"
                  value="male" 
                  {...register('gender')}
                  />
                <label
                  className="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
                  htmlFor="male"
                  >
                    男性
                </label>
              </div>

              <div className="mb-[0.125rem] me-4 inline-block min-h-[1.5rem] ps-[1.5rem]">
                <input
                  className="relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-black-custom before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-black-custom checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-black-custom checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-black-custom checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  {...register('gender')}
                  />
                <label
                  className="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
                  htmlFor="female"
                  >
                    女性
                </label>
              </div>
              
            </div>
            <p className='text-red-custom mb-8'>{errors.gender?.message}</p>
            <div className='flex justify-center mb-8'>
              <button
                type='submit'
                className={`block w-full md:w-auto md:inline-block rounded bg-blue-custom md:px-[130px] py-4 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out border-2 border-black-custom ${
                  !isValid ? 'disabled:opacity-50' : 'hover:bg-yellow-custom hover:text-black-custom focus:bg-yellow-custom focus:text-black-custom focus:outline-none focus:ring-0 button-shadow hover:button-shadow'
                }`}
                disabled={!isValid || loading.profile}
              >
                送出更新
              </button>
            </div>
          </form>
        </div>
        <div
          className="border-2 border-black-custom rounded-lg p-8 bg-white card-shadow hidden opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
          id="tabs-profile"
          role="tabpanel"
          aria-labelledby="tabs-profile-tab"
        >
          <PasswordForm />
        </div>
      </div>
    </>
  );
}

export default ProfileUpdate;
