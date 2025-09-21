import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SleepForm from './features/sleep/SleepForm';
import { 
  selectAllEntries, 
  selectEntriesStatus, 
  selectSleepStatistics,
  loadEntries,
  formatSleepTime,
  formatDuration 
} from './features/sleep/sleepSlice';
import type { AppDispatch } from './app/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const entries = useSelector(selectAllEntries);
  const status = useSelector(selectEntriesStatus);
  const statistics = useSelector(selectSleepStatistics);

  useEffect(() => {
    dispatch(loadEntries());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sleep data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Baby Sleep Tracker</h1>
          <p className="text-gray-600">Track and monitor your baby's sleep patterns</p>
        </header>

        {/* Statistics Card */}
        {entries.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sleep Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{entries.length}</div>
                <div className="text-sm text-gray-600">Total Entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatDuration(statistics.totalDuration)}
                </div>
                <div className="text-sm text-gray-600">Total Sleep</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {formatDuration(statistics.averageDuration)}
                </div>
                <div className="text-sm text-gray-600">Avg. Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {statistics.napCount} / {statistics.nightCount}
                </div>
                <div className="text-sm text-gray-600">Naps / Nights</div>
              </div>
            </div>
          </div>
        )}

        {/* Sleep Form */}
        <SleepForm />

        {/* Sleep History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Sleep History</h2>
            {entries.length > 0 && (
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {entries.length} entries
              </span>
            )}
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-2">No sleep entries yet</p>
              <p className="text-gray-400">Add your first sleep entry above to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.slice().reverse().map((entry) => (
                <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {formatSleepTime(entry.start_time)} → {formatSleepTime(entry.end_time)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Duration: {formatDuration(
                          Math.abs(new Date(entry.end_time).getTime() - new Date(entry.start_time).getTime()) / 60000
                        )}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      entry.type === 'nap' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {entry.type.toUpperCase()}
                    </span>
                  </div>
                  
                  {entry.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{entry.notes}</p>
                    </div>
                  )}
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      Added on {format(new Date(entry.start_time), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Built with React, Redux, TypeScript & Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;