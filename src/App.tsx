import React, { useEffect } from 'react';
import SleepList from './components/SleepList';
import Navigation from './components/Navigation';
import SleepAdd from './components/SleepAdd';
import SleepEdit from './components/SleepEdit';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchEntries } from './features/sleep/sleepSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  return (
    <div className="App font-montserrat max-w-6xl mx-auto">
      <header className="flex items-center mt-10 mb-10">
        <img src="/logo.png" alt="Baby Sleep Tracker Logo" className="w-24" />
        <h1 className="text-primary">Baby Sleep Tracker</h1>
      </header>
      <Navigation />
      <Routes>
        <Route path="/" element={<SleepList />} />
        <Route path="/add-sleep" element={<SleepAdd />} />
        <Route path="/edit-sleep/:id" element={<SleepEdit />} />
        <Route path="*" element={<div className="p-4">Page Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;