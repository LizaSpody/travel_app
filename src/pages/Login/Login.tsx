import React, { useState } from 'react';
import './index.scss';
import { Button, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/utils';
import { selectUserList } from '../../counter/usersSlice';
import { addElement } from '../../counter/usersSlice';
import { addActiveUser } from '../../counter/activeUserSlice';
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
        <Form
          validateTrigger="onSubmit"
          name="basic"
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
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => dispatch(addElement(''))}
            >
              Submit
            </Button>
          </Form.Item>

          <div className="form-bottom">
            <p>
              Don’t have an account?
              <button onClick={() => navigate('/registration')} className="form-bottom-link">Sign Up</button>
            </p>
          </div>
        </Form>
      </div>
    </section>
  );
};
export default Login;
