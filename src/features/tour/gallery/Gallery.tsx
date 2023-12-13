import React from 'react';
import { Image } from 'antd';
import './index.scss';

const Gallery: React.FC = () => {
  return (
    <>
      <div className="gallery">
        <div className="container">
          <div className="gallery_wrap">
            <Image.PreviewGroup>
              <div className="gallery_col">
                <Image src="https://img.championat.com/i/h/z/1626340964610874745.jpg" />
              </div>
              <div className="gallery_col">
                <Image src="https://img.championat.com/i/h/z/1626340964610874745.jpg" />
              </div>
              <div className="gallery_col">
                <Image src="https://img.championat.com/i/h/z/1626340964610874745.jpg" />
              </div>
              <div className="gallery_col">
                <Image src="https://img.championat.com/i/h/z/1626340964610874745.jpg" />
              </div>
              <div className="gallery_col">
                <Image src="https://img.championat.com/i/h/z/1626340964610874745.jpg" />
              </div>
              <div className="gallery_col">
                <Image src="https://img.championat.com/i/h/z/1626340964610874745.jpg" />
              </div>
              <div className="gallery_col">
                <Image src="https://img.championat.com/i/h/z/1626340964610874745.jpg" />
              </div>
              <div className="gallery_col">
                <Image src="https://img.championat.com/i/h/z/1626340964610874745.jpg" />
              </div>
              <div className="gallery_col">
                <Image src="https://img.championat.com/i/h/z/1626340964610874745.jpg" />
              </div>
              <div className="gallery_col">
                <Image src="https://img.championat.com/i/h/z/1626340964610874745.jpg" />
              </div>
              <div className="gallery_col">
                <Image src="https://img.championat.com/i/h/z/1626340964610874745.jpg" />
              </div>
            </Image.PreviewGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
