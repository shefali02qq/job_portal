import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import LatestJobCards from './LatestJobCards';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';

const INCLUSIVE_TAGS = ['PWD', 'WomenReturnee', 'LGBTQ+', 'EWS'];

const InclusiveJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (tags = []) => {
    setLoading(true);
    try {
      let url = `${JOB_API_END_POINT}/get?inclusiveOpportunity=true`;
      if (tags.length > 0) {
        url += `&inclusiveTags=${tags.join(',')}`;
      }
      const res = await axios.get(url, { withCredentials: true });
      if (res.data.success) {
        setJobs(res.data.jobs);
      }
    } catch (error) {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(selectedTags);
    // eslint-disable-next-line
  }, [selectedTags]);

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTags([...selectedTags, value]);
    } else {
      setSelectedTags(selectedTags.filter(tag => tag !== value));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto py-10">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
          Inclusive Job Opportunities
        </h1>
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-center justify-center">
          <div className="flex flex-wrap gap-4">
            {INCLUSIVE_TAGS.map(tag => (
              <label key={tag} className="flex items-center gap-2 text-gray-900 dark:text-gray-200">
                <input
                  type="checkbox"
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={handleTagChange}
                  className="accent-[#A084E8] w-4 h-4"
                />
                {tag}
              </label>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="text-center text-lg text-gray-700 dark:text-gray-300">Loading...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center text-lg text-gray-700 dark:text-gray-300">No inclusive jobs found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map(job => (
              <LatestJobCards key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InclusiveJobs; 