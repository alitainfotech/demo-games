import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Start from './pages/Start';
import GameBoard from './pages/GameBoard';

function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Start />}></Route>
          <Route path='/playing/:players' element={<GameBoard />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
