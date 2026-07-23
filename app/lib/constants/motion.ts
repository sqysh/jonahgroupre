export const topBarVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

export const headerVariants = {
  open: { x: 0 },
  closed: { x: 0 }
}

export const iconVariants = {
  hover: { scale: 1.2, color: '#f97316' },
  tap: { scale: 0.95 }
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}

export const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } }
}

export const buttonVariants = {
  hover: { scale: 1.05, backgroundColor: '#ea580c' },
  tap: { scale: 0.95 }
}

export const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, staggerChildren: 0.18, delayChildren: 0.3 }
  }
}

export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, easing: [0.25, 0.46, 0.45, 0.94] } }
}

export const fadeDown = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, easing: [0.25, 0.46, 0.45, 0.94] } }
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, easing: [0.25, 0.46, 0.45, 0.94] } }
}

export const fadeRight = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, easing: [0.25, 0.46, 0.45, 0.94] } }
}
