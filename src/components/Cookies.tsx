import { useEffect, useState } from "react";
import {
  storeAcceptedCookies,
  getAcceptedCookies,
} from "../utils/localStorage";
import styled from "styled-components";
import { colors } from "../utils/colors";

const Banner = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  bottom: 0;
  width: 100vw;
  min-height: 4.6875rem;
  background-color: ${colors.white};
  border-top: 1px solid black;
  padding: 1.25rem;
  @media screen and (min-width: 48rem) {
    padding: 0.625rem;
  }
`;

const Text = styled.p`
  text-align: center;
  margin-bottom: 0.5rem;
  padding: 0rem 1.25rem;
`;

const Button = styled.button`
  display: grid;
  place-items: center;
  background-color: ${colors.lightCyan};
  border: 1px solid ${colors.cyan};
  padding: 0.25rem 0.625rem;
  border-radius: 8px;

  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${colors.cyan};
  }
  &:focus {
    box-shadow: 0px 0px 5px 2px rgba(163, 221, 203, 0.75);
  }
`;

export const Cookies = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(getAcceptedCookies());

  useEffect(() => {
    storeAcceptedCookies(acceptedCookies);
  }, [acceptedCookies]);

  return acceptedCookies ? (
    <></>
  ) : (
    <Banner>
      <Text>
        We use cookies in order to save your TODO list, by tapping "Accept
        Cookies" you consent to the use of this method.
      </Text>
      <Button onClick={() => setAcceptedCookies("true")}>Accept Cookies</Button>
    </Banner>
  );
};
