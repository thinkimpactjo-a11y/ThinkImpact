import React from 'react';

interface CardProps {
  title: string;
  description: string;
  category_logo: string;
}

const FlippingCard: React.FC<CardProps> = ({ title, description, category_logo }) => {
  return (
    <div
      className="relative w-full max-w-sm aspect-[3/2] rounded-lg overflow-hidden
                 perspective-[1000px] transition-transform duration-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                 hover:scale-[1.05] hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)] group cursor-pointer"
    >
      {/* Front side with background image */}
      <div className='  absolute bg-black/30 h-full w-full inset-0 z-2 group-hover:hidden '></div>
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover  flex flex-col items-center  justify-center"
        style={{ backgroundImage: `url(${category_logo})` }}
      >
          <p className="text-xl font-bold text-white shadow-lg z-4 group-hover:hidden ">{title}</p>
        
      </div>

      {/* Back side */}
      <div
        className="absolute top-0 left-0 w-full h-full p-5 box-border text-white font-bold
                   transform -rotate-x-90 origin-bottom
                   transition-transform duration-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                   group-hover:rotate-x-0
                   flex flex-col justify-center bg-[#0f4473]"
      >
        <p className="mt-2 text-sm lg:text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FlippingCard;
