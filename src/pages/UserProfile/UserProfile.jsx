import React, { useState, useEffect } from "react";
import "./userProfile.css";
import { getProfileData } from "../../services/apiService";

const UserProfile = () => {
  const [profileData, setProfileData] = useState();

  //TODO: implement fetching by userID
  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await getProfileData();
      console.log(apiResponse);
      setProfileData(apiResponse);
    };
    fetchData();
  }, []);

  // TODO: display profile data here
  return (
    <div className="flex grow flex-col">
      <h2>User Profile</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum id impedit
        natus quis voluptatum autem quia fuga molestiae nemo repudiandae
        laudantium, dignissimos excepturi aliquam suscipit, nihil modi, qui
        animi quaerat!
      </p>
    </div>
  );
};

export default UserProfile;
