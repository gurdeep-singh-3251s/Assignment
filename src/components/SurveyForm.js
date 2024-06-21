import React, { useState, useEffect } from 'react';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  const surveyTopics = ['Technology', 'Health', 'Education'];
  const languages = ['JavaScript', 'Python', 'Java', 'C#'];
  const exerciseFrequencies = ['Daily', 'Weekly', 'Monthly', 'Rarely'];
  const dietPreferences = ['Vegetarian', 'Vegan', 'Non-Vegetarian'];
  const qualifications = ['High School', "Bachelor's", "Master's", 'PhD'];

  useEffect(() => {
    setErrors({});
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.surveyTopic) newErrors.surveyTopic = 'Survey Topic is required';

    if (formData.surveyTopic === 'Technology') {
      if (!formData.favoriteLanguage) newErrors.favoriteLanguage = 'Favorite Programming Language is required';
      if (!formData.yearsOfExperience || formData.yearsOfExperience <= 0) newErrors.yearsOfExperience = 'Years of Experience is required and must be greater than 0';
    }

    if (formData.surveyTopic === 'Health') {
      if (!formData.exerciseFrequency) newErrors.exerciseFrequency = 'Exercise Frequency is required';
      if (!formData.dietPreference) newErrors.dietPreference = 'Diet Preference is required';
    }

    if (formData.surveyTopic === 'Education') {
      if (!formData.highestQualification) newErrors.highestQualification = 'Highest Qualification is required';
      if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'Field of Study is required';
    }

    if (!formData.feedback || formData.feedback.length < 50) newErrors.feedback = 'Feedback is required and must be at least 50 characters';

    return newErrors;
  };

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await fetch(`https://api.example.com/questions?topic=${topic}`);
      const data = await response.json();
      setAdditionalQuestions(data.questions);
    } catch (error) {
      console.error('Error fetching additional questions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      await fetchAdditionalQuestions(formData.surveyTopic);
      setSubmittedData(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-8 text-center">Survey Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={`mt-1 block w-full p-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
          {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Survey Topic:</label>
          <select name="surveyTopic" value={formData.surveyTopic} onChange={handleInputChange} className={`mt-1 block w-full p-2 border ${errors.surveyTopic ? 'border-red-500' : 'border-gray-300'} rounded-md`}>
            <option value="">Select a topic</option>
            {surveyTopics.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
          {errors.surveyTopic && <span className="text-red-500 text-sm">{errors.surveyTopic}</span>}
        </div>

        {formData.surveyTopic === 'Technology' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Favorite Programming Language:</label>
              <select name="favoriteLanguage" value={formData.favoriteLanguage} onChange={handleInputChange} className={`mt-1 block w-full p-2 border ${errors.favoriteLanguage ? 'border-red-500' : 'border-gray-300'} rounded-md`}>
                <option value="">Select a language</option>
                {languages.map((language) => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
              {errors.favoriteLanguage && <span className="text-red-500 text-sm">{errors.favoriteLanguage}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Years of Experience:</label>
              <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleInputChange} className={`mt-1 block w-full p-2 border ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
              {errors.yearsOfExperience && <span className="text-red-500 text-sm">{errors.yearsOfExperience}</span>}
            </div>
          </>
        )}

        {formData.surveyTopic === 'Health' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Exercise Frequency:</label>
              <select name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleInputChange} className={`mt-1 block w-full p-2 border ${errors.exerciseFrequency ? 'border-red-500' : 'border-gray-300'} rounded-md`}>
                <option value="">Select a frequency</option>
                {exerciseFrequencies.map((frequency) => (
                  <option key={frequency} value={frequency}>{frequency}</option>
                ))}
              </select>
              {errors.exerciseFrequency && <span className="text-red-500 text-sm">{errors.exerciseFrequency}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Diet Preference:</label>
              <select name="dietPreference" value={formData.dietPreference} onChange={handleInputChange} className={`mt-1 block w-full p-2 border ${errors.dietPreference ? 'border-red-500' : 'border-gray-300'} rounded-md`}>
                <option value="">Select a preference</option>
                {dietPreferences.map((preference) => (
                  <option key={preference} value={preference}>{preference}</option>
                ))}
              </select>
              {errors.dietPreference && <span className="text-red-500 text-sm">{errors.dietPreference}</span>}
            </div>
          </>
        )}

        {formData.surveyTopic === 'Education' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Highest Qualification:</label>
              <select name="highestQualification" value={formData.highestQualification} onChange={handleInputChange} className={`mt-1 block w-full p-2 border ${errors.highestQualification ? 'border-red-500' : 'border-gray-300'} rounded-md`}>
                <option value="">Select a qualification</option>
                {qualifications.map((qualification) => (
                  <option key={qualification} value={qualification}>{qualification}</option>
                ))}
              </select>
              {errors.highestQualification && <span className="text-red-500 text-sm">{errors.highestQualification}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Field of Study:</label>
              <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleInputChange} className={`mt-1 block w-full p-2 border ${errors.fieldOfStudy ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
              {errors.fieldOfStudy && <span className="text-red-500 text-sm">{errors.fieldOfStudy}</span>}
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Feedback:</label>
          <textarea name="feedback" value={formData.feedback} onChange={handleInputChange} className={`mt-1 block w-full p-2 border ${errors.feedback ? 'border-red-500' : 'border-gray-300'} rounded-md`} rows="4"></textarea>
          {errors.feedback && <span className="text-red-500 text-sm">{errors.feedback}</span>}
        </div>

        <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
      </form>

      {submittedData && (
        <div className="mt-8 p-4 bg-gray-100 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Submission Summary:</h2>
          <div className="bg-white p-4 rounded-md shadow-inner space-y-4">
            <p><strong>Full Name:</strong> {submittedData.fullName}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Survey Topic:</strong> {submittedData.surveyTopic}</p>

            {submittedData.surveyTopic === 'Technology' && (
              <>
                <p><strong>Favorite Programming Language:</strong> {submittedData.favoriteLanguage}</p>
                <p><strong>Years of Experience:</strong> {submittedData.yearsOfExperience}</p>
              </>
            )}

            {submittedData.surveyTopic === 'Health' && (
              <>
                <p><strong>Exercise Frequency:</strong> {submittedData.exerciseFrequency}</p>
                <p><strong>Diet Preference:</strong> {submittedData.dietPreference}</p>
              </>
            )}

            {submittedData.surveyTopic === 'Education' && (
              <>
                <p><strong>Highest Qualification:</strong> {submittedData.highestQualification}</p>
                <p><strong>Field of Study:</strong> {submittedData.fieldOfStudy}</p>
              </>
            )}

            <p><strong>Feedback:</strong> {submittedData.feedback}</p>
          </div>

          <h3 className="text-lg font-medium text-gray-700 mt-4">Additional Questions:</h3>
          {additionalQuestions.length > 0 ? (
            <ul className="list-disc pl-5 mt-2">
              {additionalQuestions.map((question, index) => (
                <li key={index} className="mt-2 text-gray-800">{question}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-600">No additional questions available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
