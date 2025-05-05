// autoSchedule.js
import { Op } from 'sequelize';
import Course from './models/Course.js';
import Room from './models/Room.js';
import Schedule from './models/Schedule.js';

const SECTIONS = [1, 2, 3, 4, 5]; // Section IDs
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const START_HOUR = 8;
const END_HOUR = 18;

const COURSES = [
  { courseId: 'CpEE 402', name: 'Cognate / Elective Course 2', sessions: [{ hours: 2 }, { hours: 3 }] },
  { courseId: 'CpE 418', name: 'Software Design', sessions: [{ hours: 2 }, { hours: 3 }, { hours: 1 }] },
  { courseId: 'CpE 419', name: 'Routing and Switching (Cisco 2)', sessions: [{ hours: 3 }] },
  { courseId: 'CpE 420', name: 'Digital Signal Processing', sessions: [{ hours: 3 }, { hours: 3 }] },
  { courseId: 'CpE 417', name: 'Microprocessors', sessions: [{ hours: 2 }, { hours: 3 }] },
  { courseId: 'CpE 421', name: 'Emerging Technologies in CpE', sessions: [{ hours: 1 }, { hours: 2 }] },
  { courseId: 'CpE 422', name: 'CpE Practice and Design 1', sessions: [{ hours: 3 }] },
];


async function generateSchedule() {
  const rooms = await Room.findAll();
  const usedSlots = {}; // Map: day -> roomId -> array of [start, end]

  function isAvailable(day, roomId, start, end) {
    const slots = usedSlots[day]?.[roomId] || [];
    return !slots.some(([s, e]) => (start < e && end > s));
  }

  function bookSlot(day, roomId, start, end) {
    if (!usedSlots[day]) usedSlots[day] = {};
    if (!usedSlots[day][roomId]) usedSlots[day][roomId] = [];
    usedSlots[day][roomId].push([start, end]);
  }

  function findTimeSlot(hoursNeeded) {
    for (const day of DAYS) {
      for (let hour = START_HOUR; hour <= END_HOUR - hoursNeeded; hour++) {
        const start = hour;
        const end = hour + hoursNeeded;
        for (const room of rooms) {
          if (isAvailable(day, room.id, start, end)) {
            bookSlot(day, room.id, start, end);
            return { day, startTime: `${start}:00`, endTime: `${end}:00`, roomId: room.id };
          }
        }
      }
    }
    return null;
  }

  for (const sectionId of SECTIONS) {
    for (const course of COURSES) {
      for (const session of course.sessions) {
        const slot = findTimeSlot(session.hours);
        if (!slot) {
          console.error(`❌ Failed to find time slot for ${course.name} (Section ${sectionId})`);
          continue;
        }

        await Schedule.create({
          sectionId,
          courseId: course.courseId,
          roomId: slot.roomId,
          day: slot.day,
          startTime: slot.startTime,
          endTime: slot.endTime,
        });

        console.log(`✅ Scheduled ${course.name} for Section ${sectionId} on ${slot.day} (${slot.startTime}–${slot.endTime})`);
      }
    }
  }
}

generateSchedule().then(() => {
  console.log('✅ All schedules generated!');
  process.exit();
}).catch(err => {
  console.error('❌ Error generating schedule:', err);
  process.exit(1);
});
