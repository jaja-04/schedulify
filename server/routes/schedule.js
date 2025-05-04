// routes/schedule.js
import express from 'express';
import Schedule from '../models/Schedule.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Room from '../models/Room.js';
import DayOffRequest from '../models/DayOffRequest.js';
import FacultyCourse from '../models/FacultyCourse.js';

const router = express.Router();

// Constants
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const hoursPerUnit = {
  1: 3,
  3: 5,
  4: 6,
};

// Utility to get available time slots per day
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 7; hour < 12; hour++) {
    slots.push({ start: `${hour}:00`, end: `${hour + 1}:00` });
  }
  for (let hour = 13; hour < 19; hour++) {
    slots.push({ start: `${hour}:00`, end: `${hour + 1}:00` });
  }
  return slots;
};

router.post('/generate', async (req, res) => {
  try {
    const allCourses = await Course.findAll();
    const allRooms = await Room.findAll();
    const allFacultyCourses = await FacultyCourse.findAll();
    const facultyDayOffs = await DayOffRequest.findAll();

    const usedSlots = new Map(); // key: day|roomId|time, value: boolean

    for (const course of allCourses) {
      const hours = hoursPerUnit[course.units];
      const facultyForCourse = allFacultyCourses.filter(fc => fc.courseId === course.courseId);
      const facultyId = facultyForCourse[0]?.facultyId;
      if (!facultyId) continue;

      const facultyDayOff = facultyDayOffs.find(d => d.userId === facultyId)?.day;

      let scheduled = 0;

      for (const day of days) {
        if (facultyDayOff === day) continue;
        const slots = generateTimeSlots();

        for (const room of allRooms) {
          for (const slot of slots) {
            const key = `${day}|${room.id}|${slot.start}`;
            if (usedSlots.has(key)) continue;

            await Schedule.create({
              day,
              startTime: slot.start,
              endTime: slot.end,
              facultyId,
              courseId: course.courseId,
              roomId: room.id,
            });

            usedSlots.set(key, true);
            scheduled++;
            if (scheduled >= hours) break;
          }
          if (scheduled >= hours) break;
        }
        if (scheduled >= hours) break;
      }

      if (scheduled < hours) {
        console.warn(`Not enough time slots for course ${course.courseId}`);
      }
    }

    res.json({ message: 'Schedule generation complete.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to generate schedule.' });
  }
});

export default router;
