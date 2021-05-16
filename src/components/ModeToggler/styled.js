import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const ModeTogglerContainer = styled.div`
  padding: 0 1rem;
`

export const ToggleSlot = styled.div`
  position: relative;
  height: 1.5em;
  width: 3em;
  border: var(--border-default-width) var(--gray-lighter);
  border-radius: 10em;
  background-color: var(--white);
  transition: background-color var(--transition-duration);
`
export const LightThemeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  color: #ffbb52;
  max-width: 20px;
  max-height: 20px;
  opacity: 1;
  transform: translate(25%, 25%) rotate(0deg);
  transform-origin: 50% 50%;
  transition: opacity var(--transition-duration),
    transform var(--transition-duration) cubic-bezier(1, 0.25, 0.83, 0.67);
`

export const DarkThemeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  opacity: 0;
  color: var(--white);
  transform: translate(180%, 25%) rotate(0deg);
  transform-origin: 50% 50%;
  transition: opacity var(--transition-duration),
    transform var(--transition-duration) cubic-bezier(1, 0.25, 0.83, 0.67);
`

export const ToggleButton = styled.div`
  transform: translate(180%, 25%);
  position: absolute;
  height: 1em;
  width: 1em;
  border-radius: 50%;
  background-color: #ffeccf;
  box-shadow: inset 0px 0px 0px 0.1em #ffbb52;
  transition: background-color var(--transition-duration),
    border-color var(--transition-duration),
    transform var(--transition-duration) cubic-bezier(1, 0.25, 0.83, 0.67);
`

export const TogglerInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ ${ToggleSlot} {
    background-color: #374151;
    border: 2px solid #1e232b;

    & ${LightThemeIcon} {
      opacity: 0;
      transition: opacity var(--transition-duration);
    }

    & ${DarkThemeIcon} {
      opacity: 1;
      transform: translate(180%, 25%) rotate(-15deg);
    }

    ${ToggleButton} {
      background-color: #485367;
      box-shadow: inset 0px 0px 0px 0.1em var(--white);
      transform: translate(20%, 25%);
    }
  }
`
