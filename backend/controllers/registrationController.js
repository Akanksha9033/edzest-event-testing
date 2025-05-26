// const Registration = require('../models/Registration');
// const Event = require('../models/Event');
// const xlsx = require('xlsx');
// const path = require('path');
// const fs = require('fs');
// const transporter = require('../utils/mailer');

// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, phone, remarks, eventId } = req.body;
//     const event = await Event.findById(eventId);
//     const registration = new Registration({ name, email, phone, remarks, eventId });
//     await registration.save();

//     // Admin mail
//     await transporter.sendMail({
//       to: process.env.EMAIL_TO,
//       subject: `New Registration for ${event.title}`,
//       html: `<p><strong>Name:</strong> ${name}<br/>
//              <strong>Email:</strong> ${email}<br/>
//              <strong>Phone:</strong> ${phone}<br/>
//              <strong>Remarks:</strong> ${remarks}</p>`,
//     });

//     // User mail
//     await transporter.sendMail({
//       to: email,
//       subject: `Registration Confirmed: ${event.title}`,
//       html: `<h3>Thank you for registering!</h3>
//              <p><strong>Event:</strong> ${event.title}<br/>
//              <strong>Date:</strong> ${event.date}<br/>
//              <strong>Time:</strong> ${event.time}<br/>
//              <strong>Speaker:</strong> ${event.speaker}<br/>
//              <strong>Link:</strong> <a href="${event.link}">Join Here</a></p>`,
//     });

//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.downloadRegistrations = async (req, res) => {
//   try {
//     const registrations = await Registration.find({ eventId: req.params.eventId });
//     const data = registrations.map(r => ({
//       Name: r.name,
//       Email: r.email,
//       Phone: r.phone,
//       Remarks: r.remarks,
//     }));

//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.json_to_sheet(data);
//     xlsx.utils.book_append_sheet(wb, ws, 'Registrations');

//     const filePath = path.join(__dirname, '../data/registrations.xlsx');
//     xlsx.writeFile(wb, filePath);

//     res.download(filePath);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


const Registration = require('../models/Registration');
const Event = require('../models/Event');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const transporter = require('../utils/mailer');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, remarks, eventId } = req.body;
    const event = await Event.findById(eventId);
    const registration = new Registration({ name, email, phone, remarks, eventId });
    await registration.save();

    // Admin mail
    // ✅ Admin Email - Stylish Format with extra event details
await transporter.sendMail({
  to: process.env.EMAIL_TO,
  subject: `📥 New Registration for ${event.title} [${event.date} ${event.time}]`,
  html: `
    <div style="font-family: Arial, sans-serif; border:1px solid #ddd; padding:20px;">
      <h2 style="color:#333;">📋 New Event Registration Received</h2>

      <p><strong>Event Title:</strong> ${event.title}</p>
      <p><strong>Date & Time:</strong> ${event.date} at ${event.time}</p>

      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; margin-top:10px;">
        <thead style="background:#f2f2f2;">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${name}</td>
            <td>${email}</td>
            <td><a href="tel:${phone}">${phone}</a></td>
            <td>${remarks || '-'}</td>
          </tr>
        </tbody>
      </table>

      <p style="margin-top:20px; font-size:13px; color:#555;">
        This is an automated registration alert for Edzest Events.
      </p>
    </div>
  `
});


    // User mail
    // await transporter.sendMail({
    //   to: email,
    //   subject: `Registration Confirmed: ${event.title}`,
    //   html: `<h3>Thank you for registering!</h3>
    //          <p><strong>Event:</strong> ${event.title}<br/>
    //          <strong>Date:</strong> ${event.date}<br/>
    //          <strong>Time:</strong> ${event.time}<br/>
    //          <strong>Speaker:</strong> ${event.speaker}<br/>
    //          <strong>Link:</strong> <a href="${event.link}">Join Here</a></p>`,
    // });

    await transporter.sendMail({
  to: email,
  subject: `✅ Registration Confirmed: ${event.title}`,
  html: `
    <div style="font-family: Arial, sans-serif; border:1px solid #ddd; padding:20px;">
      <h2 style="color:#2e6c80;">🎉 Thank You for Registering!</h2>
      <h3 style="color:#333; margin-top:-10px;">📌 ${event.title}</h3>

      <p>Hi <strong>${name}</strong>,</p>
      <p>You've successfully registered for the following event:</p>

      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; margin-top:10px; width:100%;">
        <tbody>
          <tr>
            <td><strong>Event</strong></td>
            <td>${event.title}</td>
          </tr>
          <tr>
            <td><strong>Date</strong></td>
            <td>${event.date}</td>
          </tr>
          <tr>
            <td><strong>Time</strong></td>
            <td>${event.time}</td>
          </tr>
          <tr>
            <td><strong>Speaker</strong></td>
            <td>${event.speaker}</td>
          </tr>
          <tr>
            <td><strong>Join Link</strong></td>
            <td><a href="${event.link}" target="_blank">${event.link}</a></td>
          </tr>
        </tbody>
      </table>

      <p style="margin-top:20px;">We're excited to have you join us.</p>

      <p style="font-size:13px; color:#888;">
        --<br/>
        Team Edzest<br/>
        <a href="https://www.edzest.org" target="_blank">www.edzest.org</a>
      </p>
    </div>
  `
});


    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.downloadRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ eventId: req.params.eventId });
    const data = registrations.map(r => ({
      Name: r.name,
      Email: r.email,
      Phone: r.phone,
      Remarks: r.remarks,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, 'Registrations');

    const filePath = path.join(__dirname, '../data/registrations.xlsx');
    xlsx.writeFile(wb, filePath);

    res.download(filePath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
