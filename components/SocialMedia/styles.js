import styled from 'styled-components';
import { secondaryFontStyle } from '../../styles/shared/text';
import colors from '../../styles/colors';

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: -10px;

  ${({ theme }) => theme.breakpoints.small`
    margin-left: -10px;
  `};
`;

export const Link = styled.a`
  ${secondaryFontStyle};
  padding: 0 10px;
  display: inline-block;
  vertical-align: middle;
  width: 41px;
  height: 41px;  // Adjust height if necessary
  line-height: 24px;
  color: ${colors.red};

  &:nth-of-type(2) {
    width: 41px;  // Adjust width if necessary
    height: 41px;  // Adjust height if necessary
  }

  &:hover svg path {
    fill: ${colors.white};
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;
