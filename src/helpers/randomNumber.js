import { equals, compose, always, when } from 'ramda';

export const randomInt = (max = 2) => compose(
  when(equals(0), always(2)),
  Math.floor
)(Math.random(max));

