export const createObserver = (element, cb) => {
  const observer = new MutationObserver(cb);
  observer.observe(element, {
    childList: true,
    subtree: true,
  });
  return observer;
};
