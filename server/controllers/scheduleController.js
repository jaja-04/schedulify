// server/controllers/scheduleController.js
import db from '../db/connection.js';

export const getSchedule = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [schedule] = await db.execute('SELECT * FROM schedules WHERE user_id = ?', [userId]);
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const generateSchedule = async (req, res) => {
  try {
    // Load data from DB: students, faculty, subjects, rooms
    // Apply logic (rules, conflicts, etc)
    // Save result to `schedules` table

    res.status(200).json({ message: 'Schedule generated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
    