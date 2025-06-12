import { Component } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { BsSearch } from 'react-icons/bs'
import Cookies from 'js-cookie'
import JobCard from  './JobCard'
import JobsFilterGroup from './JobFilterGroup'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobProfileSection extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    employmentType: [],
    salaryRange: 0,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const { salaryRange, employmentType, searchInput } = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    //const url = 'https://api.upwork.com/graphql'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSearchInput = event => {
    this.setState({ searchInput: event.target.value })
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  changeSalaryRange = salary => {
    this.setState({ salaryRange: salary }, this.getJobDetails)
  }

  changeEmploymentType = type => {
    this.setState(
      prev => ({ employmentType: [...prev.employmentType, type] }),
      this.getJobDetails,
    )
  }

  renderJobDetails = () => {
    const { jobsList, searchInput } = this.state
    const jobsDisplay = jobsList.length > 0

    return jobsDisplay ? (
      <div >
        <div className="flex self-start w-[500px] rounded-lg p-2.5 outline-none text-base text-white ml-5 mb-4 mt-4 border border-gray-500">
          <input
            type="search"
            className="bg-transparent text-white font-medium border-none outline-none flex-grow px-4 py-1.5 w-[450px]"
            placeholder="Search"
            value={searchInput}
            onChange={this.changeSearchInput}
            onKeyDown={this.onKeyDown}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="bg-transparent border-none"
            onClick={this.getJobDetails}
          >
            <BsSearch className="text-white text-xl" />
          </button>
        </div>
        <ul className="list-none flex flex-wrap">
          {jobsList.map(eachData => (
            <JobCard key={eachData.id} jobDetails={eachData} />
         ))} 
         <JobCard jobDetails={jobsList[0]} />
        </ul>
      </div>
    ) : (
      <div className="flex flex-col justify-center items-center w-[1000px]">
        <div className="flex bg-transparent w-[500px] rounded-lg p-2.5 outline-none text-base text-white ml-5 mb-4 mt-4 border border-gray-500">
          <input
            type="search"
            className="bg-transparent text-white font-medium border-none outline-none flex-grow px-4 py-1.5 w-[450px]"
            placeholder="Search"
            value={searchInput}
            onChange={this.changeSearchInput}
            onKeyDown={this.onKeyDown}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="bg-transparent border-none"
            onClick={this.getJobDetails}
          >
            <BsSearch className="text-white text-xl" />
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="w-[400px]"
        />
        <h1 className="text-4xl font-bold text-white mt-4">No Jobs Found</h1>
        <p className="text-lg text-white mt-2">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="flex flex-col justify-center items-center">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="w-[400px]"
      />
      <h1 className="text-4xl font-bold text-white mt-4">Oops! Something Went Wrong</h1>
      <p className="text-xl text-white mt-2">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        data-testid="button"
        className="bg-indigo-600 border-none w-[150px] py-3 text-base font-normal text-white mt-4"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="flex justify-center items-center mt-48" data-testid="loader">
      <ThreeDots color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobProfileDetailsList = () => {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const { searchInput } = this.state
    return (
      <div className="p-4 flex justify-between">
        <div className="flex flex-col">
          <JobsFilterGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
            searchInput={searchInput}
            changeSearchInput={this.changeSearchInput}
            getJobDetails={this.getJobDetails}
          />
        </div>
        <div className="flex flex-col items-end w-[60%]">
          {this.renderJobProfileDetailsList()}
        </div>
      </div>
    )
  }
}

export default JobProfileSection