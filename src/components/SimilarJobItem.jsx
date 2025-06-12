import { AiFillStar } from 'react-icons/ai'
import { BsBriefcaseFill } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'

const SimilarJobItem = props => {
  const { jobDetails } = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = jobDetails

  return (
    <li className="bg-gray-800 m-5 p-7 w-[370px] rounded-xl">
      <div className="flex items-center mb-4">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="w-15 mr-5"
        />
        <div>
          <h1 className="text-white text-2xl font-bold font-roboto">{title}</h1>
          <div className="flex items-center mt-1">
            <AiFillStar className="text-yellow-400 text-xl" />
            <p className="text-white ml-1">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="text-white text-2xl font-roboto mb-4">Description</h1>
      <p className="text-white text-base font-roboto leading-relaxed">
        {jobDescription}
      </p>
      <div className="flex mt-4">
        <div className="flex items-center mr-6">
          <GoLocation className="text-white text-lg" />
          <p className="text-white ml-1">{location}</p>
        </div>
        <div className="flex items-center">
          <BsBriefcaseFill className="text-white text-lg" />
          <p className="text-white ml-1">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem