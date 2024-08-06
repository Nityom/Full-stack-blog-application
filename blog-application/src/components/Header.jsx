import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://full-stack-blog-application-so7c.onrender.com/profile', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          navigate('/index');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/index');
      }
    };

    fetchUserProfile();
  }, [navigate, setUserInfo]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:4000/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
      setUserInfo(null);
      navigate('/index');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const username = userInfo?.username;

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-300">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold">Thoughts</h2>
      </div>
      <div className="flex items-center gap-4">
        <IconButton onClick={() => navigate('/create')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 text-blue-500 hover:text-blue-600">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
          </svg>
        </IconButton>
        <div className="flex items-center gap-2">
          {username ? (
            <>
              <span className="text-sm font-medium">{username}</span>
              <IconButton onClick={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 text-blue-500 hover:text-blue-600">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                </svg>
              </IconButton>
            </>
          ) : (
            <span className="text-sm font-medium">Loading...</span>
          )}
        </div>
      </div>
    </header>
  );
}

const IconButton = ({ children, onClick }) => (
  <button
    className="p-2 bg-transparent text-gray-500 hover:text-gray-700"
    onClick={onClick}
  >
    {children}
  </button>
);
