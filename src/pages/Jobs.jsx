import Header from  '../components/Header'
import JobProfileSection from  '../components/JobProfileSection'

const Jobs = () => (
  <>
    <Header />
    <div className="min-h-screen w-screen bg-black flex justify-around p-6">
      <JobProfileSection />
    </div>
  </>
)

export default Jobs