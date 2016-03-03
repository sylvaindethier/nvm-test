import log from 'npmlog'

log.set = function set ({ level, heading }) {
  // get the function name if any
  heading = heading instanceof Function ? heading.name : heading

  // sets the value
  log.level = level
  log.heading = heading

  return log
}

export default log
