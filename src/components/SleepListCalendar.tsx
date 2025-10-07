import React from 'react';
import { useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { eventsSelector } from '../features/sleep/sleepSlice';
import moment from 'moment';

const localizer = momentLocalizer(moment)

const SleepListCalendar: React.FC = () => {

  const eventsListData = useSelector(eventsSelector);

  return (
    <>
      {eventsListData.length === 0 ? (
        <p>No sleep entries available.</p>
      ) : (
        <Calendar
          events={eventsListData}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: '50px' }}
        />
      )}
    </>
  );
};

export default SleepListCalendar;


