import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CardProduct } from "../common/CardProduct";

export const BestRatedHome = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const ProducData = [
    {
      id: 1,
      imageurl: "Rbox.jpg",
      name: "Title1",
      description: "aaa",
    },
    {
      id: 2,
      imageurl: "Rnin.jpg",
      name: "Title2",
      description: "aaa",
    },
    {
      id: 3,
      imageurl: "rplay.jpg",
      name: "Title3",
      description: "aaa",
    },
    {
      id: 4,
      imageurl: "portatil2.jpg",
      name: "Title4",
      description: "aaa",
    },
    {
      id: 5,
      imageurl: "reloj3.jpg",
      name: "Title5",
      description: "aaa",
    },
    {
      id: 6,
      imageurl: "reloj2.jpg",
      name: "Title5",
      description: "aaa",
    },
    {
      id: 7,
      imageurl: "reloj.jpg",
      name: "Title5",
      description: "aaa",
    },
  ];

  const card = ProducData.map((item) => (
    <CardProduct
      name={item.name}
      url={item.imageurl}
      description={item.description}
    />
  ));
  return (
    <div>
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">Best rated</h1>
        <h2 className="text-lg text-gray-500 ml-auto">All</h2>
      </div>

      <Carousel responsive={responsive}>{card}</Carousel>
    </div>
  );
};
