import React from 'react';

export function deepCopy(object) {
    return JSON.parse(JSON.stringify(object));
}
