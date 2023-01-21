/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-21 22:04:11
 * @LastEditors: June
 * @LastEditTime: 2023-01-21 22:07:16
 */
/**
 * 生成随机数  （num 位随机数 + 时间戳）
 */
export function getRandomCode(num = 8, stamp = true) {
    const data = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
    ];
    let nums = '';
    const timestamp = ~~(new Date().getTime() / 1000) + '';
    for (let i = 0; i < num; i++) {
        const r = ~~(Math.random() * 61);
        nums += data[r];
    }
    return stamp ? timestamp + nums : nums;
}
