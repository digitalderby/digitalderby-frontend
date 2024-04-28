import React, { useState, useEffect } from 'react'
import './userProfile.css'
import { getProfileData } from '../../services/apiService'

const UserProfile = () => {
  const [profileData, setProfileData] = useState()
  //TODO: implement fetching by userID
  useEffect(() => {
    const fetchData = async() => {
      const apiResponse = await getProfileData()
      console.log(apiResponse)
      setProfileData(apiResponse)
    }
    fetchData()
  }, [])

  // TODO: display profile data here
  return (
    <div className=''>
      <h2>User Profile</h2>
    </div>
  )
}

export default UserProfile