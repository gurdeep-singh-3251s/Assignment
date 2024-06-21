import React, { useState, useEffect } from 'react';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const positions = ['Developer', 'Designer', 'Manager'];
  const skills = ['JavaScript', 'CSS', 'Python', 'React', 'Node.js'];

  useEffect(() => {
    setErrors({});
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        additionalSkills: checked
          ? [...formData.additionalSkills, value]
          : formData.additionalSkills.filter((skill) => skill !== value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if ((formData.position === 'Developer' || formData.position === 'Designer') && (!formData.relevantExperience || formData.relevantExperience <= 0)) {
      newErrors.relevantExperience = 'Relevant Experience is required and must be greater than 0';
    }
    if (formData.position === 'Designer' && (!formData.portfolioURL || !/^https?:\/\/.+\..+/.test(formData.portfolioURL))) {
      newErrors.portfolioURL = 'A valid Portfolio URL is required';
    }
    if (formData.position === 'Manager' && !formData.managementExperience) {
      newErrors.managementExperience = 'Management Experience is required';
    }
    if (formData.additionalSkills.length === 0) {
      newErrors.additionalSkills = 'At least one skill must be selected';
    }
    if (!formData.preferredInterviewTime) newErrors.preferredInterviewTime = 'Preferred Interview Time is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Applying for Position:</label>
          <select name="position" value={formData.position} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            <option value="">Select a position</option>
            {positions.map((position) => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </div>

        {(formData.position === 'Developer' || formData.position === 'Designer') && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Relevant Experience (years):</label>
            <input type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            {errors.relevantExperience && <span className="text-red-500 text-sm">{errors.relevantExperience}</span>}
          </div>
        )}

        {formData.position === 'Designer' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Portfolio URL:</label>
            <input type="text" name="portfolioURL" value={formData.portfolioURL} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            {errors.portfolioURL && <span className="text-red-500 text-sm">{errors.portfolioURL}</span>}
          </div>
        )}

        {formData.position === 'Manager' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Management Experience:</label>
            <textarea name="managementExperience" value={formData.managementExperience} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
            {errors.managementExperience && <span className="text-red-500 text-sm">{errors.managementExperience}</span>}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Skills:</label>
          <div className="mt-1 space-y-2">
            {skills.map((skill) => (
              <label key={skill} className="inline-flex items-center">
                <input type="checkbox" name="additionalSkills" value={skill} checked={formData.additionalSkills.includes(skill)} onChange={handleInputChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                <span className="ml-2 p-2">{skill}</span>
              </label>
            ))}
          </div>
          {errors.additionalSkills && <span className="text-red-500 text-sm">{errors.additionalSkills}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Interview Time:</label>
          <input type="datetime-local" name="preferredInterviewTime" value={formData.preferredInterviewTime} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          {errors.preferredInterviewTime && <span className="text-red-500 text-sm">{errors.preferredInterviewTime}</span>}
        </div>

        <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700">Submit</button>
      </form>

      {submittedData && (
        <div className="mt-8 p-4 bg-gray-100 rounded-md shadow-md">
          <h2 className="text-lg font-medium text-gray-700">Submission Summary:</h2>
          <div className="bg-white p-4 rounded-md shadow-inner space-y-2">
            <p><strong>Full Name:</strong> {submittedData.fullName}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Event Date:</strong> {submittedData.preferredInterviewTime}</p>
            <p><strong>Attending:</strong> {submittedData.attending ? 'Yes' : 'No'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
