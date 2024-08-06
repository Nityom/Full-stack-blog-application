import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://full-stack-blog-application-so7c.onrender.com/post/${id}`)
      .then(response => response.json())
      .then(postInfo => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
  }, [id]);

  const handleSubmit = async (ev) => {
    ev.preventDefault(); // Prevent the default form submission

    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    if (file) formData.append('file', file[0]); // File is an array; use the first file

    try {
      const response = await fetch(`https://full-stack-blog-application-so7c.onrender.com/post/${id}`, {
        method: 'PUT', // Use PUT for updating; change to POST if creating a new post
        body: formData,
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Edit Post</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          type="text"
          placeholder="Summary"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          onChange={(e) => setFile(e.target.files)}
          type="file"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <ReactQuill
          value={content}
          onChange={newValue => setContent(newValue)}
          modules={modules}
          formats={formats}
        />
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
