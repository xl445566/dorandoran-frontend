import { customAlphabet } from "nanoid";

const createKey = () => {
  return customAlphabet("01234567899abcedf", 6)();
};

export default createKey;
