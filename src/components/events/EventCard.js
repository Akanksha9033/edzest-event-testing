// import React, { useState } from "react";
// import axios from "axios";
// import RegisterForm from "./RegisterForm";

// const EventCard = ({ event, onUpdated, isAdmin }) => {
//   const [showForm, setShowForm] = useState(false);

//   const handleDelete = async () => {
//     await axios.delete(`/api/events/${event._id}`);
//     onUpdated();
//   };

//   const downloadExcel = () => {
//     window.open(`/api/register/${event._id}/download`, "_blank");
//   };

//   return (
//     <div style={{ border: "1px solid #ccc", padding: 15, width: 300 }}>
//       <img src={event.wallpaper} alt="Event" style={{ width: "100%", height: 150 }} />
//       <h3>{event.title}</h3>
//       <p><strong>Speaker:</strong> {event.speaker}</p>
//       <p><strong>Date:</strong> {event.date}</p>
//       <p><strong>Time:</strong> {event.time}</p>
//       <p><a href={event.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></p>
//       <p><a href={event.link} target="_blank" rel="noreferrer">Event Link</a></p>

//       <button onClick={() => setShowForm(true)}>Register Here</button>

//       {/* ✅ Only show these if isAdmin is true */}
//       {isAdmin && (
//         <>
//           <button onClick={handleDelete}>Delete</button>
//           <button onClick={downloadExcel}>Download Registrations</button>
//         </>
//       )}

//       {showForm && (
//         <RegisterForm
//           event={event}
//           onClose={() => setShowForm(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default EventCard;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const EventCard = ({ event }) => {
//   const navigate = useNavigate();

//   const handleRegisterClick = () => {
//     navigate(`/register/${event._id}`);
//   };

//   return (
//     <div
//       style={{
//         width: "300px",
//         background: "#fff",
//         borderRadius: "10px",
//         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//         padding: "20px",
//         margin: "10px",
//         transition: "transform 0.3s ease",
//       }}
//       onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
//       onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
//     >
//       {/* <img
//         src={event.wallpaper}
//         alt="Event"
//         style={{
//           width: "100%",
//           height: "160px",
//           objectFit: "cover",
//           borderRadius: "6px",
//         }}
//       /> */}


//       <img
//   src={`data:image/jpeg;base64,${event.wallpaper}`}
//   alt="Event Poster"
//   style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
// />

//       <h5 className="mt-3" style={{ fontWeight: "bold" }}>{event.title}</h5>
//       <p><strong>Speaker:</strong> {event.speaker}</p>
//       <p><strong>Date:</strong> {event.date}</p>
//       <p><strong>Time:</strong> {event.time}</p>
//       <p>
//         <a href={event.linkedin} target="_blank" rel="noreferrer">🔗 LinkedIn</a><br />
//         <a href={event.link} target="_blank" rel="noreferrer">🔗 Event Link</a>
//       </p>
//       <button
//         onClick={handleRegisterClick}
//         style={{
//           width: "100%",
//           padding: "10px",
//           backgroundColor: "#004aad",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           marginTop: "10px",
//           cursor: "pointer"
//         }}
//       >
//         Register Here
//       </button>
//     </div>
//   );
// };

// export default EventCard;


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUser, FaCalendarAlt, FaClock, FaLink, FaLinkedin } from "react-icons/fa";

// const EventCard = ({ event }) => {
//   const navigate = useNavigate();

//   const handleRegisterClick = () => {
//     navigate(`/register/${event._id}`);
//   };

//   return (
//     <div
//       style={{
//         width: "300px",
//         background: "#fff",
//         borderRadius: "12px",
//         boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
//         padding: "20px",
//         margin: "10px",
//         transition: "transform 0.3s ease",
//       }}
//       onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
//       onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
//     >
//       <img
//   src={event.wallpaper?.startsWith('http') ? event.wallpaper : `data:image/png;base64,${event.wallpaper}`}
//   alt="Event"
//   style={{
//     width: "100%",
//     height: "160px",
//     objectFit: "cover",
//     borderRadius: "6px",
//   }}
// />



//       <h5 className="mt-3" style={{ fontWeight: "bold" }}>{event.title}</h5>

//       {event.description && (
//         <p style={{ fontSize: "14px", marginBottom: "10px", color: "#444" }}>
//           {event.description}
//         </p>
//       )}

//       <p style={{ marginBottom: "6px" }}>
//         <FaUser style={{ marginRight: "6px", color: "#555" }} />
//         {event.speaker}
//       </p>
//       <p style={{ marginBottom: "6px" }}>
//         <FaCalendarAlt style={{ marginRight: "6px", color: "#555" }} />
//         {event.date}
//       </p>
//       <p style={{ marginBottom: "10px" }}>
//         <FaClock style={{ marginRight: "6px", color: "#555" }} />
//         {event.time}
//       </p>

//       <p>
//         <a href={event.linkedin} target="_blank" rel="noreferrer" style={{ display: "block", marginBottom: "4px" }}>
//           <FaLinkedin style={{ marginRight: "6px", color: "#0077b5" }} />
//           LinkedIn
//         </a>
//         <a href={event.link} target="_blank" rel="noreferrer">
//           <FaLink style={{ marginRight: "6px", color: "#0077b5" }} />
//           Event Link
//         </a>
//       </p>

//       <button
//         onClick={handleRegisterClick}
//         style={{
//           width: "100%",
//           padding: "10px",
//           backgroundColor: "#004aad",
//           color: "#fff",
//           border: "none",
//           borderRadius: "6px",
//           marginTop: "12px",
//           cursor: "pointer"
//         }}
//       >
//         Register Here
//       </button>
//     </div>
//   );
// };

// export default EventCard;


import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaClock, FaLink, FaLinkedin } from "react-icons/fa";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(`/register/${event._id}`);
  };

  return (
    <div
      style={{
        width: "300px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        margin: "10px",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
    >
      {/* Event Poster */}
      <img
        src={
          event.wallpaper?.startsWith("http")
            ? event.wallpaper
            : `data:image/png;base64,${event.wallpaper}`
        }
        alt="Event"
        style={{
          width: "100%",
          height: "160px",
          objectFit: "cover",
          borderRadius: "6px",
        }}
      />

      {/* Title */}
      <h5 className="mt-3" style={{ fontWeight: "bold" }}>
        {event.title}
      </h5>

      {/* Description */}
      {event.description && (
        <p style={{ fontSize: "14px", marginBottom: "10px", color: "#444" }}>
          {event.description}
        </p>
      )}

      {/* Speaker with icon on left and name on right */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
        <FaUser style={{ marginRight: "8px", color: "#555" }} />
        <span>{event.speaker}</span>
      </div>

      {/* Date row */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
        <FaCalendarAlt style={{ marginRight: "8px", color: "#555" }} />
        <span>{event.date}</span>
      </div>

      {/* Time row */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <FaClock style={{ marginRight: "8px", color: "#555" }} />
        <span>{event.time}</span>
      </div>

      {/* LinkedIn Link */}
      <a
        href={event.linkedin}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "4px",
          textDecoration: "none",
          color: "#0077b5",
        }}
      >
        <FaLinkedin style={{ marginRight: "6px" }} />
        LinkedIn
      </a>

      {/* Event Link */}
      <a
        href={event.link}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "4px",
          textDecoration: "none",
          color: "#0077b5",
        }}
      >
        <FaLink style={{ marginRight: "6px" }} />
        Event Link
      </a>

      {/* Register Button */}
      <button
        onClick={handleRegisterClick}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#004aad",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          marginTop: "12px",
          cursor: "pointer",
        }}
      >
        Register Here
      </button>
    </div>
  );
};

export default EventCard;
