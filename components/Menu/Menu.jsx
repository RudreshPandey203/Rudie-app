/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenuContext } from '../../context/menu';
import useCursorStyle from '../../hooks/useCursorStyle';
import useStyledTheme from '../../hooks/useStyledTheme';
import useMediaQuery from '../../hooks/useMediaQuery';
import routesProjects from '../../utils/constants/routesProjects';
import routes from '../../utils/constants/routes';
import Arrow from '../Icons/Arrow';
import {
  listVariants,
  listItemsVariants,
  linkVariants,
  videoRevealVariants,
  videoVariants,
  transition,
} from './variants';
import {
  Backdrop,
  Container,
  CloseButton,
  Header,
  Navigation,
  List,
  Link,
  ArrowContainer,
  Footer,
  FooterText,
  VideoContainer,
  VideoReveal,
  Video,
  SocialMedia,
} from './styles';

const Menu = () => {
  const containerRef = React.useRef(null);
  const videoContainerRef = React.useRef(null);
  const [revealVideo, setRevealVideo] = React.useState(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const theme = useStyledTheme();
  const [{ isMenuOpen }] = useMenuContext();
  const {
    addCursorBorder,
    removeCursorBorder,
    addCursorColor,
    resetCursorColor,
  } = useCursorStyle();
  const isMobile = useMediaQuery(
    ({ breakpoints }) => `(max-width:${breakpoints.sizes.small}px)`,
  );

  const handleAnimationComplete = React.useCallback(() => {
    addCursorColor(theme.text);
  }, [addCursorColor, theme.text]);

  const handleExitComplete = React.useCallback(() => {
    resetCursorColor();
  }, [resetCursorColor]);

  const handleHoverStart = React.useCallback(
    event => {
      addCursorBorder();
      setRevealVideo(event.target.name);
    },
    [addCursorBorder],
  );

  const handleHoverEnd = React.useCallback(() => {
    removeCursorBorder();
    setRevealVideo(null);
  }, [removeCursorBorder]);

  React.useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen && containerRef.current && videoContainerRef.current) {
        const offset = 256;
        const { width } = containerRef.current.getBoundingClientRect();
        const left = (window.innerWidth - width) / 2 + offset;

        videoContainerRef.current.style.left = `${left}px`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  const textVariants = {
    initial: { y: 0, fontSize: '1rem' },
    expanded: { y: 50, fontSize: '2rem' },
  };

  const [switched, setSwitched] = React.useState(false);

  const handleSwitch = choice => {
    setSelected(choice);
  };
  const [selected, setSelected] = React.useState('Projects');

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isMenuOpen && (
        <Backdrop onAnimationComplete={handleAnimationComplete}>
          <Container ref={containerRef}>
            <Header>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100px',
                }}
              >
                <motion.h3
                  style={{
                    padding: '20px 0',
                    fontWeight: 'bolder',
                    textAlign: 'left',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '100px',
                  }}
                  onClick={() => handleSwitch('Projects')}
                  initial="initial"
                  animate={selected === 'Projects' ? 'expanded' : 'initial'}
                  variants={textVariants}
                  transition={{ duration: 0.5 }}
                  {...(selected === 'Experience'
                    ? { onMouseEnter: addCursorBorder, onMouseLeave: removeCursorBorder }
                    : {})}
                >
                  Projects
                </motion.h3>
                <motion.h3
                  style={{
                    padding: '20px 0',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: 'bolder',
                    position: 'absolute',
                    top: '100px',
                  }}
                  onClick={() => handleSwitch('Experience')}
                  initial="initial"
                  animate={selected === 'Experience' ? 'expanded' : 'initial'}
                  variants={textVariants}
                  transition={{ duration: 0.5 }}
                  {...(selected === 'Projects'
                    ? { onMouseEnter: addCursorBorder, onMouseLeave: removeCursorBorder }
                    : {})}
                >
                  Experience
                </motion.h3>
              </div>
              <CloseButton title="Close" />
            </Header>
            <Navigation>
              <List
                variants={listVariants}
                initial="hidden"
                animate="show"
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                {(selected == 'Experience' ? routes : routesProjects).map(route => (
                  <motion.li
                    key={route.id}
                    variants={listItemsVariants}
                    transition={{
                      duration: 0.9,
                      ease: transition.ease,
                    }}
                  >
                    <Link href={route.path}>
                      <Link
                        key={`${route.id}_${isMobile}`}
                        name={route.id}
                        onHoverStart={handleHoverStart}
                        onHoverEnd={handleHoverEnd}
                        custom={{ isMobile, color: theme.text }}
                        initial="initial"
                        whileHover="hover"
                        variants={linkVariants}
                        transition={transition}
                      >
                        <ArrowContainer>
                          <Arrow fillColor={theme.background} />
                        </ArrowContainer>
                        {route.title}
                      </Link>
                    </Link>
                  </motion.li>
                ))}
              </List>
            </Navigation>
            <Footer>
              <FooterText
                className="link"
                as="a"
                href="pandeyrudresh203@gmail.com"
                onMouseEnter={addCursorBorder}
                onMouseLeave={removeCursorBorder}
              >
                pandeyrudresh203@gmail.com
              </FooterText>
              <FooterText
                className="link"
                as="a"
                href="tel:+917317545634"
                onMouseEnter={addCursorBorder}
                onMouseLeave={removeCursorBorder}
              >
                7317545634
              </FooterText>
              <SocialMedia />
            </Footer>
          </Container>
          {!isMobile && (
            <VideoContainer ref={videoContainerRef}>
              <VideoReveal
                variants={videoRevealVariants}
                transition={transition}
                initial="show"
                animate={isHovering ? 'hidden' : 'show'}
              />
              {(selected == 'Experience' ? routes : routesProjects).map(route => (
                <Video
                  key={route.id}
                  src={`/videos/${route.video}`}
                  variants={videoVariants}
                  initial="hidden"
                  animate={route.id === revealVideo ? 'show' : 'hidden'}
                  transition={transition}
                  loop
                  autoPlay
                ></Video>
              ))}
            </VideoContainer>
          )}
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default React.memo(Menu);
