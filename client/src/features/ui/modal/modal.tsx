import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import createPortalRoot from "src/utils/createPortalRoot";
import { ModalProvider } from "./modal-context";

export interface ModalProps {
  isOpen: boolean;
  children?: React.ReactNode;
  className?: string;
  onClose: () => any;
}

const Modal = ({ isOpen, children, className, onClose }: ModalProps) => {
  const portalId = "modal-portal";

  const bodyRef = useRef<HTMLBodyElement | null>(null);
  const portalRootRef = useRef<HTMLElement | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    bodyRef.current = document.querySelector("body");
    portalRootRef.current =
      document.getElementById(portalId) ?? createPortalRoot(portalId);
    if (bodyRef.current) {
      bodyRef.current.appendChild(portalRootRef.current);
      // const portal = portalRootRef.current;
      // const bodyEl = bodyRef.current;
      return () => {
        // Clean up the portal when drawer component unmounts
        // portal.remove();
        // Ensure scroll overflow is removed
        // bodyEl.style.overflow = "";
      };
    }
  }, []);

  // if (!isOpen && animationEnd) return null;

  return !mounted
    ? null
    : createPortal(
        <ModalProvider close={onClose}>
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Modal content */}
                <motion.div
                  aria-hidden={isOpen ? "false" : "true"}
                  initial={{
                    scale: 0.7,
                    opacity: 0,
                    x: "-50%",
                    y: "-50%",
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: {
                      duration: 0.125,
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  exit={{
                    scale: 0.8,
                    opacity: 0,
                    transition: { duration: 0.125 },
                  }}
                  className={classNames(
                    className,
                    "fixed top-1/2 z-50 left-1/2 origin-center bg-white w-full max-w-[480px] rounded-lg"
                  )}
                >
                  {children}
                </motion.div>
                {/* Background */}
                <motion.div
                  key="modal-background"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      type: "keyframes",
                      duration: 0.1,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.1 },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="fixed inset-0 bg-black/[0.6] z-40"
                />
              </>
            )}
          </AnimatePresence>
        </ModalProvider>,
        portalRootRef.current as Element
      );
};

export default Modal;
