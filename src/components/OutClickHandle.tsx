import React, { useRef, useEffect, ReactNode } from "react";

type OutclickHandlerProps = {
  onOutclick: () => void;
  children: ReactNode;
};

const OutclickHandler = ({ onOutclick, children }: OutclickHandlerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onOutclick();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Unbind the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutclick]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutclickHandler;
