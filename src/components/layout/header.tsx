import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center mt-5 justify-between">
      <div className="w-[99%] h-[6rem] p-6 bg-foreground">
        <h1 className="text-white text-2xl italic mt-2">{title}</h1>
      </div>
    </div>
  );
};

export default Header;
