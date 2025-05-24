const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const filePath = path.join(__dirname, '../data/event-registrations.xlsx');
const userFilePath = path.join(__dirname, '../data/user-registrations.xlsx');

const Event = require('../models/Event');

// ✅ Updated Registration model schema
const Registration = require('../models/Registration');

// ✅ Mail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ POST: Register for an event
router.post('/', upload.none(), async (req, res) => {
  try {
    const {
      name = '',
      email = '',
      phone = '',
      remarks = '',
      eventTitle = '',
      eventDate = '',
      eventTime = '',
      eventSpeaker = '',
      eventDescription = '',
      eventLink = '',
      linkedin = '',
    } = req.body;

    if (!name || !email || !phone || !eventTitle) {
      return res.status(400).json({ message: 'Required fields missing.' });
    }

    // ✅ Save to MongoDB
    await Registration.create({
      name,
      email,
      phone,
      remarks,
      eventTitle,
      eventDate,
      eventTime,
      eventSpeaker,
      eventDescription,
      eventLink,
      linkedin,
    });
    console.log("✅ Registration saved in MongoDB.");

    // ✅ Append to Excel
    let data = [];
    if (fs.existsSync(filePath)) {
      const workbook = xlsx.readFile(filePath);
      const sheet = workbook.Sheets['Registrations'];
      if (sheet) {
        data = xlsx.utils.sheet_to_json(sheet);
      }
    }

    const newEntry = {
      'Event Title': eventTitle,
      'Participant Name': name,
      'Email': email,
      'Phone': phone,
      'Remarks': remarks,
      'Event Date': eventDate,
      'Registered At': new Date().toLocaleString(),
    };

    data.push(newEntry);

    const headers = [
      'Event Title',
      'Participant Name',
      'Email',
      'Phone',
      'Remarks',
      'Event Date',
      'Registered At',
    ];
    const worksheet = xlsx.utils.json_to_sheet(data, { header: headers });
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    xlsx.writeFile(workbook, filePath);

    // ✅ USER EMAIL
    const userMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `🎉 You're Registered for ${eventTitle}`,
      html: `
        <h2>Thank you, ${name}!</h2>
        <p>You are successfully registered for the following event:</p>
        <ul>
          <li><strong>Title:</strong> ${eventTitle}</li>
          <li><strong>Date:</strong> ${eventDate}</li>
          <li><strong>Time:</strong> ${eventTime}</li>
          <li><strong>Speaker:</strong> ${eventSpeaker}</li>
          <li><strong>Description:</strong> ${eventDescription}</li>
        </ul>
        <p><strong>Join Zoom:</strong> <a href="${eventLink}">${eventLink}</a></p>
        <br/>
        <p>We're excited to have you!<br/>– <strong>Edzest Team</strong></p>
      `
    };

    // ✅ ADMIN EMAIL
    const adminMail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `📩 New Registration: ${name}`,
      html: `
        <h3>New Event Registration Alert</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Remarks:</strong> ${remarks || 'None'}</p>
        <hr/>
        <h4>Event Info:</h4>
        <ul>
          <li><strong>Title:</strong> ${eventTitle}</li>
          <li><strong>Date:</strong> ${eventDate}</li>
          <li><strong>Time:</strong> ${eventTime}</li>
          <li><strong>Speaker:</strong> ${eventSpeaker}</li>
          <li><strong>Zoom:</strong> <a href="${eventLink}">${eventLink}</a></li>
        </ul>
        ${linkedin ? `<p><strong>Speaker LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></p>` : ""}
      `
    };

    await transporter.sendMail(userMail);
    await transporter.sendMail(adminMail);

    res.status(200).json({ message: 'Registration successful, emails sent, data saved.' });
  } catch (err) {
    console.error('❌ Registration Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
