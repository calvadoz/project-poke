export const fadeInAnimations = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInAnimationsWithDelay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2 } },
  exit: { opacity: 0 },
};

export const pathAnimations = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: { duration: 1, ease: "easeInOut" },
  },
};
