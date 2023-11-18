import React from 'react';
import { Link } from 'react-router-dom';

const User = ({ user, onPostsButtonClick, onAlbumsButtonClick }) => {
  return (
    <div className='user' key={user.id}>
      {user.photos && user.photos.length > 0 && (
        <img src={user.photos[0].thumbnailUrl} alt={`${user.name}`} />
      )}
      <span className='user-name'>{user.name}</span>
      <div className='user-btn'>
        <Link to={`/posts?userId=${user.id}`}>
        <button onClick={() => onPostsButtonClick(user.id)}>Posts</button>
        </Link>
        <Link to={`/albums?userId=${user.id}`}>
          <button onClick={() => onAlbumsButtonClick(user.id)}>Albums</button>
        </Link>
      </div>
    </div>
  );
};

export default User;