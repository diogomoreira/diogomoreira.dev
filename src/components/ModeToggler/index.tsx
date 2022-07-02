import React from "react";
import { ThemeToggler } from "gatsby-plugin-dark-mode";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const ModeTogglerContainer = styled.div`
  padding: 0 1rem;
`;

export const ToggleSlot = styled.div`
  position: relative;
  height: 1.5em;
  width: 3em;
  border: var(--border-width) var(--border-style) var(--gray-white);
  border-radius: 10em;
  background-color: var(--white);
  transition: background-color var(--transition-duration);
`;
export const LightThemeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  color: #ffbb52;
  max-width: 20px;
  max-height: 20px;
  opacity: 1;
  transform: translate(25%, 25%) rotate(0deg);
  transform-origin: 50% 50%;
  transition: opacity var(--transition-duration), transform var(--transition-duration) cubic-bezier(1, 0.25, 0.83, 0.67);
`;

export const DarkThemeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  opacity: 0;
  color: var(--white);
  transform: translate(180%, 25%) rotate(0deg);
  transform-origin: 50% 50%;
  transition: opacity var(--transition-duration), transform var(--transition-duration) cubic-bezier(1, 0.25, 0.83, 0.67);
`;

export const ToggleButton = styled.div`
  transform: translate(180%, 25%);
  position: absolute;
  height: 1em;
  width: 1em;
  border-radius: 50%;
  background-color: #ffeccf;
  box-shadow: inset 0px 0px 0px 0.1em #ffbb52;
  transition: background-color var(--transition-duration), border-color var(--transition-duration),
    transform var(--transition-duration) cubic-bezier(1, 0.25, 0.83, 0.67);
`;

export const TogglerInput = styled.input`
  height: 1.5em;
  width: 3em;
  position: absolute;
  opacity: 0;
  cursor: pointer;

  &:checked ~ ${ToggleSlot} {
    background-color: var(--gray-darker);
    border: var(--border-width) var(--border-style) var(--gray-dark);

    & ${LightThemeIcon} {
      opacity: 0;
      transition: opacity var(--transition-duration);
    }

    & ${DarkThemeIcon} {
      opacity: 1;
      transform: translate(180%, 25%) rotate(-15deg);
    }

    ${ToggleButton} {
      background-color: var(--gray);
      box-shadow: inset 0px 0px 0px 0.1em var(--white);
      transform: translate(20%, 25%);
    }
  }
`;

export default function ModeToggler() {
  return (
    <ModeTogglerContainer>
      <ThemeToggler>
        {({ theme, toggleTheme }) => {
          if (theme == null) {
            return null;
          }
          return (
            <label htmlFor="toggler">
              <TogglerInput
                id="toggler"
                type="checkbox"
                onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
                checked={theme === "dark"}></TogglerInput>
              <ToggleSlot>
                <LightThemeIcon icon={faSun} />
                <ToggleButton />
                <DarkThemeIcon icon={faMoon} />
              </ToggleSlot>
            </label>
          );
        }}
      </ThemeToggler>
    </ModeTogglerContainer>
  );
}
