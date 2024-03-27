import * as React from "react";
import './App.css';
import NavBar from "./NavBar";
import { GameContext, TimerContext } from "./utils/contexts";
import {DRIVER, EATS, LEISURE, GAME_OVER} from './utils/constants';
import JobSelect from './JobSelect';
import Leisure from './Leisure';
import Statistics from './Statistics';
import { Block } from "baseui/block";
import {Input} from "baseui/input";
import {FormControl} from "baseui/form-control";
import {Button} from "baseui/button";
import { useStyletron } from "baseui";
import {Banner, KIND} from "baseui/banner";

export default function App() {
  const [mode, setMode] = React.useState(DRIVER);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [leisureTimeElapsed, setLeisureTimeElapsed] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('');
  const [player, setPlayer] = React.useState('');
  const [css, theme] = useStyletron();
  const [inputError, setInputError] = React.useState(false);

  const gameContextValue = {
    currentMode: mode,
    setCurrentMode: newMode => setMode(newMode),
  };

  React.useEffect(() => {
    const timer = setInterval(() => setTimeElapsed(timeElapsed + 1), 1000);
    return () => clearInterval(timer);
  }, [timeElapsed]);

  React.useEffect(() => {
    const timer = mode === LEISURE && setInterval(() => setLeisureTimeElapsed(leisureTimeElapsed + 1), 1000);
    return () => clearInterval(timer);
  }, [leisureTimeElapsed, mode]);

  const timeContextValue = {
    timeElapsed: timeElapsed,
    leisureTimeElapsed: leisureTimeElapsed,
  }

  const startGame = () => {
    if (inputValue !== '') {
      setPlayer(inputValue);
    } else {
      setInputError(true);
    }
  }

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      startGame();
    }
  }

  if (player === '') {
    return (
      <Block display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Block width="50%">
          <FormControl
            label={() => "Enter Your Name:"}
            caption={() => "Press Enter or Click Start to Play"}
          >
            <Block display="flex">
              <Input 
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                clearOnEscape
                onKeyDown={handleEnter}
                overrides={{
                  Root: {
                    style: {
                      marginRight: theme.sizing.scale400,
                    },
                  },
                }}
                error={inputError}
              />
              <Button onClick={startGame}>Start</Button>
            </Block>
          </ FormControl>
          {inputError &&
            <Banner title="Error" kind={KIND.negative}>
              Name Field must not be blank
            </Banner>
          }
        </Block>
      </Block>
    )
  }

  return (
    <GameContext.Provider value={gameContextValue}>
      <NavBar />
      <TimerContext.Provider value={timeContextValue}>
        <Block display="flex" height="100vh">
          <Statistics />
          {(mode === DRIVER || mode === EATS) && <JobSelect />}
          {mode === LEISURE && <Leisure />}
        </Block>
      </TimerContext.Provider>
    </GameContext.Provider>
  );
}