import * as React from "react";
import './App.css';
import NavBar from "./NavBar";
import { GameContext, StatsContext, UserContext } from "./utils/contexts";
import {DRIVER, EATS, LEISURE, GAME_OVER, BERKELEY, LEISURE_TIMEOUT, TOTAL_TIME} from './utils/constants';
import JobSelect from './JobSelect';
import Leisure from './Leisure';
import Statistics from './Statistics';
import { Block } from "baseui/block";
import PlayerInput from "./PlayerInput";
import Game from './Game';

export default function App() {
  const [mode, setMode] = React.useState(DRIVER);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [leisureTimeElapsed, setLeisureTimeElapsed] = React.useState(0);
  const [player, setPlayer] = React.useState('');
  const [earned, setEarned] = React.useState(0);
  const [location, setLocation] = React.useState(BERKELEY);
  const [timeout, setTimeout] = React.useState(null);
  const [warningTriggered, setWarningTriggered] = React.useState(false);
  const [leisureSession, setLeisureSession] = React.useState(0);
  const [currentJob, setJob] = React.useState(null);

  const Return = () => {
    setJob(null);
  }

  const gameContextValue = {
    currentMode: mode,
    leisureTimeElapsed: leisureTimeElapsed,
    setCurrentMode: newMode => setMode(newMode),
    warningTriggered: warningTriggered,
    setWarningTriggered: warning => setWarningTriggered(warning),
    setTimeout: t => setTimeout(t),
    leisureSession: leisureSession,
    setLeisureSession: sess => setLeisureSession(sess),
    selectJob: jobId => setJob(jobId),
    Return: () => Return()
  };

  const statsContextValue = {
    timeElapsed: timeElapsed,
    leisureTimeElapsed: leisureTimeElapsed,
    earned: earned,
    location: location,
    totalTime: TOTAL_TIME,
  }

  const userContextValue = {
    currentPlayer: player,
    setCurrentPlayer: newPlayer => setPlayer(newPlayer),
  }

  React.useEffect(() => {
    const timer = player !== '' && setInterval(() => setTimeElapsed(timeElapsed + 1), 1000);
    return () => clearInterval(timer);
  }, [timeElapsed, player]);

  React.useEffect(() => {
    if (mode === LEISURE && player !== '') {
      const timer = setInterval(() => {
        // TODO: Handle Reset Logic
        if (leisureSession >= LEISURE_TIMEOUT  && !warningTriggered) {
          setWarningTriggered(true);
        }
        setLeisureSession(leisureSession + 1);
        setLeisureTimeElapsed(leisureTimeElapsed + 1);
        setEarned(earned + 1);
      }, 1000);
      return () => {
        setLeisureSession(0);
        clearInterval(timer);
      }
    }
    return () => {};
  }, [leisureTimeElapsed, mode, player, earned, timeElapsed, timeout, warningTriggered, leisureSession]);

  if (player === '') {
    return (
      <UserContext.Provider value={userContextValue}>
        <PlayerInput />
      </UserContext.Provider>
    )
  }

  return (
    <UserContext.Provider value={userContextValue}>
      <GameContext.Provider value={gameContextValue}>
        <NavBar />
        <StatsContext.Provider value={statsContextValue}>
          <Block display="flex" height="100vh">
            <Statistics />
            {currentJob !== null 
              ? <Game jobId={currentJob}/>
              : ((mode === DRIVER || mode === EATS) && <JobSelect />)
            }
            {mode === LEISURE && <Leisure />}
          </Block>
        </StatsContext.Provider>
      </GameContext.Provider>
    </UserContext.Provider>
  );
}