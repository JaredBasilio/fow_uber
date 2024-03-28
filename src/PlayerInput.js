import * as React from "react";
import {Input} from "baseui/input";
import {FormControl} from "baseui/form-control";
import {Button} from "baseui/button";
import { Block } from "baseui/block";
import {Banner, KIND} from "baseui/banner";
import { useStyletron } from "baseui";
import { UserContext } from "./utils/contexts";

export default function PlayerInput() {
    const [css, theme] = useStyletron();
    const [inputError, setInputError] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const { setCurrentPlayer } = React.useContext(UserContext);

    const startGame = () => {
        if (inputValue !== '') {
          setCurrentPlayer(inputValue);
        } else {
          setInputError(true);
        }
      }
    
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            startGame();
        }
    }

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