import departments from '../data/departments.json';
import { map, prop } from 'ramda';

export const getNumberOfDepartments = () => map(prop('num_dep'))(departments);
export const getZipDepartments = () => map(d => [prop('num_dep', d), prop('dep_name', d)])(departments);