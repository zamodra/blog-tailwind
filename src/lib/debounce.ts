const debounce = <T extends (...args: unknown[]) => void>(fn: T, time: number) => {
    let timeout: ReturnType<typeof setTimeout>;
  
    return function (this: unknown, ...args: Parameters<T>) {
      const functionCall = () => fn.apply(this, args);
  
      // Clear the timeout if it exists
      clearTimeout(timeout);
  
      // Set the new timeout
      timeout = setTimeout(functionCall, time);
    };
  };
  
  export default debounce;
  