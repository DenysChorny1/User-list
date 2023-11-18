import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import User from './components/User';
import Posts from './components/Posts';
import Albums from './components/Albums';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await usersResponse.json();

        const usersWithPhotos = await Promise.all(
          usersData.map(async user => {
            const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${user.id}`);
            const photosData = await photosResponse.json();
            return { ...user, photos: photosData };
          })
        );

        setUsers(usersWithPhotos);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handlePostsButtonClick = async userId => {
    try {
      const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const postsData = await postsResponse.json();
      setPosts(postsData);

      setSelectedUser(userId);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleAlbumsButtonClick = async userId => {
    try {
      const albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
      const albumsData = await albumsResponse.json();
      setAlbums(albumsData);

      setSelectedUser(userId);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const filteredAndSortedUsers = users
  .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    return order * a.name.localeCompare(b.name);
  });

  return (
    <div className='App'>
      <Helmet>
        <title>User List</title>
      </Helmet>
      <div className='container'>
        <Routes>
          <Route
            path='/'
            element={
              <div className='user-list'>
                <div className='user-list_head'>
                  <h1>User List</h1>
                  <input
                    type='text'
                    placeholder='Username'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  <div className='head-btn'>
                    <button onClick={() => setSortOrder('asc')}>Asc</button>
                    <button onClick={() => setSortOrder('desc')}>Desc</button>
                  </div>
                </div>
                
                <div className='user-list_box'>
                {filteredAndSortedUsers.map(user => (
                  <User
                    key={user.id}
                    user={user}
                    onPostsButtonClick={handlePostsButtonClick}
                    onAlbumsButtonClick={handleAlbumsButtonClick}
                  />
                ))}
                </div>
              </div>
            }
          />
          <Route path='/posts' element={<Posts posts={posts} userId={selectedUser} onAlbumsButtonClick={handleAlbumsButtonClick} />} />
          <Route path='/albums' element={<Albums albums={albums} userId={selectedUser} onPostsButtonClick={handlePostsButtonClick} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
