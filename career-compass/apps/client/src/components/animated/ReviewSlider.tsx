import { useState, useEffect } from 'react';
import { reviews } from '../../constants';

const ReviewSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % reviews.length;
    const id = setTimeout(() => setCurrentIndex(nextIndex), 8000); // Change slide every 5 seconds
    return () => clearTimeout(id); // Clear timeout if the component unmounts
  }, [currentIndex]);

  const currentReview = reviews[currentIndex];

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <div className="overflow-hidden bg-neutral-purple bg-opacity-75 w-full max-w-[500px] h-[190px] p-6 rounded-3xl">
        <div className="slider-content text-sm" key={currentIndex}>
          <div className="flex items-center gap-2 mb-4">
            <img
              src={currentReview.image}
              alt={`A image of ${currentReview.name}`}
              height={100}
              width={100}
              className="rounded-full h-10 w-10 object-cover"
            />
            <div className="">
              <p className="font-normal leading-[90%]">{currentReview.name}</p>
              <p className="text-dark-gray">{currentReview.workAs}</p>
            </div>
          </div>

          <p>{currentReview.review}</p>
        </div>
      </div>
      <div className="flex gap-1">
        <div
          className={`h-1  bg-light-gray rounded-full transition-all duration-350
		${currentIndex === 0 ? 'bg-white w-8' : 'w-3'}
		`}
        ></div>
        <div
          className={`h-1  bg-light-gray rounded-full transition-all duration-350
		${currentIndex === 1 ? 'bg-white w-8' : 'w-3'}
		`}
        ></div>
        <div
          className={`h-1  bg-light-gray rounded-full transition-all duration-350
		${currentIndex === 2 ? 'bg-white w-8' : 'w-3'}
		`}
        ></div>
      </div>
    </div>
  );
};
export default ReviewSlider;
