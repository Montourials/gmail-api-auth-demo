// import { useEffect, useState } from "react";

// const defaultOptions = {
//   capture: true,
//   once: true,
// };

// const useBackButton = (callback, options = defaultOptions) => {
//   const [isBack, setIsBack] = useState(false);

//   useEffect(() => {
//     const handleEvent = () => {
//       try {
//         callback();
//         setIsBack(true);
//       } catch (e) {
//         console.error(e);
//       }
//     };

//     window.addEventListener("popstate", handleEvent, { ...options });

//     if (!options.once) {
//       return () =>
//         window.removeEventListener("popstate", handleEvent, { ...options });
//     }
//   }, [callback, options]);

//   return isBack;
// };

// export default useBackButton;
