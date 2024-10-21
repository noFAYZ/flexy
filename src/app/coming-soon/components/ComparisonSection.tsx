"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp} from 'lucide-react';

import { ReactComponent as FlexyLogoIcon } from "/public/images/logo/DeFlexy.svg";
import { CrownIcon, FiverrIcon, PepiconsPencilCrownCircleFilled, UpworkIcon } from '@/components/icons/icons';
import { Chip } from '@nextui-org/react';



const CosmicComparisonChart = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const platforms = [
    {
      name: "DeFlexy",
      icon: <FlexyLogoIcon width={140} height={65} />,
      color: "#111111",
      tagline: "Unleash Your Earning Potential",
      features: {
        "Fees": "0%",
        "Payments": "Instant",
        "Access": "Global",
        "Data": "User-Owned",
        "Disputes": "Decentralized",
        "Currency": "Crypto & Fiat",
        "Tracking": "Automated",
        "Verification": "Blockchain"
      }
    },
    {
      name: "Traditional Platforms",
      icon: (
        <div className="flex flex-col sm:flex-row items-center justify-center space-x-1 sm:space-x-2">
          <UpworkIcon className="w-12 h-10 sm:w-24 sm:h-24 md:w-28 md:h-20" />
          <span className=" hidden sm:flex text-xs sm:text-sm md:text-base">/</span>
          <FiverrIcon className="w-12 h-8 sm:w-16 sm:h-16 md:w-20 md:h-16" />
        </div>
      ),
      color: "#14a800",
      tagline: "The Old Guard of Freelancing",
      features: {
        "Fees": "5-20%",
        "Payments": "1-14 Days",
        "Access": "Restricted",
        "Data": "Platform-Controlled",
        "Disputes": "Centralized",
        "Currency": "Primarily Fiat",
        "Tracking": "Manual",
        "Verification": "Platform Tests"
      }
    },
  ];
  
  const features = [
    "Fees",
    "Payments",
    "Access",
    "Data",
    "Disputes",
    "Currency",
    "Tracking",
    "Verification"
  ];

  return (
    <div className="min-h-screen text-white py-10 sm:py-20 px-4 overflow-hidden relative">
      <div className="sm:container mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Hero Section */}
        <motion.div 
          className="sm:max-w-2xl flex items-center content-center lg:w-1/3 mb-10 lg:mb-0 lg:sticky lg:top-20 px-12 shadow-lg bg-gray-950 py-12 sm:py-12 rounded-[3.5rem] lg:rounded-l-[4.5rem] lg:rounded-r-none sm:-mr-12 bg-opacity-50 backdrop-filter backdrop-blur-lg transform skew-y-3"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className='items-center justify-center'>
            <motion.div
              className="mb-6 relative -skew-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold relative z-10 -skew-y-3">
                <span className="text-orange-600">Fair Pay,</span><br />
                <span className="text-white">Your Way</span>
              </h2>
              <svg className="absolute top-0 left-0 w-full h-full z-0 opacity-10 -skew-y-3" viewBox="0 0 200 200">
                <path fill="#FF6B6B" d="M37.5,-51.7C50.2,-43.9,63,-34.3,71.5,-20.4C80,-6.6,84.2,11.6,78.9,26.5C73.7,41.3,59,52.8,43.6,61.9C28.2,70.9,12.1,77.5,-3.1,81.3C-18.4,85.1,-36.9,86.2,-51.2,78.1C-65.6,70.1,-76,52.9,-79.8,35.3C-83.7,17.7,-81,0,-75.7,-16.1C-70.4,-32.2,-62.6,-46.8,-50.3,-54.7C-38,-62.7,-21.3,-64.1,-6,-57.1C9.3,-50.1,24.7,-59.6,37.5,-51.7Z" transform="translate(100 100)" />
              </svg>
            </motion.div>
            
            <motion.p
              className="text-sm md:text-md xl:text-lg hidden sm:flex text-gray-300 mb-8 relative z-10 -skew-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Tired of high fees eating into your hard-earned money? We've built a platform where you keep what you earn. No catches, no hidden costs - just fair pay for your work.
            </motion.p>
            
            <motion.ul
              className="list-disc list-inside text-sm md:text-md text-gray-300 mb-8 space-y-2 -skew-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <li>Zero platform fees</li>
              <li>Get paid instantly</li>
              <li>Work with clients worldwide</li>
              <li>Your data stays yours</li>
            </motion.ul>

            <motion.button
              className="px-8 py-3 bg-orange-500 text-white rounded-full font-semibold text-lg shadow-lg relative z-10 overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className="relative z-10">Join Now</span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-orange-600"></div>
            </motion.button>
          </div>
        </motion.div>

      {/* Comparison Chart */}
      <div className="w-full lg:w-2/3 mx-auto relative z-10">
          <div className="cosmic-chart bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg">
            <div className="feature-column  max-w-[8rem] sm:max-w-[8rem] md:max-w-[10rem]">
              <div className="feature-header px-2 rounded-tl-[1rem] sm:rounded-tl-[2rem] text-[0.6rem] sm:text-sm md:text-base h-20">Features</div>
              {features.map((feature, index) => (
                <motion.div 
                  key={feature} 
                  className="feature-item py-2 sm:py-4 md:py-6 text-orange-500 font-bold text-center items-center text-[0.6rem] sm:text-sm md:text-base"
                  onMouseEnter={() => setHoveredFeature(feature)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {feature}
                </motion.div>
              ))}
            </div>
            {platforms.map((platform, platformIndex) => (
              <div key={platform.name} className={`platform-column ${platform.name === "DeFlexy" ? "deflexy-column backdrop:blur-lg bg-opacity-65 uppercase" : "max-w-[12rem] sm:max-w-[15rem] md:max-w-[18rem]"}`}>
                <motion.div 
                  className={`platform-header rounded-tr-[1rem] sm:rounded-tr-[2rem] ${platform.name === "DeFlexy" ? "deflexy-header py-2 sm:py-3 md:py-4 uppercase rounded-t-[1rem] sm:rounded-t-[2rem] rounded-b-[0.5rem] sm:rounded-b-[2rem] border-2 border-orange-600 border-b-red-500 shadow-xl backdrop:blur-lg" : "uppercase"}`}
                  style={{ 
                    backgroundColor: platform.color,
                    scale: platform.name === "DeFlexy" ? 1.02 : 1 
                  }}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: platformIndex * 0.2 }}
                >
                  <span className="platform-icon scale-75 sm:scale-90 md:scale-100">{platform.icon}</span>
                  {platform.name === "DeFlexy" && (
                    <Chip  startContent={<PepiconsPencilCrownCircleFilled />} className="absolute bg-white -top-5 text-black font-bold right-0">
                      <span className='text-xs font-bold'>Best Choice</span>
                    </Chip>

                    
                  )}
                </motion.div>
                {features.map((feature, featureIndex) => (
                  <motion.div 
                    key={`${platform.name}-${feature}`} 
                    className={`platform-feature text-center items-center 
                      ${platform.name === 'DeFlexy' ? 'deflexy-feature text-xs sm:text-sm md:text-lg font-mono font-bold py-[0.45rem] sm:py-4 md:py-6' : 'text-[0.6rem] sm:text-sm md:text-base py-2 sm:py-6 md:py-6'} 
                      ${platform.name === 'DeFlexy' && platform.features[feature] === '0%' ? 'highlight' : ''} 
                      ${hoveredFeature === feature ? 'hovered' : ''}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: (platformIndex * features.length + featureIndex) * 0.05 }}
                  >
                    {platform.features[feature]}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .cosmic-chart {
          display: flex;
          border-radius: 1.5rem;
          box-shadow: 0 0 30px rgba(255, 102, 0, 0.3);
          position: relative;
        }

        .feature-column, .platform-column {
          display: flex;
          flex-direction: column;
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .feature-header, .platform-header {
          font-weight: bold;
          text-align: center;
          background-color: rgba(0, 0, 0, 0.6);
          color: #ff6600;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60px;
        }

        .platform-header {
          flex-direction: column;
          font-size: 0.8rem;
          border-radius: 1.5rem;
        }

        .deflexy-column {
          position: relative;
          z-index: 2;
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 5px 15px rgba(255, 102, 0, 0.3);
          border-radius: 20px;
          background: linear-gradient(145deg, #ff8800, #ff6600);
        }

        .deflexy-header {
          background-color: #ffffff !important;
          color: white;
          position: relative;
          border-radius: 1.5rem;
        }

        .best-choice-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #ffcc00;
          color: #ff6600;
          padding: 3px 6px;
          font-weight: bold;
          transform: rotate(15deg);
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%);
          animation: badgePulse 2s infinite;
        }

        .best-choice-badge span {
          display: block;
          transform: rotate(-15deg);
        }

        @keyframes badgePulse {
          0%, 100% { transform: rotate(15deg) scale(1); }
          50% { transform: rotate(15deg) scale(1.05); }
        }

        .platform-icon {
          font-size: 2rem;
          margin-bottom: 0.25rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .feature-item, .platform-feature {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background-color: rgba(0, 0, 0, 0.4);
          transition: all 0.3s ease;
          padding: 0.25rem;
        }

        .deflexy-feature {
          background-color: rgba(255, 255, 255, 0.1);
          font-weight: bold;
          color: white;
          position: relative;
        }

        .highlight {
          color: #ffcc00;
          text-shadow: 0 0 5px rgba(255, 204, 0, 0.5);
        }

        .feature-item:hover, .platform-feature:hover, .platform-feature.hovered {
          transform: scale(1.03);
          z-index: 3;
          box-shadow: 0 0 10px rgba(255, 102, 0, 0.4);
        }

        @media (min-width: 640px) {
          .cosmic-chart {
            border-radius: 2.5rem;
          }

          .platform-header {
            font-size: 1rem;
          }

          .feature-item, .platform-feature {
            padding: 0.5rem;
          }

          .best-choice-badge {
            top: -12px;
            right: -12px;
            padding: 4px 8px;
          }
        }

        @media (min-width: 768px) {
          .cosmic-chart {
            border-radius: 3.5rem;
          }

          .platform-header {
            font-size: 1.2rem;
          }

          .feature-item, .platform-feature {
            padding: 0.75rem;
          }

          .best-choice-badge {
            top: -15px;
            right: -15px;
            padding: 5px 10px;
          }
        }
      `}</style>
    </div>
  );
};





const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Innovate", "Create", "Collaborate", "Succeed"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 text-center w-full px-2 max-w-4xl mx-auto bg-gray-950 py-12 sm:py-12 rounded-[4.5rem] skew-y-6 bg-opacity-50 backdrop-filter backdrop-blur-lg transform">
        <div className="-skew-y-6 px-4 sm:px-8 lg:px-16">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6">
            Where Creators
            <span className="block mt-2 h-16 sm:h-24">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  className="inline-block text-orange-500"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Join the next generation of digital collaboration. Connect, create, and conquer the digital frontier.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              className="w-full sm:w-auto px-8 py-3 bg-orange-500 text-white rounded-full font-semibold text-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#f97316" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-orange-500 text-orange-500 rounded-full font-semibold text-lg"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(249, 115, 22, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsletterSection = () => (

    <div className="container mx-auto px-4 py-20 relative z-10">
      <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-8 transform -skew-y-3">
        <h2 className="text-4xl font-bold text-center text-white mb-6 transform skew-y-3">Stay Ahead of the Curve</h2>
        <p className="text-gray-300 text-center mb-8 transform skew-y-3">Join our newsletter for exclusive insights, early access, and game-changing opportunities.</p>
        <form className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 transform skew-y-3">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-grow px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <motion.button
            className="px-8 py-3 bg-gradient-to-b from-orange-500 to-pink-500 text-white rounded-lg font-semibold"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.button>
        </form>
      </div>
    </div>

);

const SpaceThemedSections = () => (
  <>
    <HeroSection />

    <CosmicComparisonChart />

    <NewsletterSection />
  </>
);

export default SpaceThemedSections;