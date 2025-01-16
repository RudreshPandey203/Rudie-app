import React from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useMenuContext } from '../../../context/menu';
import useCursorStyle from '../../../hooks/useCursorStyle';
import useMediaQuery from '../../../hooks/useMediaQuery';
import useStyledTheme from '../../../hooks/useStyledTheme';
import AnimateOnScreen from '../../AnimateOnScreen';
import Arrow from '../../Icons/Arrow';
import {
  ContentSection,
  ProjectAnchor,
  ProjectInfo,
  ProjectTitle,
  VideoPreview,
  MenuContainer,
} from './styles';
import colors from '../../../styles/colors';
import { FaDownload } from 'react-icons/fa6';

const transition = {
  duration: 0.45,
  ease: [0.4, 0, 0.2, 1],
};

const FeaturedProject = () => {
  const controlsInfo = useAnimation();
  const controlsArrow = useAnimation();
  const theme = useStyledTheme();
  const [{ isMenuOpen }] = useMenuContext();
  const {
    addCursorColor,
    resetCursorColor,
    addCursorBorder,
    removeCursorBorder,
  } = useCursorStyle();
  const isTabletView = useMediaQuery(
    ({ breakpoints }) => `(max-width:${breakpoints.sizes.tablet}px)`
  );

  const handleMouseEnter = React.useCallback(() => {
    addCursorBorder();
    addCursorColor(theme.text);
  }, [addCursorColor, addCursorBorder, theme.text]);

  const handleMouseLeave = React.useCallback(async () => {
    if (isMenuOpen) return;

    removeCursorBorder();
    resetCursorColor();
  }, [removeCursorBorder, resetCursorColor, isMenuOpen]);

  const handleAnchorHoverStart = React.useCallback(() => {
    addCursorBorder();

    // animate controls
    controlsInfo.start({ opacity: 1 });
    controlsArrow.start({ x: 0 });
  }, [addCursorBorder, controlsInfo, controlsArrow]);

  const handleAnchorHoverEnd = React.useCallback(() => {
    removeCursorBorder();

    // animate controls
    controlsInfo.start({ opacity: 0 });
    controlsArrow.start({ x: isTabletView ? -25.19 : -33 });
  }, [removeCursorBorder, controlsInfo, controlsArrow, isTabletView]);

  React.useEffect(() => {
    // animate arrow programmatically because initial prop was not working properly.
    controlsArrow.start({ x: isTabletView ? -25.19 : -33 });
  }, [controlsArrow, isTabletView]);

  return (
    <ContentSection>
      <AnimateOnScreen>
        <motion.div>
          <Link href="/projects/not-humble" passHref>
            <ProjectAnchor
              onMouseEnter={handleAnchorHoverStart}
              onMouseLeave={handleAnchorHoverEnd}
            >
              <ProjectInfo>
                <h3>am brewing now?</h3>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={controlsInfo}
                  transition={transition}
                  className="project-info"
                >
                  <h4>My Club AI</h4>
                  <h4>Buildspace season 5</h4>
                </motion.div>
                <ProjectTitle>
                  My <br /> Club AI
                  <span className="arrow">
                    <Arrow animate={controlsArrow} transition={transition} />
                  </span>
                </ProjectTitle>
              </ProjectInfo>
              <VideoPreview>
                <video loop autoPlay muted src="videos/main.mp4" />
              </VideoPreview>
            </ProjectAnchor>
          </Link>
        </motion.div>
      </AnimateOnScreen>
      <AnimateOnScreen>
        <MenuContainer>
          <Link
            href="https://drive.google.com/file/d/18jZgl9cxkF6Z5sHVahsd4_1PtoqWgZ_c/view?usp=share_link"
            download={true}
          >
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                padding: '15px',
                backgroundColor: `${colors.red}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                borderRadius: '6px',
              }}
            >
              <h4
                style={{
                  fontSize: '1.7rem',
                  fontWeight: 'bold',
                  alignItems: 'center',
                  fontStyle: 'normal',
                  lineHeight: '0.6',
                  position: 'relative',
                  top: '5px',
                  color: `${colors.white}`,
                  paddingRight: '10px',
                }}
              >
                Resume
              </h4>
              <FaDownload style={{ fontSize: '1.5rem' }} />
            </div>
          </Link>
        </MenuContainer>
      </AnimateOnScreen>
    </ContentSection>
  );
};

export default FeaturedProject;
