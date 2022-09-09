import configs from '@/configs';
import helpers from '@/helpers';

const HEADER_HEIGHT = '65px';

// const KEY_PADDING = '20px';

// const KEY_HEIGHT = '58px';

const KEY_PADDING = '10px';
const KEY_HEIGHT = '48px';

const KEY_GAP = '4px';

const LETTER_WIDTH = '62px';

const LETTER_HEIGHT = '62px';

const KEYBOARDS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
];

const DEFAULT_RECORD = helpers.createNewRecord('typing', '');

const DEFAULT_TABLE = helpers.createNewTable(configs.characterPerWord, DEFAULT_RECORD);

const DEFAULT_DATABASE = helpers.createNewDatabase(configs.tryTimes, DEFAULT_TABLE);

const COMPARE_SECONDS = 4;

export default {
  HEADER_HEIGHT,

  KEY_HEIGHT,
  KEY_PADDING,
  KEY_GAP,
  LETTER_HEIGHT,
  LETTER_WIDTH,
  KEYBOARDS,

  DEFAULT_DATABASE,

  COMPARE_SECONDS,
};
