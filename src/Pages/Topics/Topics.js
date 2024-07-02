import './Topics.css';
import { useState, useEffect } from 'react';
import { Minicards } from '../../components';
import GAMEDEV from '../../SVG/undraw_gaming_re_cma2.svg';
import PHONE from '../../SVG/undraw_voice_assistant_nrv7.svg';
import DESKTOP from '../../SVG/undraw_responsive_re_e1nn.svg';
import WEBSITE from '../../SVG/undraw_static_website_re_x70h.svg';
import AI from '../../SVG/undraw_artificial_intelligence_re_enpp.svg';
import SECURITY from '../../SVG/undraw_security_re_a2rk.svg';

const Topics = ({ onSkillTypeSelect, activeListingType }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const totalSlides = 2; // We have two sets of slides
  const [selectedSkillType, setSelectedSkillType] = useState(null);

  useEffect(() => {
    // Reset selectedSkillType when activeListingType changes
    setSelectedSkillType(null);
  }, [activeListingType]);

  const slideLeft = () => {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const slideRight = () => {
    setSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const handleMinicardClick = (skillType) => {
    setSelectedSkillType(skillType);
    onSkillTypeSelect(skillType);
  };

  return (
    <div className='TopicsContainer'>
      <h1 className='heading-Topics'>What topics interest you?</h1>
      <div className='slider'>
        {/* <button className='slide-button left' onClick={slideLeft}>&lt;</button> */}
        <div className='slide-container' style={{ transform: `translateX(-${slideIndex * 10}%)` }}>
          <div className='wrap-class'>
            <Minicards
              className="minicard-small"
              title="Game dev"
              image={GAMEDEV}
              width="300"
              height="300"
              skillType="GameDevelopment"
              isSelected={selectedSkillType === "GameDevelopment"}
              onClick={() => handleMinicardClick("GameDevelopment")}
            />
            <Minicards
              className="minicard-small"
              title="Mobile dev"
              image={PHONE}
              width="300"
              height="300"
              skillType="MobileDevelopment"
              isSelected={selectedSkillType === "MobileDevelopment"}
              onClick={() => handleMinicardClick("MobileDevelopment")}
            />
            <Minicards
              className="minicard-small"
              title="Desktop dev"
              image={DESKTOP}
              width="300"
              height="300"
              skillType="DesktopApplications"
              isSelected={selectedSkillType === "DesktopApplications"}
              onClick={() => handleMinicardClick("DesktopApplications")}
            />
          </div>
          <div className='wrap-class'>
            <Minicards
              className="minicard-small"
              title="Website dev"
              image={WEBSITE}
              width="300"
              height="300"
              skillType="Webdevelopment"
              isSelected={selectedSkillType === "Webdevelopment"}
              onClick={() => handleMinicardClick("Webdevelopment")}
            />
            <Minicards
              className="minicard-small"
              title="Security"
              image={SECURITY}
              width="300"
              height="300"
              skillType="DataAnalysis"
              isSelected={selectedSkillType === "DataAnalysis"}
              onClick={() => handleMinicardClick("DataAnalysis")}
            />
            <Minicards
              className="minicard-small"
              title="AI"
              image={AI}
              width="300"
              height="300"
              skillType="IA"
              isSelected={selectedSkillType === "IA"}
              onClick={() => handleMinicardClick("IA")}
            />
          </div>
        </div>
        <button className='slide-button right' onClick={slideRight}>&gt;</button>
      </div>
    </div>
  );
};

export default Topics;
