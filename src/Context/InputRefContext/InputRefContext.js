import { createContext, useRef} from "react";



export const InputRefContext = createContext();

export const InputRefContextProvider = ({ children }) => {
  const inputRef = useRef(null);

  return (
    <InputRefContext.Provider value={inputRef}>
      {children}
    </InputRefContext.Provider>
  );
};