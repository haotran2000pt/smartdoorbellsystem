import Tippy, { TippyProps } from "@tippyjs/react/headless";
import { motion, useSpring } from "framer-motion";
import _ from "lodash";
import React, { cloneElement, ReactElement, useEffect, useState } from "react";
import { followCursor as followCursorPlugin } from "tippy.js";
import { PopoverProvider } from "./popover-context";

interface PopoverProps extends TippyProps {
  isContextMenu?: boolean;
  handleHide?: () => any;
}

const Popover = React.forwardRef<any, PopoverProps>(
  (
    {
      isContextMenu,
      followCursor,
      visible: customVisible,
      handleHide: customHandleHide,
      children,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const [initial, setInitial] = useState(false);

    const handleShow = () => {
      setVisible(true);
    };

    const handleHide = () => {
      if (customHandleHide) {
        customHandleHide();
      } else {
        setVisible(false);
      }
    };

    const handleCick = (onClick: any) => {
      if (!isContextMenu) {
        visible ? handleHide() : handleShow();
      }
      onClick && onClick();
    };

    // const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    //   e.preventDefault();
    //   visible ? handleHide() : handleShow();
    // };

    const opacity = useSpring(0, {
      duration: 100,
    });
    const scale = useSpring(0.7, { duration: 50, bounce: 10 });

    const onMount = () => {
      opacity.set(1);
      scale.set(1);
    };

    const onHide = ({ unmount }: any) => {
      const cleanup = scale.onChange((value) => {
        if (value <= 0.9) {
          cleanup();
          unmount();
        }
      });

      scale.set(0.9);
      opacity.set(0.4);
    };

    useEffect(() => {
      setInitial(true);
    }, []);

    return (
      <PopoverProvider close={handleHide}>
        <Tippy
          {...props}
          appendTo={initial ? document.body : "parent"}
          onMount={onMount}
          onHide={onHide}
          animation={true}
          onClickOutside={handleHide}
          ref={ref}
          interactive={true}
          visible={_.isUndefined(customVisible) ? visible : customVisible}
          followCursor={followCursor ? "initial" : false}
          plugins={[followCursorPlugin]}
          offset={[0, 8]}
          render={(attrs) => (
            <motion.div
              tabIndex={-1}
              style={{ opacity, scale }}
              className="bg-white rounded shadow-lg text-sm font-medium border"
              {...attrs}
            >
              {cloneElement(props.content as ReactElement, {
                onClick: handleHide,
              })}
            </motion.div>
          )}
        >
          {children &&
            cloneElement(children, {
              onClick: () => handleCick(children.props.onClick),
            })}
        </Tippy>
      </PopoverProvider>
    );
  }
);

Popover.displayName = "Popover";

export default Popover;
