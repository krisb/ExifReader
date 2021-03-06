/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export function getStringFromDataView(dataView, offset, length) {
    const chars = [];
    for (let i = 0; i < length && offset + i < dataView.byteLength; i++) {
        chars.push(dataView.getUint8(offset + i, false));
    }
    return getStringValueFromArray(chars);
}

export function getUnicodeStringFromDataView(dataView, offset, length) {
    const chars = [];
    for (let i = 0; i < length && offset + i < dataView.byteLength; i += 2) {
        chars.push(dataView.getUint16(offset + i));
    }
    return getStringValueFromArray(chars);
}

export function getStringValueFromArray(charArray) {
    return charArray.map((charCode) => String.fromCharCode(charCode)).join('');
}

export function getCharacterArray(string) {
    return string.split('').map((character) => character.charCodeAt(0));
}

export function objectAssign(target, ...sources) {
    for (const source of sources) {
        for (const property in source) {
            target[property] = source[property];
        }
    }

    return target;
}

export function deferInit(object, key, initializer) {
    let initialized = false;
    Object.defineProperty(object, key, {
        get() {
            if (!initialized) {
                initialized = true;
                Object.defineProperty(object, key, {
                    configurable: true,
                    enumerable: true,
                    value: initializer.apply(object),
                    writable: true
                });
            }
            return object[key];
        },
        configurable: true,
        enumerable: true
    });
}
