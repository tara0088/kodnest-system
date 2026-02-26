import React from 'react';
import { Code, Video, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8 text-primary-500" />,
      title: "Practice Problems",
      description: "Solve coding challenges and technical problems"
    },
    {
      icon: <Video className="w-8 h-8 text-primary-500" />,
      title: "Mock Interviews",
      description: "Practice with realistic interview simulations"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-500" />,
      title: "Track Progress",
      description: "Monitor your improvement with detailed analytics"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ace Your Placement
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-primary-100">
              Practice, assess, and prepare for your dream job
            </p>
            <Link to="/dashboard">
              <button className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 Placement Readiness Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;