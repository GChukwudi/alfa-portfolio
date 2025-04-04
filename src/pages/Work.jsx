import React, { useState, useEffect } from "react";
import "./Work.css";
import ProjectSection from "../components/ProjectSection";
import { FaMapMarkerAlt } from "react-icons/fa";

const WorkPage = () => {
  const [locationText, setLocationText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const locations = React.useMemo(() => ["Remote_", "EMEA_"], []);
  const typingDelay = 150;
  const deletingDelay = 100;
  const pauseDelay = 2000;

  useEffect(() => {
    const ticker = setTimeout(
      () => {
        const i = loopNum % locations.length;
        const fullText = locations[i];

        if (isDeleting) {
          setLocationText(fullText.substring(0, locationText.length - 1));
        } else {
          setLocationText(fullText.substring(0, locationText.length + 1));
        }

        if (!isDeleting && locationText === fullText) {
          // Full word typed, wait and then delete
          setTimeout(() => setIsDeleting(true), pauseDelay);
        } else if (isDeleting && locationText === "") {
          // Word deleted, move to next word
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      },
      isDeleting ? deletingDelay : typingDelay,
    );

    return () => clearTimeout(ticker);
  }, [locationText, isDeleting, loopNum, locations]);

  return (
    <div className="flex flex-col h-screen bg-yellow-400">
      <div className="flex-1 relative">
        <div className="border-t-2 border-b-2 border-cyan-400 max-w-4xl mx-auto py-20 px-4">
          <h1 className="text-5xl text-center mb-8 title-text">Hi i'm Alfa</h1>

          <div className="flex items-center justify-center gap-2 mb-6 location-text">
            <span className="text-xs">
              <FaMapMarkerAlt className="map" />
            </span>
            <span className="relative">
              {locationText}
              <span className="cursor"></span>
            </span>
          </div>

          <p className="text-center text-lg max-w-xl mx-auto">
            I help product teams ship beautiful digital experiences
            <br />
            faster and with greater clarity.
          </p>
        </div>

        <div className="absolute bottom-8 w-full overflow-hidden">
          <div className="carousel-container">
            {/* Original set */}
            <span className="category-text mx-4">UI DESIGN</span>
            <span className="mx-4">•</span>
            <span className="category-text mx-4">PRODUCT DESIGN</span>
            <span className="mx-4">•</span>
            <span className="category-text mx-4">SYSTEM DESIGN</span>
            <span className="mx-4">•</span>

            <span className="category-text mx-4">UI DESIGN</span>
            <span className="mx-4">•</span>
            <span className="category-text mx-4">PRODUCT DESIGN</span>
            <span className="mx-4">•</span>
            <span className="category-text mx-4">SYSTEM DESIGN</span>
            <span className="mx-4">•</span>
          </div>
        </div>

        <ProjectSection />
      </div>
    </div>
  );
};

export default WorkPage;
