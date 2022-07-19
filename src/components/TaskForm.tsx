import { Button, Form } from 'react-bootstrap';

type TaskProps = {
  title: string,
  description: string,
  startdate: string,
  enddate: string,
  status: string,
  isUpdate: boolean,
  handleChange: any,
  handleSubmit: any,
  handleSelectChange: any,
};

function TaskForm(props: TaskProps) {
  return (
    <div>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group className='formGroup' controlId={'formTaskTitle'}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name='title'
            type='text'
            placeholder='Enter title'
            required
            defaultValue={props.title}
            disabled={props.isUpdate}
            readOnly={props.isUpdate}
            onChange={props.handleChange}
          />
        </Form.Group>

        <Form.Group className='formGroup' controlId={'formTaskDescription'}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name='description'
            type='text'
            placeholder='Enter description'
            required
            defaultValue={props.description}
            disabled={props.isUpdate}
            readOnly={props.isUpdate}
            onChange={props.handleChange}
          />
        </Form.Group>

        <Form.Group className='formGroup' controlId={'formTaskStartDate'}>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            name='startdate'
            type='date'
            placeholder='Enter date'
            required
            defaultValue={props.startdate}
            disabled={props.isUpdate}
            readOnly={props.isUpdate}
            onChange={props.handleChange}
          />
        </Form.Group>

        <Form.Group className='formGroup' controlId={'formTaskEndDate'}>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            name='enddate'
            type='date'
            placeholder='Enter date'
            required
            defaultValue={props.enddate}
            disabled={props.isUpdate}
            readOnly={props.isUpdate}
            onChange={props.handleChange}
          />
        </Form.Group>

        <Form.Group className='formGroup' controlId={'formTaskStatus'}>
          <Form.Label>Status</Form.Label>
          <Form.Select
            defaultValue={props.status}
            onChange={props.handleSelectChange}
          >
            <option value='1'>Pending</option>
            <option value='2'>Completed</option>
            <option value='3'>Canceled</option>
          </Form.Select>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div >
  )
}

export default TaskForm;
