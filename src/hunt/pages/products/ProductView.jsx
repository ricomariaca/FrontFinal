import { ImgGallery } from "../../../ui/components/products/ImgGallery";
import { Navbar } from "../../../ui/components/common/Navbar";
import { StarRating } from "../../../ui/components/common/StarRating";
import { BsChatRight } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
//import { ProductContext, ReviewContext, FollowContext } from "../../context";
import { useForm } from "../../../hooks";
import icons from "../../../assets/icons";
import { loadReview } from "../../helpers/loadReview";
import { AuthContext } from "../../../auth";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const newEmptyReview = {
  Review: "",
  star: "",
};

export const ProductView = () => {
  const location = useLocation();
  const { key, name, body, url, description, userName, UrlPhoto, IdUser } =
    location.state || {};

  const { logged, user } = useContext(AuthContext);
  //const { saveReview, user } = useContext(ReviewContext);
  //const { product, ProductDescription } = useContext(ProductContext);
  // const { saveFollow } = useContext(FollowContext);

  const { Review, star, onInputChange } = useForm(newEmptyReview);
  const [review, setReview] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false); // Estado para gestionar si se sigue al usuario

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const productsData = await loadReview();
        setReview(productsData);
      } catch (error) {
        console.error("Error fetching Review", error);
      }
    };
    fetchReview();

    // Leer el estado de seguimiento desde localStorage
    /*const followingState = localStorage.getItem(`following_${IdUser}`);
    if (followingState) {
      setIsFollowing(JSON.parse(followingState));
    }
    */
  }, [IdUser]);

  const onCreateReview = async (event) => {
    event.preventDefault();

    const newReview = {
      Review: Review,
      userId: user.uid,
      star: star,
    };
    await saveReview(newReview);
  };

  const handleRatingChange = (rating) => {
    onInputChange({ target: { name: "star", value: rating } });
  };

  const onCreateFollowing = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/api/createfollowing",
        {
          usernameSeguidor: user.username,
          usernameSeguido: name,
          body: url,
        }
      );
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="bg-teal-600 h-5"></div>

      <div className="grid grid-cols-4">
        <div className="col-span-2"></div>

        <div className="my-14 ">
          <h1 className="font-bold">Username</h1>
          <span>{name}</span>

          <div className="my-8"></div>
          <div className="flex items-center">
            <img
              src={icons.user}
              alt="User Icon"
              className="w-8 h-8 cursor-pointer rounded-full"
            />

            <>
              {!logged && (
                <>
                  <label htmlFor=""></label> <br />
                  <Link to="/login" className="text-md text-blue-500">
                    Seguir
                  </Link>
                </>
              )}

              {logged && (
                <button className="text-blue-500" onClick={onCreateFollowing}>
                  Seguir
                </button>
              )}
            </>
          </div>
          <div className="my-8">
            <p className="font-bold">description</p>
            <span>{url}</span>
          </div>
        </div>
        <div className="max-w-screen-md mx-auto my-auto p-4"></div>
      </div>

      <div className="bg-gray-600 h-0.5 opacity-15"></div>

      <div className="grid grid-cols-2">
        <div className="my-3 ml-10 ">
          <div className="flex items-center">
            <img
              src={user?.photoURL}
              className="w-8 h-8 cursor-pointer rounded-full mr-2"
            />
            <span className="mr-4">{user?.displayName}</span>
          </div>
        </div>
      </div>
    </>
  );
};
