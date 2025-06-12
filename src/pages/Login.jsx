import { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate, Navigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    navigate('/', { replace: true })
  }

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }

  const onSubmitForm = async (event) => {
    event.preventDefault()
    const userDetails = { username, password }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen w-screen bg-black flex justify-center items-center">
      <div className="flex flex-col items-center bg-gray-800 p-16 rounded-xl">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="w-36 mb-6"
        />
        <form className="flex flex-col mt-8" onSubmit={onSubmitForm}>
          <div className="flex flex-col mb-6">
            <label className="text-white text-sm font-roboto font-normal mb-2" htmlFor="userName">
              USERNAME
            </label>
            <input
              type="text"
              id="userName"
              placeholder="Username"
              className="bg-transparent border border-indigo-400 w-80 rounded px-3 py-2 text-white outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-6">
            <label className="text-white text-sm font-roboto font-normal mb-2" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="bg-transparent border border-indigo-400 w-80 rounded px-3 py-2 text-white outline-none"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-indigo-600 py-2 rounded-lg text-white font-roboto font-medium mt-2 hover:bg-indigo-700 transition-colors"
            type="submit"
          >
            Login
          </button>
          {showSubmitError && (
            <p className="text-red-500 text-xs font-roboto mt-1 self-start">*{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default LoginForm