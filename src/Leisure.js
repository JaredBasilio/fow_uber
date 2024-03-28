import * as React from "react"
import {Block} from 'baseui/block';
import {
    HeadingLarge, ParagraphLarge,
  } from "baseui/typography";
import { ButtonTimed } from "baseui/button-timed";
import { GameContext } from "./utils/contexts";
import { DRIVER, LEISURE_TIMEOUT, BUTTON_TIMEOUT } from "./utils/constants";

export default function Leisure() {
    const {
        warningTriggered, setCurrentMode, setWarningTriggeredTime, leisureTimeElapsed, setTimeout, timeElapsed, leisureSession, setLeisureSession
    } = React.useContext(GameContext);

    return (
        <Block align="center" justifyContent="center" padding="1em" width="90%">
            <HeadingLarge>
                Enjoy your Leisure Time!
            </HeadingLarge>
            <ParagraphLarge>
                You Earn $0.01 every second
            </ParagraphLarge>
            {warningTriggered &&
                <ButtonTimed
                    initialTime={BUTTON_TIMEOUT}
                    onClick={() => {
                        if (leisureSession >= BUTTON_TIMEOUT + LEISURE_TIMEOUT) {
                            setCurrentMode(DRIVER)
                            setLeisureSession(0)
                        } else {
                            // TODO: Handle Reset Logic
                        }
                    }}
                >
                    Continue in Leisure
                </ButtonTimed>
            }
        </Block>
    )
}