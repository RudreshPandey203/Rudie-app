import React from 'react';
import useCursorStyle from '../../hooks/useCursorStyle';
import {FaInstagram, FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces } from "react-icons/si";

import StickyCursor from '../StickyCursor';
import { Container, Link } from './styles';

const medias = [
  { component: SiCodeforces, url: 'https://codeforces.com/profile/gluded' },
  { component: SiLeetcode, url: 'https://leetcode.com/u/ketripef/' },
  { component: FaInstagram, url: 'https://www.instagram.com/rudreshpandey_' },
  { component: FaLinkedinIn, url: 'https://www.linkedin.com/in/rudreshpandey-/' },
  { component: FaTwitter, url: 'https://x.com/RudreshPandey_' },
  { component: FaGithub, url: 'https://github.com/RudreshPandey203'},
];

const SocialMedia = props => {
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();

  return (
    <Container {...props}>
      {medias.map(({ component: Component, url }) => (
        <StickyCursor key={url}>
          <Link 
            style={{padding: '10px'}}
            target="_blank"
            href={url}
            onMouseEnter={addCursorBorder}
            onMouseLeave={removeCursorBorder}
          >
            <Component width="100px" height="100px"/>
          </Link>
        </StickyCursor>
      ))}
    </Container>
  );
};

export default React.memo(SocialMedia);
