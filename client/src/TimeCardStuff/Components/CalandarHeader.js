import React, { useContext } from 'react';
import * as FaIcons from 'react-icons/fa6';
import GlobalContext from '../../Context/GlobalContext';
import dayjs from 'dayjs';
import './CalandarHeader.css'

export default function CalandarHeader(){
    const {monthIndex, setMonthIndex, setShowEventModal} = useContext(GlobalContext);

    function goToToday(){
        setMonthIndex(dayjs().month());
    }
    function previousMonth(){
        setMonthIndex(monthIndex - 1);
    }
    function nextMonth(){
        setMonthIndex(monthIndex + 1);
    }
    const daysOfWeek = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ]
    return(
        <>
      <header className='d-flex justify-content-between align-items-center m-0 p-2 calendar-header'>
        <button className='btn btn-outline-primary btn-sm' onClick={goToToday}>
          Today
        </button>
        <FaIcons.FaAngleLeft className='moveMonth' onClick={previousMonth} />
        <h3 className='calendar-date m-0 text-center'>
          {dayjs(new Date(dayjs().year(), monthIndex)).format('MMM YYYY')}
        </h3>
        <FaIcons.FaAngleRight className='moveMonth' onClick={nextMonth} />
        <button className='btn btn-primary btn-sm' onClick={() => setShowEventModal(true)}>
          Create
        </button>
      </header>
      <div className='day-labels'>
        {daysOfWeek.map((day, idx) => (
          <div className='day-label' key={idx}>
            {day}
          </div>
        ))}
      </div>
    </>
    )
}