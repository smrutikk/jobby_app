import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
//import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const navigate = useNavigate()
  //const { theme , toggleTheme } = useTheme()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true })
  }

  return (
    <nav className="w-screen bg-gray-800 flex items-center justify-between py-2 px-4">
      <div>
        <Link to="/" className="no-underline">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="w-36 h-10 mt-2 ml-24"
          />
        </Link>
      </div>
      <ul className="flex items-center list-none m-0 mr-32">
        <Link to="/" className="no-underline">
          <li className="text-white text-lg font-medium font-roboto mx-6 hover:text-indigo-300 transition-colors">
            Home
          </li>
        </Link>
        <Link to="/jobs" className="no-underline">
          <li className="text-white text-lg font-medium font-roboto mx-6 hover:text-indigo-300 transition-colors">
            Jobs
          </li>
        </Link>
      </ul>
      <div>
        <button
          type="button"
          className="bg-red-600 px-4 py-2 rounded-md text-white font-medium font-roboto border-none mr-14 w-28 hover:bg-red-700 transition-colors"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header