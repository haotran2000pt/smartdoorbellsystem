import classNames from "classnames";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import TabButton from "./tab-button";
import { motion, TargetAndTransition } from "framer-motion";

interface TabsProps {
  items: string[] | { label: string; value: string }[];
  onChange?: (value: any) => any;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ className, items, onChange }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const buttonRefs = useRef(
    items.map(() => React.createRef<HTMLButtonElement>())
  );
  const [style, setStyle] = useState<TargetAndTransition>();

  const handleClick = (value: any, index: number) => {
    setCurrentTab(index);
    onChange && onChange(value);
  };

  useEffect(() => {
    setStyle({
      width: buttonRefs.current[currentTab].current?.clientWidth,
      x: buttonRefs.current[currentTab].current?.offsetLeft,
    });
  }, [currentTab]);

  return (
    <div className={classNames("flex p-1 relative", className)}>
      {items.map((item, i) => {
        if (_.isString(item)) {
          return (
            <TabButton
              ref={buttonRefs.current[i]}
              onClick={() => handleClick(item, i)}
              active={i === currentTab}
              key={`item_tab${item}`}
            >
              {item}
            </TabButton>
          );
        } else {
          return (
            <TabButton
              ref={buttonRefs.current[i]}
              onClick={() => handleClick(item.value, i)}
              active={i === currentTab}
              key={`item_tab${item.value}`}
            >
              {item.label}
            </TabButton>
          );
        }
      })}
      <motion.div
        animate={style}
        transition={{
          type: "keyframes",
          duration: 0.2,
        }}
        className="absolute bottom-0 h-[2.5px] bg-indigo-500 rounded-t-md left-0"
      />
    </div>
  );
};

export default Tabs;
