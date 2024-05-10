import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { createPost } from '../api/post';
import { uploadImage as uploadImageApi } from '../api/uploadImage';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import { TETextarea } from 'tw-elements-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

  return (
    <>
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
        <div className='flex justify-center'>
          <div className='relative mb-3 xl:w-96'>
            <TETextarea
              id='textareaExample'
              label='Message'
              rows={4}
              value={postContent}
              onChange={(e) => setPostContent(escapeHtml(e.target.value))}
            ></TETextarea>
          </div>
        </div>
        <button
          type='button'
          className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
          onClick={clickHandler}
        >
          上傳圖片
        </button>
        <input
          type='file'
          ref={fileInputRef}
          onChange={uploadImage}
          accept='image/jpeg, image/png, .jpg, .jpeg, .png'
        />
        <div className='flex justify-center bg-gray-200 p-4'>
          {imgUrl && <img src={imgUrl} className='w-full' />}
          {loading.img && (
            <>
              <Skeleton circle={true} height={50} width={50} />
            </>
          )}
        </div>
        <button
          type='button'
          className={`inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] ${
            !passValidation() ? 'opacity-50' : ''
          }`}
          onClick={sendPost}
          disabled={!passValidation()}
        >
          發送貼文
        </button>
      </>
    </>
  );
}

export default CreatePost;
