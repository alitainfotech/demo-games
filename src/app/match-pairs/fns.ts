import * as HeroIcons from "@heroicons/react/24/outline";
import { ICONS_ARR } from "./constants";

export interface MathPairCardObject {
    rank: number,
    icon: string,
    flipStatus: boolean,
    iconElementType?: React.ElementType,
    disableFlip: boolean
}

function generateRandomIconsFromList(len: number): Array<MathPairCardObject> {
    const selectedIcons: Array<MathPairCardObject> = [];
    while (selectedIcons.length < len) {
        const randomIndex = Math.floor(Math.random() * ICONS_ARR.length);
        if (selectedIcons.findIndex((s) => s.rank === ICONS_ARR[randomIndex].rank) < 0) {
            selectedIcons.push({ ...ICONS_ARR[randomIndex], flipStatus: false, disableFlip: false });
        }
    }
    return selectedIcons;
};

function shuffleArray(cards: Array<MathPairCardObject>): Array<MathPairCardObject> {
    let totalCards = cards.length;
    let randomIndex = 0;
    const newCards = [...cards];
    while (totalCards > 0) {
        randomIndex = Math.floor(Math.random() * totalCards);
        totalCards--;
        [newCards[totalCards], newCards[randomIndex]] = [newCards[randomIndex], newCards[totalCards]];
    }
    return newCards;
}

export function generatePairsForGame(difficultyLevel: number): Array<MathPairCardObject> {
    const selectedIcons: Array<MathPairCardObject> = generateRandomIconsFromList(difficultyLevel);
    const cards: Array<MathPairCardObject> = [];
    for (let i = 0; i < difficultyLevel; i++) {
        const selectedIcon: MathPairCardObject = selectedIcons[i];
        const obj: MathPairCardObject = {
            ...selectedIcon,
            iconElementType: HeroIcons[selectedIcon.icon as keyof typeof HeroIcons],
        };
        cards.push({ ...obj }, { ...obj });
    }
    const newCards = shuffleArray(cards);
    return newCards;
}