import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks/utils';
import { selectUserList } from '../counter/usersSlice';
import { addElement } from '../counter/usersSlice';
import { addActiveUser } from '../counter/activeUserSlice';
import { useNavigate } from 'react-router-dom';

interface FieldType {
  username?: string;
  password?: string;
}

const Login: React.FC = () => {
  const arrUsers = useAppSelector(selectUserList);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [activeUser, setActiveUser] = useState({ userName: '', password: '' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

// TODO rewrite when BE will be done
  const onFinish = (values: any) => {
    console.log('Success:', values);

    let userActive = { userName: '', password: '', fullName: '', photo: '' };

    for (let i = 0; i < arrUsers.length; i++) {
      arrUsers[i].userName === username
        ? (userActive = arrUsers[i])
        : console.log(false);
    }

    if (password === userActive.password) {
      dispatch(addActiveUser(userActive));
      return navigate('/user');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      validateTrigger="onSubmit"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your userName',
          },
        ]}
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password',
          },
        ]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => dispatch(addElement(''))}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
