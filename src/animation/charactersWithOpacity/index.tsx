import { useTransform, motion } from "framer-motion"
import styles from "./style.module.scss";
import { CharacterWithOpacityProps } from "@/types/general";

const CharacterWithOpacity: React.FC<CharacterWithOpacityProps> = ({ char, scrollYProgress, fadeInThreshold, normalFadeOutThreshold, highlightedFadeOutThreshold, isPaddedFirst, isWhitespace, isHighlighted, }) => {
    let opacityInputRange, opacityOutputRange

    if (isHighlighted) {
        opacityInputRange = [fadeInThreshold - 0.05, fadeInThreshold, 0.8, highlightedFadeOutThreshold]
        opacityOutputRange = [0.35, 1, 1, 0]
    } else {
        opacityInputRange = [fadeInThreshold - 0.05, fadeInThreshold, normalFadeOutThreshold - 0.05, normalFadeOutThreshold]
        opacityOutputRange = [0.35, 1, 1, 0]
    }

    const opacity = useTransform(scrollYProgress, opacityInputRange, opacityOutputRange)

    const className = `${styles.char} ${isPaddedFirst ? styles.firstChar : ''} ${isWhitespace ? styles.whitespaceChar : ''}`

    return (
        <motion.span className={className} style={{ opacity }}>
            {char}
        </motion.span>
    )
}

export default CharacterWithOpacity