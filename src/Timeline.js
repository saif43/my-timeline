import React, { useState, useEffect, useRef  } from 'react';
import './Timeline.scss';
import TimelineSeparator from './components/TimelineSeparator';

// Helper to convert "9:30 PM" to Date object with today's date
const convertToTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (modifier === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
    } else if (modifier === 'AM' && hours === '12') {
        hours = '00';
    }

    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
};

const getRefs = (routine) => {
    const refs = routine.reduce((acc, item) => {
        acc[item.time] = useRef(null);
        return acc;
    }, {});

    return refs;
}

const Timeline = () => {

    const [isWorkingDay, setIsWorkingDay] = useState(true); // State to track selected day type
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update the current time every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // 1 minute interval
        return () => clearInterval(interval);
    }, []);


    const working_days_routine = [
        {
            time: '5:30 AM',
            title: 'Wake Up & Fajr Prayer',
            tasks: [
                'Freshen up and offer the Fajr prayer.',
                'Hydrate with a glass of water.',
                'Spend 5-10 minutes in gratitude or light reflection/meditation.',
            ]
        },
        {
            time: '6:00 AM',
            title: 'Light Exercise',
            tasks: [
                '20 minutes of light exercise, such as walking, stretching, or simple bodyweight exercises.',
                'This will boost your energy for the day.',
            ]
        },
        {
            time: '6:30 AM',
            title: 'Shower, Get Ready',
            tasks: [
                'Freshen up and get dressed for the office without returning to bed.'
            ]
        },
        {
            time: '7:00 AM',
            title: 'Healthy Breakfast',
            tasks: [
                'Eat a balanced, healthy breakfast with protein and fiber (e.g., eggs, fruits, or oatmeal).',
                'Drink water instead of sugary tea.',
            ]
        },
        {
            time: '7:00 AM',
            title: 'Commute to Work',
            tasks: [
                'Walk to the office transport as you already do, but use this time to listen to a motivational podcast or audiobook on self-improvement, software engineering, or health.'
            ]
        },
        {
            time: '9:00 AM',
            title: 'Start Work Immediately',
            tasks: [
                'Avoid sleeping at the office.',
                'Plan out your tasks for the day to focus on high-priority work.',
            ]
        },
        {
            time: '10:00 AM',
            title: 'Mid-Morning - Tea Break (Optional)',
            tasks: [
                'If needed, have tea with minimal sugar, but try to drink herbal tea or water instead.'
            ]
        },
        {
            time: '1:30 PM',
            title: 'Dhuhr Prayer',
            tasks: [
                'Pray Dhuhr and then have lunch, preferably something light and healthy.'
            ]
        },
        {
            time: '2:30 PM',
            title: 'Lunch Break',
            tasks: [
                'Healthy lunch with vegetables, lean protein, and whole grains. Avoid heavy or overly spicy meals.'
            ]
        },
        {
            time: '2:30 PM',
            title: 'Lunch Break',
            tasks: [
                'Healthy lunch with vegetables, lean protein, and whole grains. Avoid heavy or overly spicy meals.'
            ]
        },
        {
            time: '3:00 PM',
            title: 'Walk for 15 Minutes',
            tasks: [
                'A short post-lunch walk will help digestion and refresh your mind.'
            ]
        },
        {
            time: '3:15 PM',
            title: 'Focus on Work',
            tasks: [
                'Plan and complete tasks without distractions like social media.',
                'Use short breaks to stretch or breathe deeply.',
            ]
        },
        {
            time: '5:00 PM',
            title: 'Commute Home',
            tasks: [
                'Use your commute as quiet time for relaxation or listening to educational content.',
            ]
        },
        {
            time: '7:00 PM',
            title: 'Return Home & Maghrib Prayer',
            tasks: [
                'Upon reaching home, freshen up and offer Maghrib prayer.',
            ]
        },
        {
            time: '7:30 PM',
            title: 'Family Time',
            tasks: [
                'Have a light snack or tea, and spend quality time with family—without distractions from TV or mobile games.',
            ]
        },
        {
            time: '8:30 PM',
            title: 'Study & Self-Improvement',
            tasks: [
                'Spend 1 hour learning something new related to software engineering or reading a book.',
            ]
        },
        {
            time: '9:30 PM',
            title: 'Dinner',
            tasks: [
                'Eat a light and healthy dinner. Avoid heavy, spicy meals that can disturb sleep.',
            ]
        },
        {
            time: '10:00 PM',
            title: 'Isha Prayer & Wind Down',
            tasks: [
                'Offer Isha prayer and then spend time with your wife.',
            ]
        },
        {
            time: '11:00 PM',
            title: 'Sleep',
            tasks: [
                'Try to be in bed by 11:00 PM to ensure you get at least 6-7 hours of sleep.',
            ]
        }
    ]

    const holidays_routine = [
        {
            "time": "6:00 AM",
            "title": "Wake Up & Fajr Prayer",
            "tasks": [
                "Freshen up and offer the Fajr prayer.",
                "Hydrate with a glass of water.",
                "Spend 5-10 minutes in gratitude or light reflection/meditation."
            ]
        },
        {
            "time": "6:30 AM",
            "title": "Light Exercise & Breakfast",
            "tasks": [
                "Do 20 minutes of light exercise such as stretching, walking, or yoga.",
                "Prepare and enjoy a healthy breakfast to start your day."
            ]
        },
        {
            "time": "8:00 AM",
            "title": "Study & Reading",
            "tasks": [
                "Dedicate 1-2 hours to studying software engineering topics or reading a book.",
                "Focus on learning something new or improving your skills."
            ]
        },
        {
            "time": "10:00 AM",
            "title": "Family Time",
            "tasks": [
                "Spend quality time with your wife and son.",
                "Go for an outdoor activity, a walk, or play together."
            ]
        },
        {
            "time": "12:30 PM",
            "title": "Dhuhr Prayer & Lunch",
            "tasks": [
                "Offer the Dhuhr prayer.",
                "Enjoy a light and healthy lunch."
            ]
        },
        {
            "time": "1:30 PM",
            "title": "Productive Activities",
            "tasks": [
                "Engage in a personal project such as learning Laravel or Next.js.",
                "Alternatively, enjoy a hobby that brings you joy and fulfillment."
            ]
        },
        {
            "time": "3:30 PM",
            "title": "Asr Prayer & Physical Activity",
            "tasks": [
                "Offer the Asr prayer.",
                "Go for a walk or play with your son to stay active."
            ]
        },
        {
            "time": "5:00 PM",
            "title": "Relax & Snack",
            "tasks": [
                "Have a light snack and a cup of tea to refresh yourself.",
                "Relax for a bit before moving on to other activities."
            ]
        },
        {
            "time": "6:30 PM",
            "title": "Personal Development",
            "tasks": [
                "Continue learning or self-improvement activities such as reading, studying, or skill development."
            ]
        },
        {
            "time": "7:00 PM",
            "title": "Maghrib Prayer & Family Time",
            "tasks": [
                "Offer the Maghrib prayer.",
                "Spend some quality time with your family."
            ]
        },
        {
            "time": "8:00 PM",
            "title": "Free Time",
            "tasks": [
                "Relax, watch a meaningful documentary, or enjoy a hobby during this time."
            ]
        },
        {
            "time": "9:30 PM",
            "title": "Dinner & Isha Prayer",
            "tasks": [
                "Have a light dinner.",
                "Offer the Isha prayer before winding down for the night."
            ]
        },
        {
            "time": "10:30 PM",
            "title": "Bedtime",
            "tasks": [
                "Prepare for bed and aim to sleep by 10:30-11:00 PM to ensure a good night's rest."
            ]
        }
    ]

    const getActiveTime = (routine) =>{
        let active_task = null

        routine.some((currentTask, index) => {
            active_task = currentTask.time
            const currentTaskTime = currentTask.time
            const currentTaskDate = convertToTime(currentTaskTime);
            
            const nextTask = routine[index+1]

            if(!nextTask){
                return true;
            }

            const nextTaskTime = nextTask.time
            const nextTaskDate = convertToTime(nextTaskTime);

            if(currentTaskDate <= currentTime && currentTime < nextTaskDate){
                return true
            }
        });

        return active_task;
    }

    // Create refs object where each key is the 'time' from the array objects
    const active_routine = isWorkingDay ? working_days_routine : holidays_routine;
    const refs = getRefs(active_routine)
    
    // Function to render routine items
    const renderRoutine = (routine) => {
        const active_time = getActiveTime(routine);
        return routine.map((item, index) => (
        <div ref={refs[item.time]} key={index} className="timeline-event">
            <div className={`time-label ${isActiveTask(active_time, item.time) ? "active" : ""}`}>{item.time}</div>
            <TimelineSeparator active={isActiveTask(active_time, item.time)} />
            <div className={`event-content ${isActiveTask(active_time, item.time) ? "active" : ""}`}>
            <h3>{item.title}</h3>
            <ul>
                {item.tasks.map((task, i) => (
                <li key={i}>{task}</li>
                ))}
            </ul>
            </div>
        </div>
        ));
    };

    const isActiveTask = (active_time, task_time) => {
        return active_time === task_time
    };

    const scrollToItem = () => {
        const active_routine = isWorkingDay ? working_days_routine : holidays_routine;
        const active_time = getActiveTime(active_routine);
        const ref = refs[active_time];
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error('Ref not found for the specified time');
        }
    };


    return (
        <div className="timeline">
        <div className="day-status">
            <div>
            <input
                type="radio"
                id="working-day"
                name="day-status"
                checked={isWorkingDay}
                onChange={() => setIsWorkingDay(true)} // Set state to working day
            />
            <label htmlFor="working-day">Working day</label>
            </div>
            <div>
            <input
                type="radio"
                id="holiday"
                name="day-status"
                checked={!isWorkingDay}
                onChange={() => setIsWorkingDay(false)} // Set state to holiday
            />
            <label htmlFor="holiday">Holiday</label>
            </div>
        </div>

        <h2>{isWorkingDay ? 'Working Day' : 'Holiday'}</h2>

        <div>{isWorkingDay ? renderRoutine(working_days_routine) : renderRoutine(holidays_routine)}</div>

        <div className="search-container">
        <button className="search-button" onClick={scrollToItem}>
            <i className="fas fa-search"></i>
        </button>
        </div>

        </div>
    );
};

export default Timeline;
