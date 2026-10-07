export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export const scaleOnHover = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
};

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};
