import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  
  if (!jwtToken) {
    return <Navigate to="/login" replace />
  }

  return ( 
    <>
      <Header />
      <div className="min-h-screen w-screen bg-[url('https://assets.ccbp.in/frontend/react-js/home-lg-bg.png')] bg-cover h-[95vh]">
        <div className="flex flex-col justify-center w-[650px] p-4 ml-6">
          <h1 className="text-white text-6xl font-bold font-roboto mt-8">
            Find The Job That Fits Your Life
          </h1>
          <p className="text-white text-2xl font-normal font-roboto leading-relaxed mt-6">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs" className="no-underline">
            <button
              type="button"
              className="bg-indigo-600 text-white font-medium font-roboto px-6 py-4 rounded-lg mt-9 w-36 text-base border-none hover:bg-indigo-700 transition-colors"
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home