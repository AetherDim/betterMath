import { add, sqrtNewton, sqrtFromISqrt, sqrtNewtonMultiplyOnly } from "../betterMath";
import "./Extended QUnit"
import "./WebKitMathTests"

QUnit.module("betterMath", () => {
	QUnit.test("math overwrite", assert => {
		assert.ok((<any>Math).isBetterMath)
	});
});


QUnit.module("add", () => {
	QUnit.test("two numbers", assert => {
		assert.equal(add(1, 1), 2);
	});
});


QUnit.module("sqrt", () => {

	function sqrtTests(sqrt: (value: number, iterationCount?: number) => number) {
		QUnit.test("compare with OldMath.sqrt", assert => {
			let maxDifference = 0
			for (let i = 0; i < 100_000; i+=1_000) {
				const difference = assert.approximately(sqrt(i), OldMath.sqrt(i), 6e-14, "sqrt(" + i + ")")
				maxDifference = OldMath.max(maxDifference, difference)
			}
			assert.approximately(maxDifference, 0, 6e-14, "max difference")
		})
	
	
		QUnit.test("exact values", assert => {
			assert.equal(sqrt(4), 2)
			assert.equal(sqrt(5), 2.23606797749979)
			assert.equal(sqrt(5634525347345), 2373715.515251354)
			assert.equal(sqrt(28376478263784627835), 5326957693.072532)
	
			assert.ok(isNaN(sqrt(-1)))
		})
	
		QUnit.test("iteration count", assert => {
			for (let i = 0; i < 10; i++) {
				assert.equal(sqrt(28376478263784627835, i), 5326957693.072532, "iteration count: " + i)
			}
		})
	
		QUnit.test("timing benchmark", assert => {
			for (let i = 0; i < 1_000_000; i++) {
				sqrt(5)
			}
			assert.ok(true)
		})
	}

	([
		["newton", sqrtNewton],
		["newton multiply only", sqrtNewtonMultiplyOnly],
		["sqrtFromISqrt", sqrtFromISqrt]
	] as (readonly [string, (value: number) => number])[]).forEach(sqrtObject => {
		QUnit.module(sqrtObject[0], () => {
			sqrtTests(sqrtObject[1])
		})
	})
	
})



