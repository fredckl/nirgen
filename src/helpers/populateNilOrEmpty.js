import { length } from "ramda";
import { getNumberOfDepartments } from "./department";
import getMonths from "./month";
import random from "./ramdom";
import moment from "moment";

const populateNilOrEmpty = (data) => {
  if(!data.year) {
    data.year = moment().subtract(random(65, 18)).format('YY');
  }

  if(!data.month) {
    const months = getMonths;
    data.month = months[random(length(months))]
  }

  if(!data.department) {
    const departments = getNumberOfDepartments(); 
    data.department = departments[random(length(departments))]
  }

  if(!data.sex) {
    data.sex = random(2, 1); 
  }

  return data
}

export default populateNilOrEmpty;