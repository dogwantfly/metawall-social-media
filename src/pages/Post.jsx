import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/PostFeeds/Post';
import { getPost } from '../api/post';

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const handleGetPost = async () => {
      try {
        const res = await getPost(postId);
        setPost(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    handleGetPost(postId);
  }, [postId]);

  return <>{post && <Post post={post} />}</>;
}

export default PostPage;
