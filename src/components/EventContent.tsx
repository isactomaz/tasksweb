import { EventContentArg } from '@fullcalendar/react';

function EventContent(eventInfo: EventContentArg) {
  return (
    <div>
      <b>{eventInfo.event.title}</b>
      <i> {eventInfo.event.extendedProps.description}</i>
    </div>
  )
}

export default EventContent;
