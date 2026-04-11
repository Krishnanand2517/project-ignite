import { useEffect, useState } from "react";
import Loader from "./Loader";

const DelayedLoader = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return show ? <Loader fullScreen /> : null;
};

export default DelayedLoader;
