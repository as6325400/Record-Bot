"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = void 0;
function isNumber(input) {
    const regex = /^[0-9]+$/;
    return regex.test(input);
}
exports.isNumber = isNumber;
