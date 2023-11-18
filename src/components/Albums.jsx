import React from 'react';
import { Link } from 'react-router-dom';

const Albums = ({ albums, userId, onPostsButtonClick }) => {
  return (
    <div>
      <h2>Albums</h2>
      <ul>
        {albums.map(album => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
      <div className='head-btn'>
        <Link to={`/posts?userId=${userId}`}>
          <button onClick={() => onPostsButtonClick(userId)}>Posts</button>
        </Link>
        <Link to="/">
          <button>Home</button>
        </Link>
        <button className='go-back' onClick={() => window.history.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M8.01959 12.7097C8.01959 12.4588 8.11539 12.2079 8.30659 12.0166L14.3264 5.99692C14.7093 5.61398 15.3301 5.61398 15.7129 5.99692C16.0957 6.37969 16.0957 7.00043 15.7129 7.38339L10.3863 12.7097L15.7127 18.036C16.0955 18.419 16.0955 19.0396 15.7127 19.4224C15.33 19.8055 14.7091 19.8055 14.3262 19.4224L8.30641 13.4028C8.11517 13.2114 8.01959 12.9605 8.01959 12.7097Z" fill="#C0C3C9"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Albums;