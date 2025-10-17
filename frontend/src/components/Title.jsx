import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-gray-800">
        <span className="text-gray-400 font-normal">{text1}</span>
        <span className="mx-2">|</span>
        {text2}
      </h2>
    </div>
  );
};

export default Title;