import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Start() {
    const [noOfPlayers, setNoOfPlayers] = useState(2);
    const navigator = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigator(`/playing/${noOfPlayers}`)
    }
    return (
        <div className="start-wrapper">
            <div className="flex items-center h-screen w-full">
                <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                    <span className="block w-full text-xl uppercase font-bold mb-4">Dice Poker</span>
                    <form className="mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4 md:w-full">
                            <label for="email" className="block text-xs mb-1">Enter No. Of. Players:</label>
                            <input type="number" className="w-full border rounded p-2 outline-none focus:shadow-outline" required step={1} min={2} max={5} name="noOfPlayers" value={noOfPlayers} onChange={(e) => setNoOfPlayers(e.target.value)} placeholder="Enter No. Of. Players" />
                        </div>
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Start Playing</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Start;
