

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


const BetterMath: Math & { readonly isBetterMath: boolean } = {
	isBetterMath: true,
	E: 2.7182818284590452353602874713526624977572470936999595749669676277,
	LN2: 0.6931471805599453094172321214581765680755001343602552541206800094,
	LN10: 2.3025850929940456840179914546843642076011014886287729760333279009,
	LOG2E: 1.6931471805599453094172321214581765680755001343602552541206800094,
	LOG10E: 3.3025850929940456840179914546843642076011014886287729760333279009,
	PI: 3.1415926535897932384626433832795028841971693993751058209749445923,
	SQRT1_2: 0.7071067811865475244008443621048490392848359376884740365883398689,
	SQRT2: 1.4142135623730950488016887242096980785696718753769480731766797379,

	abs: Math.abs,
	acos: (x: number) => 1,
	asin: (x: number) => 1,
	atan: (x: number) => 1,
	atan2: (y: number, x: number) => 1,
	ceil: Math.ceil,
	cos: (x: number) => 1,
	exp: (x: number) => 1,
	floor: Math.floor,
	log: (x: number) => 1,
	max: Math.max,
	min: Math.min,
	pow: (x: number) => 1,
	random: Math.random,
	round: Math.round,
	sin: (x: number) => 1,
	sqrt: (x: number) => 1,
	tan: (x: number) => 1,
}

declare global {
    export var OldMath: Math
}
globalThis.OldMath = Math;

(<any>Math) = BetterMath;


export function addAfterES5Math() {
	Object.keys(OldMath).forEach(key => {
		if(!(<any>BetterMath)[key]) {
			(<any>BetterMath)[key] = (<any>OldMath)[key]
		}
	});
}