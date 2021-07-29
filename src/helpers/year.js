import moment from 'moment';
import { map } from 'ramda';

const d18 = moment.duration(18, 'y');
const d50 = moment.duration(50, 'y');

export const getMajorYear = () => moment().subtract(d18).format('YY');

export const getYears = () => {
  const a18 = moment().subtract(d18).format('YYYY');
  let a50 = moment().subtract(d50).format('YYYY');
  const arrayYears = []
  while (a50 <= a18) {
    arrayYears.push(a50++)
  }
  return map(year => moment(`${year}-01-01`).format('YY'))(arrayYears)
}

