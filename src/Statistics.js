import * as React from "react";
import {Block} from 'baseui/block';
import {
    LabelLarge,
    ParagraphLarge,
    ParagraphSmall
} from "baseui/typography";
import { useStyletron } from "baseui";
import { StatsContext } from "./utils/contexts";

function ConvertEarned(value) {
    return (value / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default function Statistics() {
    const [css, theme] = useStyletron();
    const {totalTime, timeElapsed, leisureTimeElapsed, earned, location} = React.useContext(StatsContext);

    return (
        <Block width="10%" height="100%" padding="1em"               
            className={css({
                borderRight: '1px solid hsla(0, 0%, 0%, 0.12)',
              })}>
            <LabelLarge>Total Time</LabelLarge>
            <ParagraphLarge margin="0">{totalTime}</ParagraphLarge>
            <LabelLarge>Time</LabelLarge>
            <ParagraphLarge margin="0">{timeElapsed}</ParagraphLarge>
            <LabelLarge>Leisure Time</LabelLarge>
            <ParagraphLarge margin="0">{leisureTimeElapsed}</ParagraphLarge>
            <LabelLarge>Earned</LabelLarge>
            <ParagraphLarge margin="0">{ConvertEarned(earned)}</ParagraphLarge>
            <LabelLarge>Location</LabelLarge>
            <ParagraphLarge margin="0">{location}, CA</ParagraphLarge>
            <ParagraphSmall>
                *Travel Between Berkeley and San Francisco takes 5 seconds
            </ParagraphSmall>
        </Block>
    )
}