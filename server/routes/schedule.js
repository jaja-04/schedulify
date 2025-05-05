import express from 'express';
import { Op } from 'sequelize';
import Course from '../models/Course.js';
import Room from '../models/Room.js';
import Schedule from '../models/Schedule.js';
import User from '../models/User.js';

const router = express.Router();

const SECTIONS = [1, 2, 3, 4, 5];
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

const generateSchedule = async () => {
  const rooms = await Room.findAll();
  const instructors = await User.findAll({ where: { role: 'faculty' } });
  let instructorIndex = 0;

  const usedSlots = {};

  const isAvailable = (day, roomId, start, end) => {
    const slots = usedSlots[day]?.[roomId] || [];
    return !slots.some(([s, e]) => start < e && end > s);
  };

  const bookSlot = (day, roomId, start, end) => {
    if (!usedSlots[day]) usedSlots[day] = {};
    if (!usedSlots[day][roomId]) usedSlots[day][roomId] = [];
    usedSlots[day][roomId].push([start, end]);
  };

  const findTimeSlot = (hoursNeeded, disallowedDays = []) => {
    for (const day of DAYS) {
      if (disallowedDays.includes(day)) continue;
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
  };

  await Schedule.destroy({ where: {} });

  for (const sectionId of SECTIONS) {
    for (const course of COURSES) {
      const usedDays = new Set();

      for (const session of course.sessions) {
        const slot = findTimeSlot(session.hours, [...usedDays]);
        if (!slot) {
          console.error(`❌ Failed to find time slot for ${course.name} (Section ${sectionId})`);
          continue;
        }

        usedDays.add(slot.day);

        await Schedule.create({
          sectionId,
          courseId: course.courseId,
          roomId: slot.roomId,
          day: slot.day,
          startTime: slot.startTime,
          endTime: slot.endTime,
          facultyId: instructors[instructorIndex % instructors.length]?.id,
        });

        instructorIndex++;
        console.log(`✅ Scheduled ${course.name} (Sec ${sectionId}) on ${slot.day} ${slot.startTime}–${slot.endTime}`);
      }
    }
  }
};

router.post('/generate', async (req, res) => {
  try {
    console.log('Generating schedule...');
    await generateSchedule();
    res.status(200).json({ message: 'Schedule generated successfully.' });
  } catch (error) {
    console.error('Error generating schedule:', error);
    res.status(500).json({ message: 'Failed to generate schedule.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      include: [
        { model: Course, attributes: ['courseId', 'courseName'] },
        { model: Room, attributes: ['name'] },
        { model: User, as: 'faculty', attributes: ['id', 'name'] },
      ],
      order: [['day', 'ASC'], ['startTime', 'ASC']],
    });

    const formatted = schedules.map(s => ({
      id: s.id,
      courseId: s.courseId,
      courseName: s.Course.courseName,
      room: s.Room.name,
      day: s.day,
      startTime: s.startTime,
      endTime: s.endTime,
      faculty: s.faculty?.name || null,
      sectionId: s.sectionId,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch schedule.' });
  }
});

export default router;
