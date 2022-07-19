import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import EventContent from './EventContent';
import TaskModal from './TaskModal';

type Task = {
  title: string,
  description: string,
  startdate: string,
  enddate: string,
  status: string,
};

function Tasks() {
  const [form, setForm] = useState<Task>({
    title: '',
    description: '',
    startdate: '',
    enddate: '',
    status: '1',
  });

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
    alert(`${form.title} ${form.description} ${form.startdate} ${form.enddate} ${form.status}`);
    handleCloseCreate();
  }

  function handleSubmitUpdate(event: React.ChangeEvent<SubmitEvent>) {
    event.preventDefault();
    alert(`${form.title} ${form.status}`);
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
    handleShowUpdate();
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreate}>
        New Task
      </Button>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        dateClick={handleDateClick}
        eventContent={EventContent}
        events={[
          { title: 'Event 1', date: '2022-07-01', status: '1' },
          { title: 'Event 2', start: '2022-07-02', end: '2022-07-03', status: '2' },
          { title: 'Event 3', start: '2022-06-30', end: '2022-07-05', description: 'Lecture', status: '3' },
        ]}
        eventClick={handleEventClick}
      />

      <TaskModal
        title={form.title}
        description={form.description}
        startdate={form.startdate}
        enddate={form.enddate}
        status={form.status}
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
        title={form.title}
        description={form.description}
        startdate={form.startdate}
        enddate={form.enddate}
        status={form.status}
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

export default Tasks;
