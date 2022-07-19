import { Button, Form } from 'react-bootstrap';

type AccountFormProps = {
  title: string,
  handleChange: any,
  handleSubmit: any,
};

function AccountForm(props: AccountFormProps) {
  return (
    <div>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group className='formGroup' controlId={`form${props.title}Email`}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name='login'
            type='email'
            placeholder='Enter email'
            required
            onChange={props.handleChange}
          />
        </Form.Group>

        <Form.Group className='formGroup' controlId={`form${props.title}Password`}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name='password'
            type='password'
            placeholder='Password'
            minLength={8}
            required
            onChange={props.handleChange}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default AccountForm;
