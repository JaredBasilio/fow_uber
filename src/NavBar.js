import * as React from "react";
import { Button, SIZE} from "baseui/button";
import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationList,
    StyledNavigationItem
  } from "baseui/header-navigation";
import { GameContext } from "./utils/contexts";
import {DRIVER, EATS, GAME_OVER, LEISURE} from './utils/constants';

export default function NavBar() {
    const {setCurrentMode} = React.useContext(GameContext);

    return (
        <HeaderNavigation>
          <StyledNavigationList $align={ALIGN.center}>
            <StyledNavigationItem>
              <Button onClick={() => setCurrentMode(LEISURE)}>Switch to Leisure</Button>
            </StyledNavigationItem>
            <StyledNavigationItem>
              <Button 
                onClick={() => setCurrentMode(DRIVER)}
                >
                  Switch to Driver
              </Button>
            </StyledNavigationItem>
            <StyledNavigationItem>
              <Button 
                onClick={() => setCurrentMode(EATS)}
                >
                  Switch to Eats
              </Button>
            </StyledNavigationItem>
            <StyledNavigationItem>
              <Button onClick={() => setCurrentMode(GAME_OVER)}>
                End Game
              </Button>
            </StyledNavigationItem>
          </StyledNavigationList>
        </HeaderNavigation>
    )
}