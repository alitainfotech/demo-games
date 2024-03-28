import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function GameBoard() {
    const { players } = useParams();
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [dicePattern, setDicePattern] = useState([]);
    const [startNextPlayer, setStartNextPlayer] = useState(false);
    const [playersScore, setPlayersScore] = useState([]);
    const [startLoading, setStartLoading] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (players < 2 || players > 5) {
            navigate('/');
        }
        // eslint-disable-next-line
    }, [players])

    const generateRandomNumber = () => {
        return Math.floor((Math.random() * 6) + 1)
    }

    const handleRollTheDice = () => {
        const getNumber = generateRandomNumber();
        const newPattern = [...dicePattern, getNumber];
        setDicePattern(newPattern);
        if (newPattern.length >= 5) {
            setStartNextPlayer(true);
        }
    }

    const handleNextPlayerTurn = () => {
        const data = { player: currentPlayer, dicePattern };
        const newPlayerScore = [...playersScore, data];
        setPlayersScore(newPlayerScore);
        setCurrentPlayer((prevValue) => prevValue + 1);
        setStartNextPlayer(false);
        setDicePattern([]);
    }

    const handleResult = () => {
        const data = { player: currentPlayer, dicePattern };
        const newPlayerScore = [...playersScore, data];
        setPlayersScore(newPlayerScore);
        const payload = {
            data: newPlayerScore
        }
        setStartLoading(true);
        fetch("http://localhost:3002/api/get-winner", { method: "POST", body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                const { data: { player } } = res;
                const winner = playersScore.find((p) => p.player === player);
                setCurrentPlayer(winner.player)
                setDicePattern(winner.dicePattern);
            })
            .catch((err) => {
                console.log('err => ', err);
            })
            .finally(() => {
                setGameOver(true);
                setStartLoading(false);
            })
    }

    const handlePlayAgain = (newPlayers = false) => {
        if (newPlayers) {
            navigate('/')
        } else {
            setCurrentPlayer(1);
            setDicePattern([]);
            setStartNextPlayer(false);
            setPlayersScore([]);
            setStartLoading(false);
            setGameOver(false);
        }
    }

    return (
        <header>
            <section className="">
                <div className="grid h-screen grid-cols-2">
                    <div className="flex items-center h-screen w-full border-r-4 border-indigo-500">
                        {!startLoading &&
                            <div className={`w-full rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto ${gameOver ? 'bg-green-500' : 'bg-white'}`}>
                                <p className="block w-full text-xl uppercase font-bold mb-4">Player {currentPlayer} {gameOver && "Is Winner"}</p>
                                <p className="block w-full text-xl uppercase font-bold mb-4">Dice Sequence</p>
                                <p className="mb-4">
                                    {dicePattern.map((num, index) => <span className="rounded bg-blue-500 font-extrabold m-4 p-2 text-2xl" key={index}>{num}</span>)}
                                </p>
                                {!gameOver &&
                                    <div className="flex justify-center mb-4">
                                        <button type="button" className={`uppercase text-sm font-semibold px-4 py-2 rounded text-white ${startNextPlayer ? 'bg-gray-500 hover:bg-gray-700' : 'bg-green-500 hover:bg-green-700'}`} onClick={handleRollTheDice} disabled={startNextPlayer}>Roll The Dice</button>
                                    </div>
                                }
                                {!gameOver && startNextPlayer && currentPlayer < players &&
                                    <div className="flex justify-center mb-4">
                                        <button type="button" className={`uppercase text-sm font-semibold px-4 py-2 rounded text-white bg-green-500 hover:bg-green-700`} onClick={handleNextPlayerTurn}>Start For Player {currentPlayer + 1}</button>
                                    </div>
                                }
                                {!gameOver && startNextPlayer && currentPlayer >= players &&
                                    <div className="flex justify-center mb-4">
                                        <button type="button" className={`uppercase text-sm font-semibold px-4 py-2 rounded text-white bg-green-500 hover:bg-green-700`} onClick={handleResult}>Show Result</button>
                                    </div>
                                }
                                {gameOver &&
                                    <div className="flex justify-center mb-4">
                                        <button type="button" className={`uppercase text-sm font-semibold px-4 py-2 rounded text-white bg-green-500 hover:bg-green-700`} onClick={() => handlePlayAgain()}>Play again</button>
                                    </div>
                                }
                                {gameOver &&
                                    <div className="flex justify-center mb-4">
                                        <button type="button" className={`uppercase text-sm font-semibold px-4 py-2 rounded text-white bg-green-500 hover:bg-green-700`} onClick={() => handlePlayAgain(true)}>Play again with new players</button>
                                    </div>
                                }
                            </div>
                        }
                    </div>

                    <div className="">
                        {playersScore && playersScore.length > 0 &&
                            <>
                                {playersScore.map((p, index) =>
                                    <div key={index} className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                                        <p className="block w-full text-xl uppercase font-bold mb-4">Player {p.player}</p>
                                        <p className="block w-full text-xl uppercase font-bold mb-4">Dice Sequence</p>
                                        <p className="mb-4">
                                            {p.dicePattern.map((num, index) => <span className="rounded bg-blue-500 font-extrabold m-4 p-2 text-2xl" key={index}>{num}</span>)}
                                        </p>
                                    </div>
                                )}
                            </>
                        }
                    </div>
                </div>
            </section>
        </header>
    );
}

export default GameBoard;
