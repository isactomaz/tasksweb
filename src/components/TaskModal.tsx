import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import TaskForm from './TaskForm';

type TaskModalProps = {
  title: string,
  description: string,
  startdate: string,
  enddate: string,
  status: string,
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
            title={props.title}
            description={props.description}
            startdate={props.startdate}
            enddate={props.enddate}
            status={props.status}
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
