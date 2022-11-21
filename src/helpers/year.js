import moment from 'moment';
import { map } from 'ramda';

const dMin = moment.duration(1, 'y');
const dMax = moment.duration(120, 'y');

export const getMajorYear = () => moment().subtract(dMin).format('YY');

export const getYears = () => {
  const aMin = moment().subtract(dMin).format('YYYY');
  let aMax = moment().subtract(dMax).format('YYYY');
  const arrayYears = []
  while (aMax <= aMin) {
    arrayYears.push(aMax++)
  }

  const formatDate = year => {
    const my = moment(`${year}-01-01`);
    return {
      label: my.format('YYYY'),
      value: my.format('YY')
    }
  }
  return map(formatDate)(arrayYears)
}

