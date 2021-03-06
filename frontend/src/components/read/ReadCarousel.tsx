import React from "react";
import Carousel from "nuka-carousel";
// import thumbnail from "../img/thumbnail.jpg";
import "./ReadCarousel.css";

interface Props {
  book: any;
  className: string;
  movePage: (value: number) => void;
  page: number;
}

function Readcarousel(props: Props) {
  const fontstyle = {
    fontSize: props.className,
  };
  const nextPage = (e: any) => {
    console.log(e);
    props.movePage(e);
  };
  return (
    <div className="read-carousel">
      <Carousel
        afterSlide={nextPage}
        defaultControlsConfig={{
          nextButtonText: ">",
          prevButtonText: "<",
        }}
        slideIndex={props.page}
        scrollMode="page"
        renderBottomCenterControls={null}
        heightMode="max"
      >
        <div className="image-container">
          {/* <h1 id="book">{props.book.title}</h1> */}
          <img className="cover" src={props.book.cover} alt="thumbnail"></img>
        </div>
        {props.book.bookbody.map((body: any, i: number) => {
          return (
            <div>
              <p className={props.className} id={`${i}`} style={fontstyle}>
                {body.content}
              </p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Readcarousel;
