import React, { useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

const CreatePost = () => {
  const [postFile, setPostFile] = useState(null);
  const [postType, setPostType] = useState('image');
  const [caption, setCaption] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJveWFsODY1IiwidXNlcmlkIjo0Njg3LCJpYXQiOjE3MDE4NDI5MDN9.4BQ0yhSGcNDWCWzrxBh27iHsm1yAoQzRh-9UbW7q0ys';

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPostFile(file);
  };

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!postFile || !token) {
      setError('Please select a file and provide a valid token.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('post_fileA', postFile);
      formData.append('post_type', postType);
      formData.append('caption', caption); 
      formData.append('token', token);

      const response = await axios.post('http://test.touchapp.in/api/createPost', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Post created successfully:', response.data);
     
    } catch (error) {
      console.error('Error creating post:', error);
      setError(`This is the Multer error: ${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link to="/GetFeed">GetFeed</Link>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="postType">Select Post Type:</label>
          <select id="postType" value={postType} onChange={handlePostTypeChange}>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>
        <div>
          <label htmlFor="postFile">Select File:</label>
          <input type="file" id="postFile" name="post_fileA" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="caption">Caption:</label>
          <input
            type="text"
            id="caption"
            name="caption"
            value={caption}
            onChange={handleCaptionChange}
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Creating Post...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
