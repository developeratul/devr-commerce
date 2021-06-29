import { useState } from "react";
import { motion } from "framer-motion";

const Settings = () => {
  const [state, setState] = useState(true);

  return (
    <div>
      <button onClick={(pre) => setState(!pre)}>button</button>

      {state ? (
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          I am here
        </motion.h1>
      ) : (
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          I am gone
        </motion.h1>
      )}
    </div>
  );
};

export default Settings;
