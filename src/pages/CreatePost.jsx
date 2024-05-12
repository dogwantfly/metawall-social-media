import { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createPost } from '../api/post';
import { uploadImage as uploadImageApi } from '../api/uploadImage';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Input, initTWE } from 'tw-elements';

function CreatePost() {
  const fileInputRef = useRef(null);

  const clickHandler = () => {
    fileInputRef.current.click();
  };
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState({
    img: false,
    post: false,
  });

  const uploadImage = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) {
      return;
    }
    setImgUrl('');
    setLoading({
      ...loading,
      img: true,
    });
    try {
      const formData = new FormData();
      formData.append('file-to-upload', file);
      const res = await uploadImageApi(formData);
      console.log(res);
      setImgUrl(res.data.url);
      fileInputRef.current.value = '';
    } catch (error) {
      console.log(error);
    } finally {
      setLoading({
        ...loading,
        img: false,
      });
    }
  };

  const [postContent, setPostContent] = useState('');
  const sendPost = async () => {
    if (!passValidation()) return; // 確保所有驗證在進入異步操作前完成

    setLoading({
      ...loading,
      post: true,
    });
    try {
      const data = {
        user: '6635bca51e5c511412a293bc',
        content: postContent,
        image: imgUrl,
        type: 'group',
        tags: '心情',
      };
      const res = await createPost(data);
      setPostContent('');
      setImgUrl('');

      if (res.status) {
        toast.success('貼文發送成功！');
      }
      console.log(res);
    } catch (error) {
      toast.error('發送貼文失敗！');
      console.log(error);
    } finally {
      setLoading({
        ...loading,
        post: false,
      });
    }
  };

  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };
  const validateUrl = (url) => {
    const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return regex.test(url);
  };

  const passValidation = () => {
    if (!postContent.trim()) {
      return false;
    }
    if (imgUrl && !validateUrl(imgUrl)) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    initTWE({ Input });
  }, []);

  return (
    <>
      <h2 className='relative text-center text-xl font-bold py-4 bg-white border-2 border-black-custom mb-4 before:content-[""] before:absolute before:top-[6px] before:-left-[6px] before:w-full before:h-full before:border-black-custom before:z-[-1] before:bg-white before:border-2'>
        張貼動態
      </h2>
      <form className='border-2 border-black-custom rounded-lg p-8 bg-white card-shadow'>
        {loading.post && (
          <>
            <div className='flex justify-center items-center bg-opacity-50 bg-gray-200 absolute top-0 left-0 w-full h-full z-10'>
              <div className='flex justify-center'>
                <Skeleton
                  circle={true}
                  count={5}
                  containerClassName='flex-1'
                  height={50}
                  width={50}
                  inline={true}
                  style={{ marginRight: '0.5rem' }}
                />
              </div>
            </div>
          </>
        )}
        <>
          <label className='block text-black-custom mb-2' htmlFor='postContent'>
            貼文內容
          </label>
          <div className='relative mb-4'>
            <textarea
              className='peer block min-h-[auto] w-full border-2 border-black-custom bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-black-custom data-[twe-input-state-active]:placeholder:opacity-100 h-[170px] resize-none'
              id='postContent'
              value={postContent}
              onChange={(e) => setPostContent(escapeHtml(e.target.value))}
              placeholder='請輸入貼文內容'
            ></textarea>
          </div>
          <button
            type='button'
            className='block w-full md:w-auto md:inline-block rounded bg-black-custom px-8 py-4 md:py-1 mb-5 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-black-custom/80 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-black-custom/80 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-black-custom/70 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'
            onClick={clickHandler}
          >
            上傳圖片
          </button>
          <input
            hidden
            type='file'
            ref={fileInputRef}
            onChange={uploadImage}
            accept='image/jpeg, image/png, .jpg, .jpeg, .png'
          />
          <div className='flex justify-center bg-gray-200 mb-8'>
            {imgUrl && (
              <img
                src={imgUrl}
                className='w-full border-2 border-black-custom rounded-lg'
              />
            )}
            {loading.img && (
              <>
                <Skeleton circle={true} height={50} width={50} />
              </>
            )}
          </div>
          <div className='flex justify-center mb-8'>
            <button
              type='button'
              className={`block w-full md:w-auto md:inline-block rounded bg-black-custom md:px-[130px] py-4 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] hover:bg-black-custom/80 focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 disabled:opacity-50 ${
                !passValidation() ? 'disabled:opacity-50' : ''
              }`}
              onClick={sendPost}
              disabled={!passValidation()}
            >
              送出貼文
            </button>
          </div>
        </>
      </form>
    </>
  );
}

export default CreatePost;
