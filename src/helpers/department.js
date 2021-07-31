import departments from '../data/departments.json';
import { compose, map, prop, sortBy } from 'ramda';

export const getNumberOfDepartments = () => map(prop('num_dep'))(departments);
export const getZipDepartments = () => compose(
  map(d => [prop('num_dep', d), prop('dep_name', d)]),
  sortBy(prop('dep_name'))
)(departments);