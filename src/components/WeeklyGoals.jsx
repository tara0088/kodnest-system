import React from 'react';

const WeeklyGoals = () => {
  const solved = 12;
  const total = 20;
  const percentage = (solved / total) * 100;
  
  // Mock activity data - 1 = active, 0 = inactive
  const weeklyActivity = [1, 1, 0, 1, 1, 0, 1]; // Mon, Tue, Wed, Thu, Fri, Sat, Sun
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Weekly Goals</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Problems Solved</span>
            <span>{solved}/{total} this week</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-3">This Week's Activity</p>
          <div className="flex justify-between">
            {days.map((day, index) => (
              <div key={day} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                  weeklyActivity[index] 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {day.charAt(0)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyGoals;