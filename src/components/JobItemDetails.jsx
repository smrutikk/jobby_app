import { Component } from 'react';
import Cookies from 'js-cookie';
import { AiFillStar } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { BsBriefcaseFill } from 'react-icons/bs';
import { BiLinkExternal } from 'react-icons/bi';
import Loader from 'react-loader-spinner';
import SkillsCard from  './SkillsCard';
import Header from '../Header';
import SimilarJobItem from '../SimilarJobItem';

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
};

class JobItemDetails extends Component {
  state = {
    jobItemList: {},
    similarJobItemList: [],
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getJobItem();
  }

  getFormattedSkillData = (data) => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    rating: data.rating,
    location: data.location,
    title: data.title,
  });

  getFormattedData = (data) => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map((eachSkill) => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  });

  getJobItem = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const jwtToken = Cookies.get('jwt_token');
    const url = `https://apis.ccbp.in/jobs/${id}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const data = await response.json();
      const updatedData = this.getFormattedData(data.job_details);
      const updatedSkillData = data.similar_jobs.map((eachSimilarJob) =>
        this.getFormattedSkillData(eachSimilarJob)
      );
      this.setState({
        jobItemList: updatedData,
        similarJobItemList: updatedSkillData,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  renderJobItemDetails = () => {
    const { jobItemList, similarJobItemList } = this.state;
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      title,
      rating,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = jobItemList;
    const { description, imageUrl } = lifeAtCompany;

    return (
      <div className="flex flex-col m-[60px]">
        <div className="bg-gray-800 rounded-xl mb-6 p-11">
          <div className="flex items-center">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="w-20 mr-6"
            />
            <div className="flex flex-col">
              <h1 className="text-white text-2xl font-bold mb-2">{title}</h1>
              <div className="flex items-center">
                <AiFillStar className="text-yellow-500 text-xl" />
                <p className="text-white ml-2 text-xl">{rating}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center my-4">
            <div className="flex">
              <div className="flex items-center mr-4">
                <GoLocation className="text-white text-xl" />
                <p className="text-white ml-2">{location}</p>
              </div>
              <div className="flex items-center">
                <BsBriefcaseFill className="text-white text-xl" />
                <p className="text-white ml-2">{employmentType}</p>
              </div>
            </div>
            <p className="text-white text-xl">{packagePerAnnum}</p>
          </div>
          <hr className="border-gray-600 my-4" />
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-white text-xl font-bold">Description</h1>
            <a
              className="text-blue-400 font-bold flex items-center"
              href={companyWebsiteUrl}
            >
              Visit
              <BiLinkExternal className="ml-1" />
            </a>
          </div>
          <p className="text-white text-lg leading-relaxed">{jobDescription}</p>
          <h1 className="text-white text-xl font-bold mt-6 mb-4">Skills</h1>
          <ul className="flex flex-wrap gap-6">
            {skills.map((eachSkill) => (
              <SkillsCard key={eachSkill.name} skillDetails={eachSkill} />
            ))}
          </ul>
          <h1 className="text-white text-xl font-bold mt-6">
            Life at company
          </h1>
          <div className="flex mt-4">
            <p className="text-white text-lg flex-1 mr-4">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="w-80 h-64 rounded-lg"
            />
          </div>
        </div>
        <h1 className="text-white text-xl font-bold mt-6 mb-4">Similar Jobs</h1>
        <ul className="flex flex-wrap gap-6">
          {similarJobItemList.map((eachItem) => (
            <SimilarJobItem key={eachItem.id} jobDetails={eachItem} />
          ))}
        </ul>
      </div>
    );
  };

  renderFailureView = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="w-1/2 max-w-md mb-6"
      />
      <h1 className="text-white text-2xl font-bold mb-3">
        Oops! Something Went Wrong
      </h1>
      <p className="text-white text-lg mb-6">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="bg-indigo-600 text-white font-bold py-2 px-4 rounded"
        onClick={this.getJobItem}
      >
        Retry
      </button>
    </div>
  );

  renderLoadingView = () => (
    <div className="flex justify-center items-center mt-20" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  );

  renderJobViews = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="bg-black min-h-screen flex flex-col items-center">
          {this.renderJobViews()}
        </div>
      </>
    );
  }
}

export default JobItemDetails;