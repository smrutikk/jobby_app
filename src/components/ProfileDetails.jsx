import { Component } from 'react'
import { ThreeDots } from 'react-loader-spinner'  
import Cookies from 'js-cookie'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileDetails extends Component {
  state = {
    profileList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileList: profileData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderProfileDetails = () => {
    const { profileList } = this.state
    const { name, profileImageUrl, shortBio } = profileList

    return (
      <div 
        className="w-[300px] self-start rounded-[15px] p-5 mb-[25px]"
        style={{
          backgroundImage: "url('https://assets.ccbp.in/frontend/react-js/profile-bg.png')",
          backgroundSize: "cover"
        }}
      >
        <img src={profileImageUrl} alt="profile" className="w-[50px]" />
        <h1 className="text-[#6366f1] text-[22px] font-roboto font-extrabold mt-[15px]">
          {name}
        </h1>
        <p className="text-[#475569] text-[16px] font-roboto mt-[15px] leading-[1.8]">
          {shortBio}
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div 
      className="flex justify-center items-center mt-[200px]" 
      testid="loader"
    >
      <ThreeDots 
        height="50" 
        width="50" 
        radius="9"
        color="#ffffff" 
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <button
        type="button"
        testid="button"
        className="bg-[#6366f1] py-3 w-[110px] border-none text-white text-[16px] font-roboto font-medium rounded-[6px]"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default ProfileDetails