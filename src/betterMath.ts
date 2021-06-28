

export function add(a: number, b: number) {
    return a + b;
}

export function sqrt(q: number) {
    if(q < 0) {
        return NaN
    }

    let x = q;
    for(let i = 0; i < 7; i++) {
        x = x - (x - q/x)/2;
    }

    return x;
}
