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
    <section className="flex grow flex-col items-center userProfile">
      <div className="w-4/5 h-full profile-box flex flex-col">
        <h2>USERNAME</h2>
        <div id="wallet">$100</div>
        <div className="flex grow flex-col justify-center">
          <div className="addtlStats">
            {/*additional info here */}
          </div>
          <div className="w-full text-center">
            <h3 className="border-y-2 border-black">BET LOG</h3>
          </div>
          <table id="betLog" className="p-5 border-b-2 border-black">
            <thead>
              <tr>
                <th scope="col">Game</th>
                <th scope="col">Horse</th>
                <th scope="col">Bet</th>
                <th scope="col">Returns</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>game data</td>
                <td>horse name</td>
                <td>Bet amount</td>
                <td>+200</td>
              </tr>
              <tr>
                <td>game data</td>
                <td>horse name</td>
                <td>Bet amount</td>
                <td>+200</td>
              </tr>
              <tr>
                <td>game data</td>
                <td>horse name</td>
                <td>Bet amount</td>
                <td>+200</td>
              </tr>
              <tr>
                <td>game data</td>
                <td>horse name</td>
                <td>Bet amount</td>
                <td>+200</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </section>
  );
};

export default UserProfile;
