import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './postdetail.css'; // CSS 파일을 추가합니다.

function PostDetail() {
  const { id } = useParams(); // URL에서 게시물 ID를 가져옵니다.
  const [post, setPost] = useState(null);
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts) {
      const currentPost = storedPosts.find(p => p.id === parseInt(id));
      setPost(currentPost);
      setReplies(currentPost?.replies || []);
    }
  }, [id]);

  const getRandomAuthor = () => {
    const authors = ['수의사', '수의대생'];
    return authors[Math.floor(Math.random() * authors.length)];
  };

  const handleAddReply = () => {
    if (reply) {
      const newReply = {
        content: reply,
        date: new Date().toLocaleDateString(),
        author: getRandomAuthor(), // 랜덤 작성자 추가
      };
      const updatedReplies = [...replies, newReply];
      setReplies(updatedReplies);

      // LocalStorage 업데이트
      const storedPosts = JSON.parse(localStorage.getItem('posts'));
      const updatedPosts = storedPosts.map(p =>
        p.id === parseInt(id) ? { ...p, replies: updatedReplies } : p
      );
      localStorage.setItem('posts', JSON.stringify(updatedPosts));

      setReply('');
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const move_back = () => {
    window.location.href = '../Blog/postlist';
  };

  return (
    <div className="post-detail-container">
      <div className='detail_title'>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="첨부 이미지" className="post-image" />}
        <small>{post.timestamp}</small>
      </div>
      
      <div className="replies">
        <h3>댓글 목록</h3>
        <ul>
          {replies.map((r, index) => (
            <li key={index}>
              <div className="reply-author-and-text">
              <span className={`reply-author ${r.author === '수의사' ? 'vet' : 'student'}`}>
                {r.author}
              </span>
              <span className="reply-text">{r.content}</span>
              </div>
              <span className="reply-date">{r.date}</span>
            </li>
          ))}
        </ul>
        <div>
          <h4>댓글 작성</h4>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="댓글을 입력하세요"
            required
          ></textarea>
          <button className='button_detail' onClick={handleAddReply}>댓글 달기</button>
        </div>
        <button className='button_backback' onClick={move_back}>돌아가기</button>
      </div>
      
    </div>
  );
}

export default PostDetail;
