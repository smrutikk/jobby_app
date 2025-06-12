import ProfileDetails from './ProfileDetails'

const JobsFilterGroup = ({ 
  employmentTypesList, 
  salaryRangesList, 
  changeEmploymentType, 
  changeSalaryRange 
}) => {
  return (
    <div className="w-full max-w-xs space-y-6">
      {/*<ProfileDetails />*/}
      
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
          Type of Employment
        </h3>
        <ul className="space-y-3">
          {employmentTypesList.map(employ => (
            <li key={employ.employmentTypeId} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 rounded border-gray-600 focus:ring-indigo-500 bg-gray-700"
                id={employ.employmentTypeId}
                value={employ.employmentTypeId}
                onChange={(e) => changeEmploymentType(e.target.value)}
              />
              <label htmlFor={employ.employmentTypeId} className="ml-3 text-gray-300">
                {employ.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
          Salary Range
        </h3>
        <ul className="space-y-3">
          {salaryRangesList.map(salary => (
            <li key={salary.salaryRangeId} className="flex items-center">
              <input
                type="radio"
                className="h-4 w-4 text-indigo-600 border-gray-600 focus:ring-indigo-500 bg-gray-700"
                id={salary.salaryRangeId}
                name="salary"
                onChange={() => changeSalaryRange(salary.salaryRangeId)}
              />
              <label htmlFor={salary.salaryRangeId} className="ml-3 text-gray-300">
                {salary.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default JobsFilterGroup