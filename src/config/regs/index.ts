/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 22:35:47
 * @LastEditors: June
 * @LastEditTime: 2023-01-17 23:20:30
 */

/**
 * @desc min和max的数字和字母组合
 * @param { Number } min
 * @param { Number } max
 */
export function numAndLetter(min: number, max: number) {
    if ((!min && min !== 0) || !max) throw new Error('参数错误');
    const str = `^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{${min},${max}}$`;
    return new RegExp(str);
}
