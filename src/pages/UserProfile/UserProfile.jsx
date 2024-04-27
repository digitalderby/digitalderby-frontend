import React, { useEffect } from 'react'
import './userProfile.css'
import { getProfileData } from '../../services/apiService'

const UserProfile = () => {
  const [profileData, setProfileData] = useState()

  useEffect(() => {
    const fetchData = async() => {
      const apiResponse = await getProfileData()
      console.log(apiResponse)
      setProfileData(apiResponse)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>User Profile</h2>
      // TODO: display profile data here
    </div>
  )
}

export default UserProfile