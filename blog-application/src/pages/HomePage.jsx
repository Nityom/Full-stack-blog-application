import React, { useEffect, useState } from 'react';
import BlogPost from '../components/Post';
import Header from '../components/Header';
import Loader from '../Loader/Loader';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://full-stack-blog-application-so7c.onrender.com/allposts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Header />
      {loading ? (
        <div className='h-full flex justify-center items-center w-full'>
        <Loader />
        </div>

      ) : (
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <BlogPost
              key={post._id}
              _id={post._id}
              cover={post.cover} // Assuming the backend serves the images
              heading={post.title}
              author={post.author || 'Unknown Author'} // Replace with actual author if available
              date={new Date(post.createdAt).toLocaleDateString()} // Format date as needed
              description={post.summary}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
