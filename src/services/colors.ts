const core = {
  white: '#ffffff',
  black: '#000000',
  silver: '#f6f7f8',
  green: '#6aaa64',
  yellow: '#c9b458',
  coal: '#d3d6da',
  grey: '#787c7e',
  transparent: 'transparent',
  shadow: 'rgb(0 0 0 / 20%)',
};

const SharePopup = {
  Overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  Container: {
    backgroundColor: core.white,
    borderColor: core.silver,
    color: core.black,
    boxShadowColor: core.shadow,
  },

  ShareButton: {
    color: core.white,
    backgroundColor: core.green,
  },

  RetryButton: {
    color: core.white,
    backgroundColor: core.yellow,
  },

  CloseButton: {
    color: core.white,
    backgroundColor: core.grey,
  },
};

const HowToPlay = {
  Container: {
    backgroundColor: core.white,
    borderColor: core.silver,
    color: core.black,
    boxShadowColor: core.shadow,
  },
  CloseButton: {
    backgroundColor: core.transparent,
  },
  Example: {
    borderColor: core.coal,
  },
};

const Letter = {
  color1: core.black,
  color2: core.white,
  backgroundColor1: core.green,
  backgroundColor2: core.yellow,
  backgroundColor3: core.grey,
  backgroundColor4: core.transparent,
  borderColor1: '#878a8c',
  borderColor2: core.coal,
};

const Keyboard = {
  highlightColor: 'rgba(0, 0, 0, 0.3)',
};

const colors = {
  SharePopup,
  HowToPlay,
  Letter,
  Keyboard,
};

export default colors;
