
// eslint-disable-next-line import/no-extraneous-dependencies
import reduxLogger from 'redux-logger';

export default function createLogger() {
  return reduxLogger({
    collapsed: true,
  });
}
