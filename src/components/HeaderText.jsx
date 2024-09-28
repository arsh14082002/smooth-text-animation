import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeaderText = ({ headText, shortText, description }) => {
  const headingRef = useRef(null);

  useEffect(() => {
    // Function to split text into individual span elements
    function splitTextIntoSpans(element) {
      const text = element.textContent;
      element.innerHTML = ''; // Clear the original text
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
        element.appendChild(span);
      });
    }

    // Apply the splitting to the h2 element
    const headingElement = headingRef.current;
    splitTextIntoSpans(headingElement);

    // Animate each span (character) from right to center and translate Y smoothly
    gsap.fromTo(
      headingElement.querySelectorAll('span'),
      {
        opacity: 0,
        marginRight: 4,
      },
      {
        marginRight: 0,
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        stagger: 0.05, // Animate each character with a slight delay
        ease: 'power2.out',
      },
    );

    // Animate the entire heading (optional)
    gsap.fromTo(
      headingElement,
      {
        x: '0px', // Start from right
      },
      {
        x: 0, // Move to center (0)
        y: 0, // Smoothly translate Y-axis
        duration: 1,
        ease: 'power2.out',
      },
    );
  }, [headText]);

  return (
    <div
      id="main"
      className="h-screen w-full flex flex-col justify-center items-center bg-black text-white"
    >
      <h2 className="text-6xl font-bold mb-5" ref={headingRef}>
        {headText}
      </h2>

      <div>
        <p>{shortText}</p>
      </div>

      <div className="lg:w-[50%] text-center leading-8">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default HeaderText;
