export function uuid() {
    return new Array(6)
        .fill(0)
        .map((c) =>
            (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
        )
        .join('');
}
