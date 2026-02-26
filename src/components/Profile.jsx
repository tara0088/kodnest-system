import React from 'react';

const Profile = () => {
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Settings</h3>
          <p className="text-gray-600">Update your personal information and preferences.</p>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Achievements</h3>
          <p className="text-gray-600">View your completed milestones and earned badges.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;