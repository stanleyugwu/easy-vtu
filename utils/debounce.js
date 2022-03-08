/**
 * implements logic to debounces a given function for a given timeout, on concurrent invocations
 * @param {function} func a function to debounce
 * @param {number} timeout timeout to debounce function withing
 * @returns {function} a new version of `func` that can debounce calls to original `func` 
 * for the numbr of milliseconds passed in `timeout` parameter. Timeout defaults to **600ms**
 */
 const debounce = (func = () => null, timeout = 600) => {
    let timer;
    return function(){
      clearTimeout(timer);
      timer = setTimeout(() => func(...arguments), timeout)
    }
  }

  export default debounce