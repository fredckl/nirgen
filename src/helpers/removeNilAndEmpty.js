import { anyPass, isEmpty, isNil, reject } from "ramda";

const removeNilAndEmpty = reject(anyPass([isNil, isEmpty]));

export default removeNilAndEmpty;