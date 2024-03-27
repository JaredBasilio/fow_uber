import * as React from "react";
import {Block} from 'baseui/block';
import {
    LabelLarge,
    ParagraphLarge,
    ParagraphSmall
} from "baseui/typography";
import { useStyletron } from "baseui";
import { TimerContext } from "./utils/contexts";

export default function Statistics() {
    const [css, theme] = useStyletron();
    const bodyString = "test";
    const {timeElapsed, leisureTimeElapsed} = React.useContext(TimerContext);

    return (
        <Block width="10%" height="100%" padding="1em"               
            className={css({
                borderRight: '1px solid hsla(0, 0%, 0%, 0.12)',
              })}>
            <LabelLarge>Time</LabelLarge>
            <ParagraphLarge margin="0">{timeElapsed}</ParagraphLarge>
            <LabelLarge>Leisure Time</LabelLarge>
            <ParagraphLarge margin="0">{leisureTimeElapsed}</ParagraphLarge>
            <LabelLarge>Earned</LabelLarge>
            <ParagraphLarge margin="0">{bodyString}</ParagraphLarge>
            <LabelLarge>Location</LabelLarge>
            <ParagraphLarge margin="0">{bodyString}</ParagraphLarge>
            <ParagraphSmall>
                *Travel Between Berkeley and San Francisco takes 5 seconds
            </ParagraphSmall>
        </Block>
    )
}