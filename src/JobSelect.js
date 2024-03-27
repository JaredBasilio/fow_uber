import * as React from "react";
import { ListItem, ListItemLabel } from "baseui/list";
import { Button, SIZE } from "baseui/button";
import jobs from './utils/jobs';
import { Tag } from "baseui/tag";
import { GameContext } from "./utils/contexts";
import {Block} from "baseui/block";

export default function JobSelect() {
    const {currentMode} = React.useContext(GameContext);

    return (
        <Block width="90%">
            <ul>
                {jobs
                    .filter(({type}) => type === currentMode)
                    .map(({name, type, items, profit}) => 
                    <ListItem
                        endEnhancer={() => (
                            <ListItemLabel>
                                <Button>Select Job</Button>
                            </ListItemLabel>
                        )}
                    >
                        <ListItemLabel
                            description={
                                <>
                                    <Tag closeable={false}>{type}</Tag>
                                    <Tag closeable={false}>Avg Items: {items}</Tag>
                                    <Tag closeable={false}>Avg Earnings: ${profit}</Tag>
                                </>
                            }
                        >
                            {name}
                        </ListItemLabel>
                    </ListItem>
                )
                }
            </ul>
        </Block>
    )
}