import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import TaskForm from './TaskForm';

type TaskModalProps = {
  task: {
    title: string,
    description: string,
    startdate: string,
    enddate: string,
    status: string,
  }
  isUpdate: boolean,
  show: boolean,
  modalTitle: string,
  handleClose: any,
  handleShow: any,
  handleChange: any,
  handleSubmit: any,
  handleSelectChange: any,
};

function TaskModal(props: TaskModalProps) {
  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <TaskForm
            task={props.task}
            isUpdate={props.isUpdate}
            handleChange={props.handleChange}
            handleSubmit={props.handleSubmit}
            handleSelectChange={props.handleSelectChange}
          />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default TaskModal;
