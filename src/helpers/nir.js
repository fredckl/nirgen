
import luhn from './luhn';
import { length, equals, indexOf, replace, splitAt, when, compose, propOr, head, applySpec, gt, is, tap } from 'ramda';
import { getYears } from './year';
import getMonths from './month';
import shuffle from './shuffle';
import { getNumberOfDepartments } from './department';

export const validateNIR = (nir) => {
  if (equals(15, length(nir))) {
    // Check if nir has letter
    if (equals(5, indexOf('2B', nir))) {
      nir = replace('2B', 18, nir);
    } else if (equals(5, indexOf('2A', nir))) {
      nir = replace('2A', 19, nir);
    }
    const [nirWithoutKey, nirKey] = splitAt(13, nir);
    return equals(parseInt(nirKey), luhn(nirWithoutKey));
  }
  return false;
};

const getFirstOfArrayShuffle  = compose(head, shuffle);
const toString = v => `${v}`
const randomCent = () => compose(toString, when( gt(100), v => `0${v}`), parseInt)(Math.floor(Math.random(1) * 1000));


export const generateNIR = (props) => {
  const {
    sex, year, month, department, comm, ordre
  } = applySpec({
    sex: propOr(getFirstOfArrayShuffle(['1', '2']), 'sex'),
    year: propOr(getFirstOfArrayShuffle(getYears()), 'year'),
    month: propOr(getFirstOfArrayShuffle(getMonths), 'month'),
    department: compose(
      toString,
      replace('2a', '19'),
      replace('2b','18'),
      when(is(Number), toString),
      propOr(getFirstOfArrayShuffle(getNumberOfDepartments()), 'department')),
    comm: propOr(randomCent(), 'comm'),
    ordre: propOr(randomCent(), 'ordre')
  })(props);

  return `${sex}${year}${month}${department}${comm}${ordre}${compose(when(gt(10), v => `0${v}`),luhn)(sex + year + month + department + comm + ordre)}`
}


