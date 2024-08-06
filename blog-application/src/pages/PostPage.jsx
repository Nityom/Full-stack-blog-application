import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';

function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext)
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://full-stack-blog-application-so7c.onrender.com/${id}`)
      .then((response) => response.json())
      .then((postInfo) => {
        setPostInfo(postInfo);
      });
  }, [id]);

  if (!postInfo) return '';

  return (
    <article className="prose prose-gray max-w-6xl mx-auto dark:prose-invert px-4 sm:px-6 lg:px-8">
      <img
        src={`https://full-stack-blog-application-so7c.onrender.com/${postInfo.cover}`}
        alt={postInfo.title}
        className="w-full max-w-full h-auto max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-hidden rounded-lg object-cover"
      />
      <div className="space-y-4 not-prose mt-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl">
          {postInfo.title}
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">{postInfo.summary}</p>
      </div>
      <div className="mt-8 space-y-4">
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
      <div className="mt-8">
        <p className="text-sm text-gray-500">
          Written by <strong>{postInfo.author.username}</strong> on{' '}
          {new Date(postInfo.createdAt).toLocaleDateString()}
        </p>
      </div>
      
        {userInfo.id === postInfo.author._id && (
            <div>
                <Link to={`/edit/${postInfo._id}`}> Edit this post </Link>
            </div>
        )}
      
    </article>
  );
}

export default PostPage;
