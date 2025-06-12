const SkillsCard = props => {
  const { skillDetails } = props
  const { name, imageUrl } = skillDetails

  return (
    <li className="flex flex-col items-center w-[30%] mb-12">
      <div className="flex items-center">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-15 mr-5"
        />
        <p className="text-white text-lg font-roboto mt-5">
          {name}
        </p>
      </div>
    </li>
  )
}

export default SkillsCard