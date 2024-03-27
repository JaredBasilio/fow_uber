import * as React from "react"
import {Block} from 'baseui/block';
import {
    HeadingLarge, ParagraphLarge,
  } from "baseui/typography";

export default function Leisure() {
    return (
        <Block align="center" justifyContent="center" padding="1em" width="90%">
            <HeadingLarge>
                Enjoy your Leisure Time!
            </HeadingLarge>
            <ParagraphLarge>
                You Earn $0.01 every second
            </ParagraphLarge>
        </Block>
    )
}