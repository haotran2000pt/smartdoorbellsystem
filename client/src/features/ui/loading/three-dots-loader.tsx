import classNames from "classnames";
import { motion, Variants } from "framer-motion";
import _ from "lodash";

const ContainerVariants: Variants = {
  inital: {
    transition: {
      staggerChildren: 0.25,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const DotVariants: Variants = {
  initial: {
    scale: 0.7,
    opacity: 0.3,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
};

const ThreeDotsLoader = ({ className }: { className?: string }) => {
  return (
    <div className="flex-center h-[1.5em]">
      <motion.div
        className="flex space-x-[3px]"
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        {_.range(3).map((i) => (
          <motion.span
            key={`threedotloader${i}`}
            className={classNames(
              "w-1.5 h-1.5 bg-white rounded-full",
              className
            )}
            variants={DotVariants}
            transition={{
              duration: 0.75,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ThreeDotsLoader;
