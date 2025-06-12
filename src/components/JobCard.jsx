import { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { HiLocationMarker, HiMail } from 'react-icons/hi'

const JobCard = props => {
  const { jobDetails } = props

  if (!jobDetails) {
    return <div className="bg-gray-800 rounded-xl p-6 mx-4 w-[800px] mr-16">Loading job details...</div>
  }

  const {
    title,
    companyLogoUrl,
    rating,
    employmentType,
    location,
    id,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = (e) => {
    e.preventDefault()
    setShowDetails(!showDetails)
  }


  return (
    <Link to={`/jobs/${id}`} className="mb-6 flex flex-col no-underline">
      <li className="bg-gray-800 rounded-xl p-6 mx-4 w-[800px] mr-16 flex flex-col">
        <div className="flex items-center mb-8">
          <div>
            <img 
              src={companyLogoUrl} 
              alt="company logo" 
              className="w-16 mr-4" 
            />
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold">{title}</h1>
            <div className="flex items-center">
              <AiFillStar className="text-yellow-400 text-xl mt-1.5" />
              <p className="text-white text-lg font-medium ml-2 mt-2">{rating}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            <div className="flex items-center mr-4">
              <HiLocationMarker className="text-white text-xl" />
              <p className="text-white text-base ml-2">{location}</p>
            </div>
            <div className="flex items-center ml-8">
              <HiMail className="text-white text-xl" />
              <p className="text-white text-base ml-2">{employmentType}</p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-white text-base">{packagePerAnnum}</p>
          </div>
        </div>
        
        <button 
          onClick={toggleDetails}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 self-start"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        
        {showDetails && (
          <>
            <hr className="border border-gray-600 w-full my-4" />
            <h1 className="text-white text-2xl font-bold mt-4 mb-3">Description</h1>
            <p className="text-white text-base leading-relaxed">{jobDescription}</p>
          </>
        )}
      </li>
    </Link>
  )
}

export default JobCard