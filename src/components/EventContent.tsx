import { EventContentArg } from '@fullcalendar/react';

function EventContent(eventInfo: EventContentArg) {
  return (
    <div>
      <b>{eventInfo.event.title}</b>
      <i>{eventInfo.event.extendedProps.description}</i>
      {eventInfo.event.extendedProps.status}
    </div>
  )
}

export default EventContent;
