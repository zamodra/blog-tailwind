const debounce = <T extends (...args: any[]) => void>(fn: T, time: number) => {
    let timeout: ReturnType<typeof setTimeout>;
  
    return function(this: any, ...args: Parameters<T>) {
      const functionCall = () => fn.apply(this, args);
  
      // Clear timeout if it exists
      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    };
  };
  
  export default debounce;
  