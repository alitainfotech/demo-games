
"use client"
import Card from "./Card";
import { DIFFICULTY_LEVEL } from "./constants";
import { useEffect, useState } from "react";
import { MathPairCardObject, generatePairsForGame } from "./fns";

export default function MatchPair() {
  const difficulty: { level: number, grid: number } = DIFFICULTY_LEVEL.MEDIUM;
  const [cards, setCards] = useState<Array<MathPairCardObject>>([]);
  const [prevIndex, setPrevIndex] = useState<number>(-1);
  const [currIndex, setCurrIndex] = useState<number>(-1);
  const [disableClick, setDisableClick] = useState<boolean>(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const cards = generatePairsForGame(difficulty.level);
    setCards(cards);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (currIndex >= 0 && prevIndex >= 0) {
        const gotPair = cards[prevIndex].rank === cards[currIndex].rank;
        calculateScore(gotPair);
        if (!gotPair) {
          flipCard(prevIndex);
          flipCard(currIndex);
        } else {
          checkWinningStatus();
        }
        setPrevIndex(-1);
        setCurrIndex(-1);
        setDisableClick(false);
      }
    }, 500)
  }, [currIndex]);

  function handleClick(index: number): void {
    if (disableClick) {
      return;
    }
    if (prevIndex >= 0) {
      setCurrIndex(index);
      setDisableClick(true);
    } else {
      setPrevIndex(index);
    }
    flipCard(index);
  }

  function flipCard(index: number): void {
    const newCards = [...cards];
    newCards[index].flipStatus = !newCards[index].flipStatus;
    newCards[index].disableFlip = !newCards[index].disableFlip;
    setCards(newCards);
  }

  function checkWinningStatus() {
    const index = cards.findIndex((c) => c.flipStatus === false);
    if (index < 0) {
      alert('Winner');
    }
  }

  function calculateScore(gotPair: boolean) {
    if (gotPair) {
      setScore(score + 10);
    } else if (score > 0) {
      switch (difficulty.level) {
        case DIFFICULTY_LEVEL.EASY.level:
          setScore(score - 1);
          break;
        case DIFFICULTY_LEVEL.MEDIUM.level:
          setScore(score - 2);
          break;
        case DIFFICULTY_LEVEL.HARD.level:
          setScore(score - 3);
          break;
      }
    }
  }

  return (
    <>
      <div className={`flex flex-column grid ${difficulty.level === DIFFICULTY_LEVEL.EASY.level ? "grid-cols-4" : difficulty.level === DIFFICULTY_LEVEL.MEDIUM.level ? "grid-cols-6" : "grid-cols-8"} gap-4`}>
        {cards.map((card, index) => {
          const { rank, flipStatus, iconElementType: Component, disableFlip } = card;
          if (!Component) {
            return null;
          }
          return (
            <div key={`${rank}_${index}`} className="flex justify-center items-center basis-1/4">
              <Card frontChildren={<Component className="h-24 w-24" />} flipStatus={flipStatus} handleClick={handleClick} id={index} disableFlip={disableFlip} />
            </div>
          )
        })}
      </div>
    </>
  );
}
