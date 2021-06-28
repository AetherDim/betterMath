import { add, sqrt } from "../betterMath";


QUnit.module('add');

QUnit.test('add two numbers', assert => {
  assert.equal(add(1, 1), 2);
});


QUnit.module('sqrt')

QUnit.test('sqrt', assert => {
  assert.equal(sqrt(4), 2)
  assert.equal(sqrt(5), 2.2360679775)
  assert.equal(sqrt(28376478263784627835), 5326957693.072532)
  assert.ok(isNaN(sqrt(-1)))
})

QUnit.test('sqrt benchmark', assert => {
  for (let i = 0; i < 1_000_000; i++) {
    sqrt(5)
  }
  assert.ok(true)
})


