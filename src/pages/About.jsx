import React from "react";
import TiltedCard from "../components/TiltedCard";
import "./About.css";
import ApproachExperience from "../components/ApproachExperience";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-content">
        <div className="image-gallery">
          <div className="gallery-item image-3">
            <TiltedCard
              imageSrc="/profile2.png"
              altText="Alfa overlooking landscape"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.05}
              rotateAmplitude={12}
              showMobileWarning={false}
            />
          </div>

          <div className="gallery-item image-1">
            <TiltedCard
              imageSrc="/profile1.png"
              altText="Alfa smiling"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.05}
              rotateAmplitude={12}
              showMobileWarning={false}
            />
          </div>

          <div className="gallery-item image-2">
            <TiltedCard
              imageSrc="/profile.png"
              altText="Alfa portrait"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.05}
              rotateAmplitude={12}
              showMobileWarning={false}
            />
          </div>
        </div>

        <div className="about-text">
          <h1 className="about-title">Hi again, I'm Alfa.</h1>

          <p className="about-paragraph">
            I'm a Digital Experience Designer, recently relocated to
            Brazzaville, passionate about creatively conveying software and
            product ideas through text and images.
          </p>

          <p className="about-paragraph">
            With a strong foundation in <b>UX research,</b> <b>Prototyping,</b>{" "}
            and <b>UI design,</b> I am dedicated to bridging the gap between
            business objectives and user needs. My goal is to craft intuitive
            and engaging digital experiences that not only meet but exceed
            expectations, driving both user satisfaction and business success.
          </p>
        </div>

        <ApproachExperience />
      </div>
    </div>
  );
};

export default AboutPage;
