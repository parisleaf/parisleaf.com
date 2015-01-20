'use strict';

import useragent from 'useragent';

export default function useragentToMediaState(ua) {
  let agent = useragent.lookup(ua);

  if (isDesktop(agent)) {
    return {
      s: true,
      m: true,
      l: true,
      xl: false,
    };
  }

  if (isTablet(agent)) {
    return {
      s: true,
      m: true,
      l: false,
      xl: false,
    };
  }

  if (isMobile(agent)) {
    return {
      s: false,
      m: false,
      l: false,
      xl: false,
    };
  }

  return {};
}

function isDesktop(agent) {
  let os = agent.os.toString();

  return !!(
    os.includes('Windows') || os.includes('Mac OS X') || os.includes('Linux')
  );
}

function isTablet(agent) {
  let device = agent.device.toString();

  return !!(
    agent.device.toString().includes('iPad')
  );
}

function isMobile(agent) {
  let os = agent.os.toString();
  let device = agent.device.toString();

  return !!(
    (!device.includes('iPad') && os.includes('iOS'))
    || os.includes('Android')
  );
}
