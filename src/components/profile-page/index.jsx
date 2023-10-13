import React, { useState, useEffect } from "react";


function Profile({ id }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const defaultAvatar = "src/assets/defaultprofilepic.png";
  const personName = "UrS_Admin";
  const defaultstring = "the API does not provide the data"

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI3MiwibmFtZSI6IktoYWRhciIsImVtYWlsIjoiS2hhZGFyQHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY5NjkzNDEwMH0.LBn5-HZyYjJT9RUFrid6F7NBvMSnNls-Bzx06FAQ_j0";

    fetch(`https://api.noroff.dev/api/v1/social/profiles/${personName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setProfile(responseData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 mx-auto bg-white max-w-7xl">
      {loading ? (
        <p>Loading...</p>
      ) : profile ? (
        <div> 
          <div className="flex flex-row justify-start w-full">
            <h3 className="mb-4 text-2xl font-semibold tracking-wide text-black">
              {profile.name}
            </h3>
          </div>
          <div className="justify-center w-full gap-4 md:flex md:items-center">
          <div className="relative w-full md:w-4/5">
          <img
            src={profile.avatar || defaultAvatar}
            alt={`${profile.name}'s profile picture`}
            className="object-cover rounded md:h-96"
          />
          </div>

          <div className="flex-col w-full p-4 mt-4 rounded bg-slate-50 md:w-4/5 md:mt-0 md:h-96">
            <h4 className="text-lg font-semibold">About me</h4>
            <p className="mt-4"> <span className="font-semibold">Age:</span> {defaultstring}</p>
            <p className="mt-2"><span className="font-semibold">Gender:</span> {defaultstring}</p>
            <p className="mt-2"><span className="font-semibold">Occupation:</span> {defaultstring}</p>
            <p className="mt-2"><span className="font-semibold">Email:</span> <span className="text-blue-700 duration-100 transform cursor-pointer hover:font-semibold">{profile.email}</span></p>
            <div className="w-full md:w-full">
              <p className="mt-10 text-sm">
              This is some lorem ipsum because the api does not provide a bio for the profile.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique dignissim sem eget eleifend. Praesent a nisi ut quam pellentesque fringilla. Suspendisse risus ligula, volutpat vitae magna eget, mattis fermentum diam. Integer gravida augue non laoreet sollicitudin. 
              </p>
            </div>
          </div>
          </div>
        </div>
      ) : (
        <p>Profile not found</p>
      )}
    </main>
  );
}

export default Profile;
