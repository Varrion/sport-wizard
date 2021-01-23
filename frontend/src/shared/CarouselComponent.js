import React from "react";
import {Carousel} from "react-bootstrap";
import CarouselImg1 from "./../shared/images/59883abced4a35d74a49a32c72066584.jpg";
import CarouselImg2 from "./../shared/images/CxSEJakWgAAZtF-.jpg";
import CarouselImg3 from "./../shared/images/feel-the-future-hp-mh-d_tcm205-555715-800x400.jpg";

const CarouselComponent = () => {
    return (
        <Carousel className={"carousel-rounded"}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={CarouselImg1}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={CarouselImg2}
                    alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={CarouselImg3}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselComponent;
