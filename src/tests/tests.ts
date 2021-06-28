import { add } from "../betterMath";


QUnit.module('add');

QUnit.test('add two numbers', assert => {
  assert.equal(add(1, 1), 2);
});