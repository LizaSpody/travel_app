import React, { useMemo } from 'react';
import Plan from '../features/tour/plan/Plan';
import Gallery from '../features/tour/gallery/Gallery';
import TourHeader from '../features/tour/tourHeader/TourHeader';
import ShortProfile from '../components/ShortProfile/ShortProfile';
import { useParams } from 'react-router-dom';
import { selectorPlanId } from '../counter/planSlice';
import { useAppSelector } from '../hooks/utils';

function Tour() {
  const { tourId } = useParams();
  const [arr] = useMemo(() => {
    return useAppSelector((state) => selectorPlanId(state, Number(tourId)));
  }, [tourId]);

  return (
    <>
      <ShortProfile />
      <section className="tour_wrap">
        <TourHeader arr={arr} />
        <Gallery />
        <Plan arr={arr} />
      </section>
    </>
  );
}

export default Tour;
