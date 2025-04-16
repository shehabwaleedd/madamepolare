export const textVariants = {
    hidden: { filter: 'blur(4px)' },
    visible: (i: number) => ({
        filter: 'blur(0px)',
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut"
        }
    })
};

export const slideUp = {
    initial: {
        y: "150%"
    },
    open: (i: number) => ({
        y: "0%",
        transition: { duration: 0.5, delay: 0.01 * i }
    }),
    closed: {
        y: "150%",
        transition: { duration: 0.5 }
    }
}


export const translate = {
    initial: {
        y: "100%",
        opacity: 0
    },
    enter: (i: number[]) => ({
        y: 0,
        opacity: 1,
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: i[0] }
    }),
    exit: (i: number[]) => ({
        y: "100%",
        opacity: 0,
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i[1] }
    })
}
