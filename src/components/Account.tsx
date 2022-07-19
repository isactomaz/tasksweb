import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AccountForm from './AccountForm';

type User = {
  login: string,
  password: string,
};

type AccountProps = {
  title: string,
};

function Account(props: AccountProps) {
  const [form, setForm] = useState<User>({
    login: '',
    password: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value: string = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });

  }

  function handleSubmit(event: React.ChangeEvent<SubmitEvent>) {
    event.preventDefault();
    alert(`${form.login} ${form.password}`);
  }

  return (
    <div>
      <h1>{props.title}</h1>

      <AccountForm
        title={props.title}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div >
  )
}

export default Account;
