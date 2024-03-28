import * as React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import { GameContext } from './utils/contexts';
import {Input} from 'baseui/input';
import { FormControl } from 'baseui/form-control';
import jobs from './utils/jobs';
import { useStyletron } from "baseui";
import { StarRating } from "baseui/rating";

export default function Game({jobId}) {
    const [css, theme] = useStyletron();
    const { Return } = React.useContext(GameContext);
    const {items: itemsCount, itemObjs} = jobs.find(item => item['id'] === jobId);
    const [index, setIndex] = React.useState(0);
    const [inputValue, setInputValue] = React.useState('');
    const [stars, setStars] = React.useState(0);

    const handleEnter = (event) => {
      if (event.key === 'Enter') {
        if (itemObjs[index] === inputValue) {
          setIndex(index + 1);
          setInputValue('');
        }
      }
    }
    
    if (index < itemsCount) {
      return (
        <Block display="flex" justifyContent="center" alignItems="center" width="100%">
          <Block width="50%">
            <img src={require(`./assets/${itemObjs[index]}.jpg`)} alt={`${itemObjs[index]}`} width="10%"/>
            <FormControl
                label={() => `Tasks Left: ${itemsCount - index}`}
                caption={() => "Press Enter to submit"}
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
                  />
              </ Block>
            </ FormControl>
        </Block>
      </Block>
      )
    }

    return (
      <Block display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="100%">
        Congratulation on completing the Job!
        <StarRating 
          numItems={5}
          onChange={data => setStars(data.value)}
          size={22}
          value={stars}
        />
        <Button onClick={() => Return()}>Return to Menu</Button>
      </Block>
    )
}