import React from "react";



export const BannerHome = () => {
  const tweets = [
    {
      
      username: "Emanuel_1",
      Name: "Emanuel",
      content: "Holaaa",
      photoUrl: "",
    },
  
    {
      
      Name: "Anthony",
      username: "thony@",
      content: "Antonio",
      photoUrl: "",
    },
    {
      
      Name: "majo",
      username: "majo@",
      content: "componente",
      photoUrl: "",
    },
    {
      
      Name: "ricardo",
      username: "richi@",
      content: "ricardito holagit",
      photoUrl: "",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
     <div className="mx-8">
     <div className="text-center">
     <h1 className="font-bold text-2xl text-white">RECOMMENDED TWEETS</h1>
    </div>

      <div className="mt-6 space-y-4 flex flex-col items-center">
        {tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="flex items-start p-4 bg-white shadow-md rounded-lg border border-gray-200 w-96"
          >
            <img
              src={tweet.photoUrl} 
              alt="User Photo"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{tweet.Name}</span>
                <span className="text-gray-500 text-sm">{tweet.username}</span>
              </div>
              <p className="text-gray-700 mt-1">{tweet.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};
