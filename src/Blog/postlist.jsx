import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PostList() {

  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('skin'); // 기본 탭을 'skin'로 설정
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const postsPerPage = 5; // 페이지당 게시물 수

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts) {
      setPosts(storedPosts.reverse()); // 최신 게시물이 상단에 오도록 정렬
    }
  }, []);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const deletePost = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts.reverse()));
  };

  // 피부 게시물만 필터링
  const skinPosts = posts.filter(post => post.part === 'skin');
  // 안구 게시물만 필터링
  const eyePosts = posts.filter(post => post.part === 'eye');

  // 페이지네이션을 위한 현재 페이지 게시물 필터링
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = (activeTab === 'skin' ? skinPosts : eyePosts).slice(indexOfFirstPost, indexOfLastPost);
 
  // 총 페이지 수 계산
  const totalPages = Math.ceil((activeTab === 'skin' ? skinPosts : eyePosts).length / postsPerPage);
 
  // 페이지 변경 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const move_postwrite = () => {
    window.location.href = "../Blog/postform"    
  }

  return (
    <div>
      <h1>컨뱃팅 커뮤니티</h1>
      <div class="button_upload" onClick={move_postwrite}><a>게시물 작성</a></div>
      
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'skin' ? 'active' : ''}`}
          onClick={() => { setActiveTab('skin'); setCurrentPage(1); }}
        >
          피부 게시물
        </div>
        <div
          className={`tab ${activeTab === 'eye' ? 'active' : ''}`}
          onClick={() => { setActiveTab('eye'); setCurrentPage(1); }}
        >
          안구 게시물
        </div>
      </div>

      {activeTab === 'skin' && (
        <div className='tab_content'>      
            {currentPosts.map(post => (
              <li key={post.id}>
                <Link to={`/Blog/${post.id}`} className="post-link">
                <h3>{truncateText(post.title, 50)}</h3>
                <p>{truncateText(post.content, 100)}</p>
                {post.image && <img src={post.image} alt="첨부 이미지" className="post-image" />}
                <div className="post-meta">
                  <small>{post.timestamp}</small>
                  <p>댓글 수: {post.replies ? post.replies.length : 0}</p>
                </div>
                </Link>
              </li>
            ))}        
        </div>
      )}

      {activeTab === 'eye' && (
        <div className='tab_content'>                 
            {currentPosts.map(post => (
              <li key={post.id}>
                <Link to={`/Blog/${post.id}`} className="post-link">
                <h3>{truncateText(post.title, 50)}</h3>
                <p>{truncateText(post.content, 100)}</p>
                {post.image && <img src={post.image} alt="첨부 이미지" className="post-image" />}
                <div className="post-meta">
                  <small>{post.timestamp}</small>
                  <p>댓글 수: {post.replies ? post.replies.length : 0}</p>
                </div>
                </Link>
              </li>
            ))}       
        </div>
      )}
      {/* 페이지네이션 */}
      <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={index + 1 === currentPage ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
    </div>
  );
}

export default PostList;