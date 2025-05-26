// const express = require('express');
// const router = express.Router();
// const multer = require("multer");
// const eventController = require('../controllers/eventController');

// // ✅ Use multer to handle file upload (e.g., wallpaper image)
// const storage = multer.memoryStorage(); // use diskStorage if saving to server
// const upload = multer({ storage });

// // ✅ POST - Create Event with image upload
// router.post('/', upload.single("wallpaper"), eventController.createEvent);

// // ✅ GET - Fetch all events
// router.get('/', eventController.getAllEvents);

// // ✅ PUT - Update an event
// router.put('/:id', eventController.updateEvent);

// // ✅ DELETE - Delete an event
// router.delete('/:id', eventController.deleteEvent);


// // ✅ Export router
// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const multer = require("multer");
// const eventController = require('../controllers/eventController');
// const Event = require('../models/Event'); // ✅ Required to fetch single event

// // ✅ Use multer to handle file upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // ✅ POST - Create Event
// router.post('/', upload.single("wallpaper"), eventController.createEvent);

// // ✅ GET - Fetch all events
// router.get('/', eventController.getAllEvents);

// // ✅ GET - Fetch single event by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.json(event);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ✅ PUT - Update event
// router.put('/:id', eventController.updateEvent);

// // ✅ DELETE - Delete event
// router.delete('/:id', eventController.deleteEvent);

// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require("multer");
const eventController = require('../controllers/eventController');
const Event = require('../models/Event');

// ✅ Fix: use diskStorage so file gets saved to /uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// ✅ POST - Create Event
router.post('/', upload.single("wallpaper"), eventController.createEvent);

// ✅ GET - All Events
router.get('/', eventController.getAllEvents);

// ✅ GET - Single Event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ PUT - Update Event
// router.put('/:id', eventController.updateEvent);

router.put('/:id', upload.single("wallpaper"), eventController.updateEvent);

// ✅ DELETE - Delete Event
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
