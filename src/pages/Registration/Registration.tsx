import React, { useState } from 'react';
import './index.scss';
import { Button, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/utils';
import { selectUserList } from '../../counter/usersSlice';
import { addUser } from '../../counter/usersSlice';
import { addActiveUser } from '../../counter/activeUserSlice';
import { useNavigate } from 'react-router-dom';

interface FieldType {
  username?: string;
  password?: string;
  passwordRepeat?: string;
  fullName?: string;
}

interface NewUser {
  userName: string;
  password: string;
  fullName: string;
  photo: string;
}

const Registration: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  // const [activeUser, setActiveUser] = useState({ userName: '', password: '' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // TODO rewrite when BE will be done
  const onFinish = (values: any) => {
    console.log('Success:', values);

    const newUser: NewUser = { userName: username, password, fullName, photo: '' };

    dispatch(addUser(newUser));
    dispatch(addActiveUser(newUser));
    return navigate('/user');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className="login">
      <div className="login-left">
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
          className="back"
        >
          <svg
            width="11"
            height="19"
            viewBox="0 0 11 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 1.31812L1 9.80296L10 17.6817"
              stroke="#022359"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
      </div>
      <div className="login-right">
        <div className="login-header">
          <div className="logo">BestTour</div>
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <h1 className="login-title">Welcome to BestTour</h1>
        <h2 className="login-subtitle">Crete account:</h2>
        <Form
          validateTrigger="onSubmit"
          name="register"
          initialValues={{ remember: false }}
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
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item<FieldType>
              label="FullName"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: 'Please input your fullName',
                },
              ]}
          >
            <Input
                value={username}
                onChange={(e) => setFullName(e.target.value)}
            />
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

          <Form.Item<FieldType>
            label="Repeat password"
            name="passwordRepeat"
            dependencies={['password']}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password value={''} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              >
              Submit
            </Button>
          </Form.Item>

          <div className="form-bottom">
            <p>
              Do you have an account?
              <button onClick={() => navigate('/login')} className="form-bottom-link">Log In</button>
            </p>
          </div>
        </Form>
      </div>
    </section>
  );
};
export default Registration;
