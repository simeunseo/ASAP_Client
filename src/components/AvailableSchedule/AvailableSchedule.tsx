/*
"data": {
    "duration" : "HOUR_HALF",
    "place" : "ONLINE",
    "placeDetail" : "구글미트",
    "availableDates" : [
        {
            "month" : "7",
            "day" : "6",
            "dayOfWeek" : "월"
        },
        {
            "month" : "7",
            "day" : "7",
            "dayOfWeek" : "월"
        }
    ],
    "preferTimes" : [
        {
                "startTime": "06:00",
                "endTime": "12:00"
        }
    ]
}
*/

import getTimeSlots from './utils/getTimeSlots';

const AVAILABLE_DATES = [
  {
    month: '7',
    day: '6',
    dayOfWeek: '월',
  },
  {
    month: '7',
    day: '7',
    dayOfWeek: '화',
  },
  {
    month: '7',
    day: '8',
    dayOfWeek: '수',
  },
  {
    month: '7',
    day: '9',
    dayOfWeek: '목',
  },
  {
    month: '7',
    day: '9',
    dayOfWeek: '금',
  },
];

const PREFER_TIMES = [
  {
    startTime: '06:00',
    endTime: '12:00',
  },
  {
    startTime: '12:00',
    endTime: '18:00',
  },
];

function AvailableSchedule() {
  const timeSlots = getTimeSlots(PREFER_TIMES);
  const formattedDates = AVAILABLE_DATES.map(
    (date) => `${date.month}/${date.day} ${date.dayOfWeek}`,
  );

  console.log(timeSlots, formattedDates);
  return <div>AvailableSchedule</div>;
}

export default AvailableSchedule;
