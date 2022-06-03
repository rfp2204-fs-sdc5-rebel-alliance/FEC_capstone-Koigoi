import React, { useState, createContext, useContext } from "react";
import { render } from "react-dom";
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa'

const DisplayStyle = styled.div`
  position: absolute;
  top: 35%;
  left: 45%;
  text-align: center;
`;

const NameStyle = styled.h1`
  cursor: pointer;
`;

const About = () => {

  return (
    <DisplayStyle>
      <NameStyle onClick={() => {window.open('https://www.linkedin.com/in/kevinniu/')}}>Kevin Niu</NameStyle>
      <NameStyle onClick={() => {window.open('https://www.linkedin.com/in/hansolji/')}}>Hansol Ji</NameStyle>
      <NameStyle onClick={() => {window.open('https://www.linkedin.com/in/neiljohnson92/')}}>Neil Johnson</NameStyle>
      <NameStyle >JJ Jeong</NameStyle>
      <FaGithub size={50} style={{'marginTop': '1rem', 'cursor': 'pointer'}} onClick={() => {window.open('https://github.com/RFP2204-12/FEC_capstone')}}/>
    </DisplayStyle>
  )
}

export default About;