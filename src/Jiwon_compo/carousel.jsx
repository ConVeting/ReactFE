import React, { useEffect, useRef, useState } from 'react';
import './carousel.css';

// 슬라이드 내용 데이터, 추가하면 자동으로 슬라이드에 추가됨
    //id : 고유 숫자
    //title, text, linktext : 설명 글자
    //bk_color: 색(배경)
const slidesData = [
    { id: 1, title: "다른 견주들의 이야기를 보러가요!", text: "간단한 질문에 수의사가 남긴 답변으로 고민해결", linktext: "커뮤니티 바로가기", img: "/img/bear.png", bk_color: "rgb(104, 23, 27)"},
    { id: 2, title: "알러지 강아지를 위한 '마이펫두' 사료", text: "나의 강아지 건강을 위한 현명한 선택", linktext: "마이펫두 구매하러가기", img: "/img/cat.png", bk_color: "rgb(23, 66, 104)" },
    { id: 3, title: "내 강아지의 기록을 관리해보아요", text: "상담과 건강체크 기록부터 달력에 간단한 메모까지", linktext: "기록 바로보기", img: "/img/dog.png", bk_color: "rgb(23, 104, 69)" }   
];

//슬라이드 (슬라이드 내용 + 이미지)
const Slide = ({ title, text, linktext, img, bk_color }) => (
    <div className="slide" style={{ backgroundColor: bk_color }}>
        <div className="slide_content">
            <div className="slide_title">{title}</div>
            <div className="slide_text">{text}</div>
            <div className="slide_linktext">{linktext}</div>
        </div>
        <div style={{ backgroundImage: `url(${img})` }} className="slide_img"></div>
    </div>
);

//슬라이드 넘길 수 있는 버튼, 활성화 시 active 클래스 부여 및 길이 변화
const CarouselButtons = ({ imgNum, current, handleButtonClick }) => (
    <div className="button_con">
        {/* 슬라이드 개수(imgNum) 만큼 버튼 동적 생성 */}
        {[...Array(imgNum)].map((_, index) => (
            <button
                key={index}
                className={`carousel_but ${current === index + 1 ? 'active' : ''}`}
                onClick={() => handleButtonClick(index)}
            ></button>
        ))}
    </div>
);

export default function Carousel() {
    const containerRef = useRef(null);
    //현재 활성화된 슬라이드 번호
    const [current, setCurrent] = useState(1);
    //슬라이드 데이터 개수(길이만큼)
    const imgNum = slidesData.length;

    //carousel_container를 움직임 좌우로 이동하는 클래스
    const moveContainer = (percent) => {
        if (containerRef.current) {
            containerRef.current.style.transform = `translateX(${percent}%)`;
        }
    };

    //버튼 누르면 이동
    const handleButtonClick = (index) => {
        moveContainer(-(100 / imgNum) * index);
        setCurrent(index + 1);
    };

    //슬라이드 오른쪽으로 한칸 이동(마지막 슬라이드 시 맨앞으로 가기)
    const rightClick = () => {
        if (current < imgNum) {
            moveContainer(-current * (100 / imgNum));
            setCurrent(current + 1);
        } else {
            moveContainer(0);
            setCurrent(1);
        }
    };
    // 왼쪽버튼(왼쪽 슬라이드로 이동)
    // const leftClick = () => {
    //     if (current > 1) {
    //         moveContainer(-(current - 2) * 100 / imgNum);
    //         setCurrent(current - 1);
    //     } else {
    //         moveContainer(-(imgNum - 1) * 100 / imgNum);
    //         setCurrent(imgNum);
    //     }
    // };

    //rightClick(오른쪽 슬라이드로 이동)을 일정 시간마다 반복
    useEffect(() => {
        const interval = setInterval(rightClick, 3000);
        return () => clearInterval(interval);
    }, [current]);

    return (
        <div className="carousel_box">
            {/* 보여주는 부분 (넘치는 부분 hidden) */}
            <div className="carousel_content">
                {/* 슬라이드 나열 */}
                <div className="carousel_container" ref={containerRef} style={{ width: `${imgNum * 100}%`}}>
                    {slidesData.map(slide => (
                        <Slide
                            key={slide.id}
                            title={slide.title}
                            text={slide.text}
                            linktext={slide.linktext}
                            img={slide.img}
                            bk_color={slide.bk_color}
                        />
                    ))}
                </div>
            </div>
            {/* 슬라이드 이동하는 버튼 */}
            <div className="pad">
                <CarouselButtons imgNum={imgNum} current={current} handleButtonClick={handleButtonClick} />
            </div>
        </div>
    );
}
