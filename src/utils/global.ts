import { useRouter } from 'vue-router';

const router = useRouter();
/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-21 22:04:11
 * @LastEditors: June
 * @LastEditTime: 2023-01-23 18:29:09
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

export function jump(data: any) {
    console.log(data);
    const { type, id } = data;
    console.log(type);

    // 跳转自定义页面
    if (type === 'custom') {
        if (!id) {
            console.warn('自定义页面跳转未传递id');
            return;
        }

        router.push({ name: 'custom', query: { pageId: id } });
    }

    // 跳转微页面
    if (type == 'fixed') {
        if (!id) {
            console.warn('微页面跳转未传递id');
            return;
        }
        router.push({ name: data.id });
    }

    // 跳转商品详情
    if (type == 'goods') {
        router.push({ name: 'goods-detail', query: { id } });
    }
}

// 价格显示 分 -> 元  （带两位小数）
export function moneyDec(price: number) {
    return (price / 100).toFixed(2);
}

// 价格显示 分 -> 元
export function money(price: number) {
    return price / 100;
}
