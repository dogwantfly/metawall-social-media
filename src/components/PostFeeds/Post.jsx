import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/useAuth';
import { likePost, unLikePost, addComment } from '../../api/post';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'react-toastify';


function Post({ post }) {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState({
    like: false,
    comment: false,
  });

  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState([...post.comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  const [sortedComments, setSortedComments] = useState([...comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  const [moreComments, setMoreComments] = useState(false);
  const [inputComment, setInputComment] = useState('');
  const breakLine = (content) => {
    return { __html: content.replace(/\n/g, '<br>') };
  };
  const handleLike = async (postId) => {

    const apiMethod = likes?.find((like) => like._id === user._id) ? unLikePost : likePost;
    console.log('apiMethod', apiMethod);
    try {
      setIsLoading(prevState => ({
        ...prevState,
        like: true,
      }));
      const res = await apiMethod(postId);
      setLikes(res.data?.likes);
      console.log('handleLike', res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(prevState => ({
        ...prevState,
        like: false,
      }));
    }
  }
  const handleComment = async (postId) => {
    try {
       if (inputComment.length > 200) {
        toast.error('留言不能超過200字');
        return;
      }

      setIsLoading(prevState => ({
        ...prevState,
        comment: true,
      }));
      const res = await addComment(postId, {comment: inputComment.trim()});
      setInputComment('');
      console.log('handleComment', res);
      setComments([...res.data.post.comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setMoreComments(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(prevState => ({
        ...prevState,
        comment: false,
      }));
    }
  }

  useEffect(() => {
    setSortedComments(moreComments ? [...comments] : [...comments].slice(0, 3));
  }, [moreComments, comments])
  
  return (
    <>
    <div
              key={post._id}
              className='p-6 border-2 border-black-custom text-black-custom bg-white rounded-lg card-shadow mb-4'
            >
              {post.user && (
                <div className='flex items-center gap-4 mb-4 hover:text-blue-custom'>
                  <Link>
                    <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className='w-[45px] h-[45px] rounded-full border-2 border-black-custom'
                  />
                  </Link>
                  
                  <div>
                    <Link className='hover:text-blue-custom'>
                      <h3 className='font-bold'>{post.user.name}</h3>
                    </Link>
                    <div className='text-neutral-500 text-sm'>
                      {new Date(post.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
              <div
                className='mb-5'
                dangerouslySetInnerHTML={breakLine(post.content)}
              ></div>

              {post.image && (
                <img
                  src={post.image}
                  alt='image'
                  className='border-2 border-black-custom rounded-lg mb-4'
                />
              )}

              <div className="flex mb-5 gap-x-2">
                <button type="button" onClick={() => handleLike(post._id)} disabled={isLoading.like}>
                  {likes?.find((like) => like._id === user._id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#03438D" className="size-6 hover:fill-blue-custom/80">
                      <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                    </svg>
                    ) : 
                  (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#03438D" className="size-6 hover:fill-blue-custom">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />                 
                  </svg>
                  )
                  }

                 

                </button>
                {likes?.length > 0 && likes?.length}
              </div>

              <div className="flex gap-x-2 mb-5">
                <Link to="/" className='block flex-shrink-0'>
                  <img src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg" alt={user.name} className="w-[45px] h-[45px] rounded-full border-2 border-black-custom" />
                </Link>
                <div className="relative mb-4 flex w-full items-stretch">
                <input
                  type='text'
                  className='peer block w-full border-2 border-e-0 border-black-custom bg-white px-4 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear font-azeret-mono focus:placeholder:opacity-100 peer-focus:text-black-custom data-[twe-input-state-active]:placeholder:opacity-100 placeholder:font-azeret-mono'
                  id='comment'
                  placeholder='留言...'
                  value={inputComment}
                  onChange={(e) => setInputComment(e.target.value)}
                />
                <button
                  type='button'
                  className={`border-2 border-black-custom text-nowrap md:inline-block md:px-12 py-2 font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]  ${isLoading.comment ? 'bg-yellow-custom text-black-custom' : 'bg-blue-custom text-white'} flex items-center ${!inputComment.trim() ? 'bg-blue-custom/80' : 'hover:bg-yellow-custom focus:bg-yellow-custom focus:outline-none focus:ring-0 active:bg-yellow-custom hover:text-black-custom active:text-black-custom focus:text-black-custom'}`}
                  onClick={() => handleComment(post._id)}
                  disabled={isLoading.comment || !inputComment.trim()}
                >
                  送出留言
                  {isLoading.comment && <Skeleton circle={true} height={20} width={20} className='ms-2' />}
                </button>
              </div>
              </div>
              <ul className='mb-5'>

              { sortedComments?.length > 0 &&  sortedComments.map((comment) => (
                <li key={comment._id} className='p-6 text-black-custom bg-gray-custom-light rounded-xl mb-4'>
                  <div className='flex items-center gap-4 mb-4'>
                    <img
                      src={comment.user?.avatar}
                      alt={comment.user?.name}
                      className='w-[45px] h-[45px] rounded-full border-2 border-black-custom'
                    />
                    <div>
                      <h3 className='font-bold'>{comment.user?.name}</h3>
                      <time className='text-gray-custom-100 text-sm'>
                        {new Date(comment.createdAt).toLocaleString()}
                      </time>
                    </div>
                  </div>
                  <div
                    className='mb-5'
                    dangerouslySetInnerHTML={breakLine(comment.text)}
                  ></div>
                </li>
              ))}
              </ul>

              {/* <div>
                {post.tags &&
                  post.tags.map((tag) => <div key={tag}>{tag}</div>)}
              </div> */}
              {post.comments?.length > 3 && <button type="button" className='text-blue-custom hover:text-yellow-custom' onClick={() => setMoreComments(!moreComments)}>
                {moreComments ? '顯示更少':'顯示全部'}
              </button>}
            </div>
    </>
  )
}

export default Post;

Post.propTypes = {
  post: PropTypes.object.isRequired,
};