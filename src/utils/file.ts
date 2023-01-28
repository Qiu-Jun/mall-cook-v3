/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-28 18:32:29
 * @LastEditors: June
 * @LastEditTime: 2023-01-28 18:57:32
 */
function assertString(input: any) {
    const isString = typeof input === 'string' || input instanceof String;

    if (!isString) {
        let invalidType: any = typeof input;
        if (input === null) invalidType = 'null';
        else if (invalidType === 'object') invalidType = input.constructor.name;

        throw new TypeError(`Expected a string but received a ${invalidType}`);
    }
}

function isURL(url: string) {
    const reg =
        /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return reg.test(url);
}

function merge(obj: any = {}, defaults: any) {
    for (const key in defaults) {
        if (typeof obj[key] === 'undefined') {
            obj[key] = defaults[key];
        }
    }
    return obj;
}
const notBase64 = /[^A-Z0-9+\/=]/i;
const urlSafeBase64 = /^[A-Z0-9_\-]*$/i;

const defaultBase64Options = {
    urlSafe: false,
};
function isBase64(str: any, options?: any) {
    assertString(str);
    options = merge(options, defaultBase64Options);
    const len = str.length;

    if (options.urlSafe) {
        return urlSafeBase64.test(str);
    }

    if (len % 4 !== 0 || notBase64.test(str)) {
        return false;
    }

    const firstPaddingChar = str.indexOf('=');
    return (
        firstPaddingChar === -1 ||
        firstPaddingChar === len - 1 ||
        (firstPaddingChar === len - 2 && str[len - 1] === '=')
    );
}

function isBase64WithScheme(str: string, mediaType: string) {
    if (!str) {
        return false;
    }
    if (mediaType && !str.startsWith(`data:${mediaType}`)) {
        return false;
    } else {
        return isBase64(str.split(',')[1] || '');
    }
}

export async function fileToBlob(file: File | Blob) {
    return file instanceof File
        ? new Promise((resolve) => {
              const fileReader = new FileReader();
              fileReader.onload = (e) => {
                  resolve(
                      e.target?.result
                          ? new Blob([e.target.result], { type: file.type })
                          : null,
                  );
              };
              // readAsArrayBuffer 支持 File 和 Blob
              fileReader.readAsArrayBuffer(file);
          })
        : Promise.resolve(file);
}

export function blobToFile(blob: File | Blob, fileName: string) {
    if (!fileName) {
        const extension = blob.type.split('/')[1];
        fileName = `${new Date().getTime().toString()}.${extension}`;
    }
    return blob instanceof File
        ? blob
        : new File([blob], fileName, { type: blob.type });
}

export function binaryToBase64(binary: File | Blob) {
    return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            resolve(e.target?.result);
        };
        // readAsDataURL 支持 File 和 Blob
        fileReader.readAsDataURL(binary);
    });
}

// 任意类型 转 File 或 Blob
export async function toBinary(source: File | Blob | string) {
    if (typeof source === 'string') {
        if (
            isURL(source) ||
            isBase64WithScheme(source, 'image/') ||
            source.startsWith('blob:')
        ) {
            return await (await fetch(source)).blob();
        }
        throw new Error('解析图片失败');
    }
    return Promise.resolve(source);
}

// 任意类型 转 Base64 或 object URL
export async function toLocalURL(source: File | Blob | string) {
    if (typeof source === 'string') {
        if (source.startsWith('blob:')) {
            return Promise.resolve(source);
        }
        if (isURL(source)) {
            return binaryToBase64(await toBinary(source));
        }
        // isBase64 的参数为 URL 或 object URL 时会报错
        if (isBase64WithScheme(source, 'image/')) {
            return Promise.resolve(source);
        }
        throw new Error('解析图片失败');
    }
    return binaryToBase64(source);
}

export async function toImageTag(src: string) {
    return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.src = src;
    });
}
