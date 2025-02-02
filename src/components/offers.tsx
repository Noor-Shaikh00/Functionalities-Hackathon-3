'use client';

import Image from 'next/image';

function Offer() {
  const offers = [
    { id: 1, icon: '/images/icon1.png', title: '24/7 Support', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.' },
    { id: 2, icon: '/images/icon2.png', title: '24/7 Support', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.' },
    { id: 3, icon: '/images/icon3.png', title: '24/7 Support', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.' },
    { id: 4, icon: '/images/icon4.png', title: '24/7 Support', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.' },
  ];

  return (
    <div className="w-full bg-white py-10 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <h2 className="text-[#3F509E] text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
        What Shopex Offer!
      </h2>

      {/* Offer Boxes */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex flex-col items-center text-center border border-gray-200 p-4 sm:p-6 rounded-lg shadow-lg"
          >
            {/* Icon */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4">
              <Image
                src={offer.icon}
                alt={offer.title}
                width={64}
                height={64}
                className="object-contain w-full h-full"
              />
            </div>
            {/* Heading */}
            <h3 className="text-[#3F509E] font-bold text-base sm:text-lg mb-2">
              {offer.title}
            </h3>
            {/* Description */}
            <p className="text-gray-600 text-xs sm:text-sm">
              {offer.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offer;