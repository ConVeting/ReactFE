import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./blog.css";
import { Camera } from 'lucide-react';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [part, setPart] = useState('skin'); // 기본값을 'skin'로 설정
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const addPost = () => {
    if (title && content) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPost = {
          id: Date.now(),
          title,
          content,
          part,
          image: reader.result, // 이미지 데이터를 Base64로 저장
          timestamp: new Date().toLocaleString(),
        };

        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));

        navigate('../Blog/postlist'); // 게시물 목록 페이지로 이동
      };
      if (image) {
        reader.readAsDataURL(image);
      } else {
        reader.onloadend();
      }
    } else {
      alert('분야와 제목 그리고 내용을 입력해주세요.');
    }
  };

  return (
    <div>
      <div class="card-header1">
        <h1>게시글 작성</h1>
      </div>
      <div class="card-write"> 
      <div class='part'>
        <label>
          <input
            type="radio"
            value="skin"
            checked={part === 'skin'}
            onChange={() => setPart('skin')}
          />
          피부
        </label>
        <label>
          <input
            type="radio"
            value="eye"
            checked={part === 'eye'}
            onChange={() => setPart('eye')}
          />
          안구
        </label>
      </div>
        <div class="card_title">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />   
        </div>
        <div class="msg">  
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용"       
          ></textarea>       
        </div>
        <div className="image-upload">
          <label htmlFor="image-upload" className="image-upload-label">
            <Camera/> 이미지 업로드
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div class="button_upload" onClick={addPost}><a>등록</a></div>
      </div>
      
    </div> 
  );
}

export default PostForm;