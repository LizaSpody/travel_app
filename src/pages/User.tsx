import React, { useEffect } from 'react';
import { useAppSelector } from '../hooks/utils';
import { selectUserActiveList } from '../counter/activeUserSlice';
import { Avatar, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { selectorPlanFilter } from '../counter/planSlice';
import { selectUserList } from '../counter/usersSlice';
import { Link } from 'react-router-dom';

const User: React.FC = () => {
  const { Meta } = Card;
  const activeUser = useAppSelector(selectUserActiveList);
  const navigate = useNavigate();
  const planCurrent = useAppSelector((state) =>
    selectorPlanFilter(state, activeUser.userName),
  );
  //
  // useEffect(() => {
  //   if (Object.keys(activeUser).length === 0) {
  //     navigate('/login');
  //   }
  // }, [activeUser, navigate]);

  return (
    <>
      <section>
        <div className="container">
          <Card style={{ width: 300 }}>
            <Meta
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
              }
              // title={activeUser.fullName}
              description="This is the description"
            />
          </Card>
        </div>
      </section>
      <section>
        <div className="container">
          <h2>My tour</h2>
          {planCurrent.map((item) => (
            <Link to={`/tour/${item.id}`}>{item.name}</Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default User;
