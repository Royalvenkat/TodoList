import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GetFeed.css'; 
import touchui from "./touchui.jpg"

const GetFeeds = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [expandedCommentsId, setExpandedCommentsId] = useState(null);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJveWFsODY1IiwidXNlcmlkIjo0Njg3LCJpYXQiOjE3MDE2OTkzODN9.0bbCwkAo_ObZ6x531-VDv7i7ZdvzdhQcar7wqGk-epI'; // Replace with your actual authentication token
  const offset = 0;
  const limit = 10;

  useEffect(() => {
    const getFeeds = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await axios.post(
          'http://test.touchapp.in/api/getFeeds',
          { offset, limit },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Server Response:', response.data);

        if (Array.isArray(response.data.data)) {
          setFeeds(response.data.data);
        } else {
          setFeeds([]);
        }
      } catch (error) {
        console.error('Error fetching feeds:', error);
        setError('Error fetching feeds. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    getFeeds();
  }, [offset, limit, token]);

  const handleLikeClick = async (postId) => {
    try {
      const response = await axios.post(
        'http://test.touchapp.in/api/postLike',
        {
          post_id: postId,
          reaction_id: 1, 
          token,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setFeeds((prevFeeds) =>
        prevFeeds.map((feed) =>
          feed.postid === postId 
            ? { ...feed, like_count: feed.user_has_liked ? feed.like_count - 1 : feed.like_count + 1, user_has_liked: !feed.user_has_liked }
            : feed
        )
      );

      console.log('Post Liked Successfully:', response.data);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handlePostComment = async (postId, commentText, reactionId) => {
    try {
      const response = await axios.post(
        'https://test.touchapp.in/api/postComment',
        {
          post_id: postId,
          text: commentText,
          reaction_id: reactionId,
          Token: token,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const newComment = response.data.data;

      setFeeds((prevFeeds) =>
        prevFeeds.map((feed) =>
          feed.postid === postId
            ? {
                ...feed,
                comments: Array.isArray(feed.comments) ? [...feed.comments, newComment] : [newComment],
                comment_count: feed.comment_count + 1, // Increase comment count
              }
            : feed
        )
      );

      setNewCommentText('');

      console.log('Comment Posted Successfully:', response.data);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div>
      <div>
        <img src={touchui} alt='Touchui Image' style={{height:"50px",  width:"50px"}}/>
        <h1>Touchui</h1>
      </div>
      <div className="feeds-container">
        {loading && <p>Loading feeds...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="feed-items">
          {feeds.map((feed) => (
            <div key={feed.postid} className="feed-item">
              <div className="profile-info">
                <img src={feed.profile_pic} alt="Profile Pic" className="profile-pic" />
                <p className="username">{feed.username}</p>
              </div>
              <div className="post-content">
                {feed.post_file && (
                  <div className="post-images">
                    {JSON.parse(feed.post_file).map((image, index) => (
                      <img key={index} src={image.path} alt={`Post Image ${index + 1}`} />
                    ))}
                  </div>
                )}
              </div>
              <div className="post-details">
                <p className="likes">Likes: {feed.like_count}</p>
                <button onClick={() => handleLikeClick(feed.postid)}>Like</button>
                <p className="post-type">
                  Comments: {feed.comment_count}
                  {/* Render existing comments */}
                  {feed.comments && Array.isArray(feed.comments) && feed.comments.length > 0 && (
                    <span
                      onClick={() => setExpandedCommentsId(feed.postid)}
                      style={{ cursor: 'pointer', textDecoration: 'underline', marginLeft: '8px' }}
                    >
                      (Click to see comments)
                    </span>
                  )}
                </p>

                {expandedCommentsId === feed.postid && (
                  <div>
                    {feed.comments && Array.isArray(feed.comments) && feed.comments.map((comment) => (
                      <p key={comment.id} title={comment.text}>{comment.text}</p>
                    ))}
                  </div>
                )}

                {/* Input for new comment */}
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                />
                <button onClick={() => handlePostComment(feed.postid, newCommentText, 1)}>
                  Post Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetFeeds;
