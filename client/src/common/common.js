// debouncing: it stops the execution of the function by restricting its invocation
export const debounced = (cb, wait) => {
  let timer;
  console.log("inside debounced cb")

  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      console.log("inside timeout")
      cb()
    }, wait)
  }
}