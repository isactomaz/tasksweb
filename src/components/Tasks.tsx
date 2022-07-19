import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import TaskForm from './TaskForm';

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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  function handleSubmit(event: React.ChangeEvent<SubmitEvent>) {
    event.preventDefault();
    alert(`${form.title} ${form.description} ${form.startdate} ${form.enddate} ${form.status}`);
    handleClose();
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        New Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <TaskForm
            title={form.title}
            description={form.description}
            startdate={form.startdate}
            enddate={form.enddate}
            status={form.status}
            isUpdate={false}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleSelectChange={handleSelectChange}
          />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Tasks;
