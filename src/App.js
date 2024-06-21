import React from 'react';
import EventRegistrationForm from './components/EventRegistrationForm';
import JobApplicationForm from './components/JobApplicationForm';
import SurveyForm from './components/SurveyForm';
import './index.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center space-y-16">
      <section className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-8">Level 1: Event Registration Form</h2>
        <EventRegistrationForm />
      </section>

      <section className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-8">Level 2: Job Application Form</h2>
        <JobApplicationForm />
      </section>

      <section className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-8">Level 3: Survey Form</h2>
        <SurveyForm />
      </section>
    </div>
  );
};

export default App;
