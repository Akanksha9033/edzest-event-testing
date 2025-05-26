// import React from "react";
// import EventCard from "./EventCard";

// const EventList = ({ events, onUpdated, isAdmin }) => {
//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
//       {events.map((event) => (
//         <EventCard
//           key={event._id}
//           event={event}
//           onUpdated={onUpdated}
//           isAdmin={isAdmin} // ✅ passed here
//         />
//       ))}
//     </div>
//   );
// };

// export default EventList;


import React from "react";
import EventCard from "./EventCard";

const EventList = ({ events }) => {
  return (
    <div
      style={{
        display: "flex",                  // Arrange event cards in a row
        overflowX: "auto",                // Enable horizontal scroll
        padding: "10px",
        gap: "20px",
        flexWrap: "nowrap",              // Prevent wrapping of cards
        scrollSnapType: "x mandatory",   // Snap cards while scrolling on mobile
      }}
    >
      {events.map((event) => (
        <div
          key={event._id}
          style={{
            flex: "0 0 auto",             // Prevent shrinking, allow horizontal scroll
            scrollSnapAlign: "start",    // Align each card to left edge on scroll
            width: "300px",              // Maintain card width
          }}
        >
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
};

export default EventList;
