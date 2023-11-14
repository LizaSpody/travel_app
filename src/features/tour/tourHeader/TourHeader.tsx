import React from 'react';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.scss';

interface DateTour {
  start: Date;
  finish: Date;
}

interface ToursPlan {
  city: string;
  desc: string;
  ticket: [];
  hotel: [];
  dates: DateTour;
}

interface TourHeaderProps {
  arr: {
    id: number;
    name: string;
    tags: string[];
    plan: ToursPlan[];
  };
}

const TourHeader: React.FC<TourHeaderProps> = ({ arr }) => {
  const { name, plan, tags } = arr;

  const showCity = () => plan.map((item) => item.city).join(', ');
  const getDates = () => {
    const firstDate = plan[0].dates;
    const lastDate = plan[plan.length - 1].dates;
    return `${firstDate.start.toLocaleString('en', {
      month: 'short',
    })} ${firstDate.start.getDate()} - ${
      firstDate.start.getMonth() === lastDate.finish.getMonth()
        ? ''
        : lastDate.start.toLocaleString('en', { month: 'short' })
    }  ${lastDate.finish.getDate()}`;
  };

  return (
    <>
      <div className="tour_header">
        <div className="container">
          <div className="tour_header-container">
            <div className="tour_info">
              <h2 className="tour_info-title">{name}</h2>
              <p className="tour_info-details">
                <span className="tour_info-country">{showCity()}</span> -{' '}
                <span className="tour_info-date">{getDates()}</span>
              </p>
              <div className="tour_tags">
                {tags.map((item, id) => <span key={id} className="tour_tags-item">#{item}</span>)}
              </div>
            </div>
            <Space className="tour_btn">
              <Button type="primary" block>
                <EditOutlined style={{ fontSize: '27px' }} /> Edit
              </Button>
              <Button type="primary" block>
                <DeleteOutlined style={{ fontSize: '27px' }} />
                Delete
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};
export default TourHeader;
