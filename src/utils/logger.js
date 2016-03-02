import logger from 'npmlog'

logger.set = function set ({ level, heading }) {
  // get the function name if any
  heading = heading instanceof Function ? heading.name : heading

  // sets the value
  logger.level = level
  logger.heading = heading

  return logger
}

export default logger
