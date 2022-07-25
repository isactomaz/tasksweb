import { EventMountArg } from '@fullcalendar/react';

function EventContentBackgroundColor(info: EventMountArg) {
  switch (info.event.extendedProps.status) {
    case '1':
      info.el.style.backgroundColor = 'yellow';
      info.el.style.borderColor = 'yellow';
      break;

    case '2':
      info.el.style.backgroundColor = 'green';
      info.el.style.borderColor = 'green';
      break;

    case '3':
      info.el.style.backgroundColor = 'red';
      info.el.style.borderColor = 'red';
      break;

    default:
      info.el.style.backgroundColor = 'blue';
      info.el.style.borderColor = 'blue';
      break;
  }
}

export default EventContentBackgroundColor;
