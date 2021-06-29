// force TypeScript to interpret this file as a module
export {}

interface AssertExtension {
	/**
	 * The assertion passes if `Math.abs(actual - expected) <= maxAbsoluteDifference`
	 * 
	 * @param actual the calculated value
	 * @param expected the expected value
	 * @param maxAbsoluteDifference the maximum absolute difference between the values (default: 1e-15)
	 * @param message an optional custom message
	 * @returns the (signed) difference of `actual - expected`
	 */
	approximately(actual: number, expected: number, maxAbsoluteDifference?: number, message?: string): number
}

declare global {
	export interface Assert extends AssertExtension {}
}

const assertExtension: AssertExtension = {
	approximately(this: Assert, actual: number, expected: number, maxAbsoluteDifference: number = 1e-15, message?: string): number {
		const difference = actual - expected
		const result = Math.abs(difference) <= maxAbsoluteDifference
		this.pushResult({
			result: result,
			actual: actual,
			expected: expected,
			message: (message ?? (result ? "okay" : "failed")) + "  difference: " + difference
		})
		return difference
	}
}

for (const stringKey in assertExtension) {
	const key = stringKey as keyof AssertExtension
	QUnit.assert[key] = assertExtension[key] as any
}