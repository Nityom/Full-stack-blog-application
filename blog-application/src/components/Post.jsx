import React from 'react';
import { Link } from 'react-router-dom';

const BlogPost = ({ _id,cover, heading, author, date, description }) => {
  return (
    <article className="w-full max-w-2xl mx-auto my-8 flex flex-col md:flex-row gap-6 border rounded-lg p-5">
      <div className="relative overflow-hidden rounded-lg flex-shrink-0 w-full md:w-1/2">
        <img
          src={'http://localhost:4000/'+cover}
          alt="Blog Post Image"
          width={1200}
          height={400}
          className="w-full h-[200px] md:h-[250px] object-cover"
        />
      </div>
      <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{heading}</h1>
        <p className="mt-2 md:mt-4 text-base md:text-lg text-muted-foreground">
          {description}
        </p>
        <div className="mt-2 md:mt-4 flex items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>{author.username}</span>
          </div>
          <span className="mx-2">·</span>
          <span>{date}</span>
        </div>
        <Link to={`/post/${_id}`}  className="mt-4 h-10 px-6 flex flex-col justify-center text-center bg-slate-950 text-white rounded-lg hover:bg-blue-700 transition duration-200">
          Read Article
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;
