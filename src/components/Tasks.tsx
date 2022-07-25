import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridWeek from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import EventContent from './EventContent';
import EventContentBackgroundColor from './EventContentBackgroundColor';
import TaskModal from './TaskModal';

type Task = {
  title: string,
  description: string,
  startdate: string,
  enddate: string,
  status: string,
};

function Tasks() {
  const [taskId, setTaskId] = useState('')
  const [form, setForm] = useState<Task>({
    title: '',
    description: '',
    startdate: '',
    enddate: '',
    status: '1',
  });
  const token = localStorage.getItem('token');

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [tasksData, setTasksData] = useState([]);

  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value: string = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setForm({
      ...form,
      status: event.target.value,
    });
  }

  function handleSubmitCreate(event: React.ChangeEvent<SubmitEvent>) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API}/tasks`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: form.title,
        description: form.description,
        start_date: form.startdate,
        end_date: form.enddate,
        status: form.status,
      })
    }).then(response => response.json())
      .then(result => {
        if (!result.error) {
          console.log('Task created');
        } else {
          console.error('failed to create task');
        }
      })

    handleCloseCreate();
  }

  function handleSubmitUpdate(event: React.ChangeEvent<SubmitEvent>) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API}/tasks`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: parseInt(taskId),
        status: form.status,
      })
    }).then(response => response.json())
      .then(result => {
        if (!result.error) {
          console.log('Task updated');
        } else {
          console.error('failed to update task');
        }
      })

    handleCloseUpdate();
  }

  function handleDateClick(arg: DateClickArg) {
    setForm({
      title: '',
      description: '',
      startdate: arg.dateStr,
      enddate: '',
      status: '1',
    });
    handleShowCreate();
  }

  function handleEventClick(info: EventClickArg) {
    const start = formatDate(info.event.start!.toISOString());
    const end = formatDate(info.event.end!.toISOString());
    setTaskId(info.event.id);
    setForm({
      title: info.event.title,
      description: info.event.extendedProps.description,
      startdate: start,
      enddate: end,
      status: info.event.extendedProps.status,
    });
    handleShowUpdate();
  }

  function taskStatusMapped(taskStatus: string) {
    switch (taskStatus) {
      case 'Pending':
        return '1'

      case 'Completed':
        return '2'

      case 'Canceled':
        return '3'

      default:
        return '-1'
    }
  }

  function formatDate(date: string) {
    return date.split('T')[0];
  }

  function tasksMapped(tasks: any) {
    return tasks.map((task: any) => (
      {
        id: task.id,
        title: task.name,
        description: task.description,
        status: taskStatusMapped(task.status),
        start: formatDate(task.start_date),
        end: formatDate(task.end_date),
        allDay: true,
      }
    ));
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/tasks`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setTasksData(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  if (error) {
    return <div>Error: {error}</div >;

  } else if (!isLoaded) {
    return <div>Loading...</div>;

  } else {
    return (
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, listPlugin, timeGridWeek]}
          initialView='dayGridMonth'
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listWeek',
          }}
          dateClick={handleDateClick}
          eventContent={EventContent}
          events={tasksMapped(tasksData)}
          eventClick={handleEventClick}
          eventDidMount={EventContentBackgroundColor}
        />

        <TaskModal
          task={form}
          isUpdate={false}
          show={showCreate}
          modalTitle={'Create Task'}
          handleClose={handleCloseCreate}
          handleShow={handleShowCreate}
          handleChange={handleChange}
          handleSubmit={handleSubmitCreate}
          handleSelectChange={handleSelectChange}
        />

        <TaskModal
          task={form}
          isUpdate={true}
          show={showUpdate}
          modalTitle={'Update Task'}
          handleClose={handleCloseUpdate}
          handleShow={handleShowUpdate}
          handleChange={handleChange}
          handleSubmit={handleSubmitUpdate}
          handleSelectChange={handleSelectChange}
        />
      </div>
    )
  }
}

export default Tasks;
