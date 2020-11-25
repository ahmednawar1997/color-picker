export const getColorDescription = (color: any) => {
    if (color.red >= color.green && color.red >= color.blue) { return 'redish'; }
    if (color.green >= color.red && color.green >= color.blue) { return 'greenish'; }
    if (color.blue >= color.green && color.blue >= color.red) { return 'blueish'; }

    return 'blueish';

};


export const pickRandomColor = () => {
    const color = {
        red: 0,
        green: 0,
        blue: 0
    };
    color.red = Math.floor(Math.random() * 256);

    color.green = Math.floor(Math.random() * 256);
    color.blue = Math.floor(Math.random() * 256);

    return color;
};


export const generateRGBValue = (color: any) => {
    let colorRGB = 'RGB(';
    colorRGB += color.red.toString();
    colorRGB += ',';
    colorRGB += color.green.toString();
    colorRGB += ',';
    colorRGB += color.blue.toString();
    colorRGB += ')';
    return colorRGB;
};

export const componentToHex = (col: number) => {
    const hex = col.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
};

export const rgbToHex = (color: any) => {
    return '#' + componentToHex(color.red) + componentToHex(color.green) + componentToHex(color.blue);
};

export const isDark = (color: any) => {
    const luma = 0.2126 * color.red + 0.7152 * color.green + 0.0722 * color.blue;
    if (luma < 128) {
        return true;
    }
    return false;
};

export const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16)
    } : null;
};

export const generateRandomColors = (num: number) => {
    const colors = [];
    for (let i = 0; i < num; i++) {
        colors.push(pickRandomColor());
    }
    return colors;
};

export const generateSimilarColors = (num: number, color?: any) => {
    const colors = [];
    if (color === undefined) { color = pickRandomColor(); }

    let count = 0;
    while (count < num) {
        const randomColor = pickRandomColor();
        if (colorSimilarity(randomColor, color) < 2) {
            colors.push(randomColor);
            count++;
        }
    }
    return colors;
};

export const generateShades = (color: any, num: number) => {
    let shades: Array<any> = [];
    const shadesDetails = getShadesNum(color, num);

    let newShade = { ...color };

    for (let i = 0; i < shadesDetails.lightShadesNum - 1; i++) {
        newShade = getshadeColor(newShade, shadesDetails.lightRatio);
        shades.push(rgbToHex(newShade));
    }
    newShade = { ...color };

    const shadesTemp: Array<any> = [];
    shadesTemp.push(rgbToHex(color));

    for (let i = 0; i < shadesDetails.darkShadesNum; i++) {
        newShade = getshadeColor(newShade, shadesDetails.darkRatio * -1);
        shadesTemp.push(rgbToHex(newShade));
    }
    shadesTemp.reverse();
    shades = shadesTemp.concat(shades);

    return shades;
};

// https://github.com/antimatter15/rgb-lab/blob/master/color.js
const deltaE = (color1: any, color: any) => {
    const labA = rgb2lab(color1);
    const labB = rgb2lab(color1);
    const deltaL = labA[0] - labB[0];
    const deltaA = labA[1] - labB[1];
    const deltaB = labA[2] - labB[2];
    const c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
    const c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
    const deltaC = c1 - c2;
    let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    const sc = 1.0 + 0.045 * c1;
    const sh = 1.0 + 0.015 * c1;
    const deltaLKlsl = deltaL / (1.0);
    const deltaCkcsc = deltaC / (sc);
    const deltaHkhsh = deltaH / (sh);
    const i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
    return i < 0 ? 0 : Math.sqrt(i);
};

const rgb2lab = (color: any) => {
    let r = color.red / 255;
    let g = color.green / 255;
    let b = color.blue / 255;
    // tslint:disable-next-line: one-variable-per-declaration
    let x, y, z;
    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
    x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
    y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
    z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)];
};

export const colorSimilarity = (color1: any, color2: any) => {
    const delta = deltaE(color1, color2);
    if (delta <= 10) { return 1; }
    if (delta <= 50) { return 2; }
    return 3;
};


const getshadeColor = (color: any, percent: number) => {

    const newShade = {
        red: 0, green: 0, blue: 0
    };

    newShade.red = Math.floor(color.red * (100 + percent) / 100);
    newShade.green = Math.floor(color.green * (100 + percent) / 100);
    newShade.blue = Math.floor(color.blue * (100 + percent) / 100);

    newShade.red = (newShade.red < 255) ? newShade.red : 255;
    newShade.green = (newShade.green < 255) ? newShade.green : 255;
    newShade.blue = (newShade.blue < 255) ? newShade.blue : 255;

    return newShade;
};

const getShadesNum = (color: any, total: number) => {
    const maxSubColor = Math.max.apply(null, Object.values(color));
    const maxDiff = 255 - maxSubColor;

    const minDiff = Math.min.apply(null, Object.values(color));

    const lightShadesNum = Math.floor((maxDiff / (maxDiff + minDiff)) * total);
    // const darkShadesNum = total - lightShadesNum;

    console.log(maxDiff);

    console.log(lightShadesNum);
    // const darkRatio, lightRatio = Math.abs(maxSubColor - minDiff) > 200 ? 5 : 20;
    const lightRatio = maxSubColor > 220 ? 5 : 10;
    const darkRatio = minDiff < 30 ? 10 : 20;

    const darkShadesNum = total - lightShadesNum;

    return { lightShadesNum, darkShadesNum, lightRatio, darkRatio };
};

