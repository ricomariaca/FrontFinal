import images from "../../../assets/images";
import { Navbar } from "../../../ui/components/common/Navbar";

export const UserPerfile = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-300 min-h-screen flex flex-col items-center">
        <div className="w-full h-24 bg-gray-800"></div>
                
        <div className="relative -mt-10 w-11/12 bg-gray-200 rounded-md shadow-md p-4 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={images.img5} 
                className="w-16 h-16 rounded-full border-2 border-white"
                alt="Profile"
              />
              <div>
                <h2 className="text-lg font-bold">mariajose</h2>
                <p className="text-gray-600">@majito</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-2 text-gray-700">
            <p>
              <span className="font-bold">99</span> Following
            </p>
            <p>
              <span className="font-bold">7.5M</span> Followers
            </p>
          </div>
        </div>

       
        <div className="mt-6 w-1/2">
          <div className="bg-gray-200 rounded-md shadow-md p-4 mb-4">
            <h3 className="font-bold">bondad mayo</h3>
            <p className="text-gray-600">tenemos que ser buenas personas</p>
          </div>
        </div>
      </div>
    </>
  );
};


