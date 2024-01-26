import React, { useEffect } from 'react';
import './index.scss';
import { useAppSelector } from '../../hooks/utils';
import { selectUserActiveList } from '../../counter/activeUserSlice';
import { Avatar, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { differenceInCalendarDays } from 'date-fns';
import {
  selectorPlanFilter,
  selectorPlanRecomendate,
} from '../../counter/planSlice';
import { selectUserList } from '../../counter/usersSlice';
import { Link } from 'react-router-dom';

const User: React.FC = () => {
  const { Meta } = Card;
  const activeUser = useAppSelector(selectUserActiveList);
  const navigate = useNavigate();
  const planCurrent = useAppSelector((state) =>
    selectorPlanFilter(state, activeUser.userName),
  );
  const planRecomendate = useAppSelector((state) =>
    selectorPlanRecomendate(state, activeUser.userName),
  );
  //
  // useEffect(() => {
  //   if (Object.keys(activeUser).length === 0) {
  //     navigate('/login');
  //   }
  // }, [activeUser, navigate]);

  const quantity = (name: string) => {
    if (name === 'city') {
      const cities: string[] = [];
      planCurrent.forEach((item) => {
        const { plan } = item;
        plan.forEach((el) => {
          el.city ? cities.push(el.city) : false;
        });
      });
      return cities.filter((el, ind) => ind === cities.indexOf(el)).length;
    }
    if (name === 'plan') {
      return planCurrent.length;
    }
    const quantity = 0;
    planCurrent.forEach((item) => {
      const { plan } = item;
      plan.forEach((el) => {console.log(el[name])});
    });
    return quantity;
  };

  const userStatstic = [
    {
      name: 'city',
      number: quantity('city'),
      icon: 'https://www.svgrepo.com/show/480676/dutch.svg',
      title: 'city',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisci elit.',
    },
    {
      name: 'hotel',
      number: quantity('hotel'),
      icon: 'https://www.svgrepo.com/show/533493/hotel.svg',
      title: 'Hotels',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisci elit.',
    },
    {
      name: 'ticket',
      number: quantity('ticket'),
      icon: 'https://www.svgrepo.com/show/532295/ticket-simple.svg',
      title: 'tickets',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisci elit.',
    },
    {
      name: 'plan',
      number: quantity('plan'),
      icon: 'https://www.svgrepo.com/show/480943/travel.svg',
      title: 'Trips',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisci elit.',
    },
  ];

  return (
    <>
      <section className="profile">
        <div className="profile__head">
          <div className="profile__head-card">
            <Card>
              <Meta
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                }
                title={activeUser.fullName}
                description="This is the description"
              />
            </Card>
          </div>
          <div className="profile__head-info">
            <div className="profile__info">
              {userStatstic.map((item) => (
                <div className="profile__info-item">
                  <div className="icon">
                    <img src={item.icon} alt="" />
                  </div>
                  <div className="content">
                    <h3 className="title">
                      <span className="title-number">{item.number}</span>
                      {item.title}
                    </h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Link to={`/add`}>Add tour</Link>
      <section className="profile__tour">
        <div className="container">
          <h2 className="section-title">
            <span className="color">My</span> tour
          </h2>
          <Link to={`/tours`}>All tours</Link>
        </div>
        <div className="catalog">
          <div className="container">
            <div className="catalog-list">
              {planCurrent.map((item) => (
                <div className="catalog__col">
                  <div className="catalog__item">
                    <Link
                      to={`/tour/${item.id}`}
                      className="catalog__item-photo"
                      style={{
                        backgroundImage: `url("https://content.presspage.com/uploads/1376/1920_sustainabletravel.jpg?10000")`,
                      }}
                    />
                    <div className="catalog__item-bottom">
                      <Link
                        to={`/tour/${item.id}`}
                        className="catalog__item-title"
                      >
                        {item.name}
                      </Link>
                      <div className="catalog__item-info">
                        <span className="catalog__item-days">
                          {differenceInCalendarDays(
                            item.dates.finish,
                            item.dates.start,
                          )}{' '}
                          days
                        </span>
                        <Link
                          to={`/tour/${item.id}`}
                          className="catalog__item-link"
                        >
                          open
                          <svg
                            width="17"
                            height="28"
                            viewBox="0 0 17 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              id="Vector 17"
                              d="M2.3335 2L15.0002 14.4444L2.3335 26"
                              stroke="#666666"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="profile__recommendation">
        <div className="container">
          <h2 className="section-title">
            <span className="color">recommended</span> tours
          </h2>
          <div className="recommendation">
            <div className="recommendation-list">
              {planRecomendate.map((item) => (
                <div className="recommendation-col">
                  <div className="recommendation__item">
                    <Link
                      to={`/tour/${item.id}`}
                      className="recommendation__item-photo"
                      style={{
                        backgroundImage: `url("https://content.presspage.com/uploads/1376/1920_sustainabletravel.jpg?10000")`,
                      }}
                    />
                    <div className="recommendation__item-bottom">
                      <Link
                        to={`/tour/${item.id}`}
                        className="recommendation__item-title"
                      >
                        {item.name}
                      </Link>
                      <div className="recommendation__item-info">
                        <span className="recommendation__item-days">
                          {differenceInCalendarDays(
                            item.dates.start,
                            item.dates.finish,
                          )}
                          days
                        </span>
                        <Link
                          to={`/tour/${item.id}`}
                          className="catalog__item-link"
                        >
                          open
                          <svg
                            width="17"
                            height="28"
                            viewBox="0 0 17 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              id="Vector 17"
                              d="M2.3335 2L15.0002 14.4444L2.3335 26"
                              stroke="#666666"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default User;
