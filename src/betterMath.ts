

export function add(a: number, b: number) {
	return a + b;
}

export function sqrtNewton(q: number, iterationCount: number = 8) {
	if (q < 0) {
		return NaN
	} else if (q == 0) {
		return 0
	}

	let x = q;
	// Find initial value
	let min = 1024
	while (min < x) {
		min *= 1024
		x /= 1024
	}
	// Newton iteration
	for(let i = 0; i < iterationCount; i++) {
		// f(x) = x^2 - q
		// x_{n+1} = x_n - f(x_n) / f'(x_n)
		//         = x_n - (x_n^2 - q) / (2*x_n)
		//         = x_n - (x_n - q/x_n) / 2
		//         = (x_n + q/x_n) / 2
		x = (x + q/x)/2;
	}

	return x;
}

export function sqrtNewtonMultiplyOnly(q: number, iterationCount: number = 8) {
	if (q < 0) {
		return NaN
	} else if (q == 0) {
		return 0
	}

	let x = q;
	// Find initial value
	let min = 1024
	while (min < x) {
		min *= 1024
		x /= 1024
	}
	// Newton iteration
	const c32 = 3/2
	const invQ2 = 1/(2*q)
	for(let i = 0; i < iterationCount; i++) {
		// f(x) = q / x^2 - 1
		// x_{n+1} = x_n - f(x_n) / f'(x_n)
		//         = x_n - (q / (x_n^2) - 1) / (-2*q/(x_n^3))
		//         = x_n + (x_n - 1/q * x_n^3) / 2
		//         = 3/2 x_n - 1/(2*q) * x_n^3
		//         = x_n * (3/2 - 1/(2*q) * x_n^2)
		x = x * Math.abs(c32 - invQ2*x*x);
	}

	return x;
}


export function sqrtFromISqrt(q: number, iterationCount: number = 8) {
	return 1 / isqrt(q, iterationCount)
}

export function isqrt(q: number, iterationCount: number = 8) {
	if (q < 0) {
		return NaN
	} else if (q == 0) {
		return Infinity
	}

	let x = 1;
	// Find initial value
	// let min = 1024
	// while (min < x) {
	//     min *= 1024
	//     x /= 1024
	// }
	// Newton iteration
	const c34 = 3/4
	const q2 = q/2
	for(let i = 0; i < iterationCount; i++) {
		// f(x) = 1/(x^2) - q
		// x_{n+1} = x_n - f(x_n) / f'(x_n)
		//         = x_n - (1/(x_n^2) - q) / (-2/(x_n^3))
		//         = x_n + (x_n - q * x_n^3) / 2
		//         = (3/2 * x_n - q * x_n^3) / 2
		//         = x_n * (3/4 - q/2 * x_n^2)
		x = x * (c34 - q2*x*x);
	}

	return x;
}
