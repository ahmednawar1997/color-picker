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

export const generateColors = (num: number) => {
    const colors = [];
    for (let i = 0; i < num; i++) {
        colors.push(pickRandomColor());
    }
    return colors;
};

export const generateShades = (color: any, num: number) => {
    let shades: Array<any> = [];
    const shadesDetails = getShadesNum(color, num);

    let newShade = { ...color };

    for (let i = 0; i < shadesDetails.lightShadesNum; i++) {
        newShade = getshadeColor(newShade, 20);
        shades.push(rgbToHex(newShade));
        console.log(newShade);
    }
    newShade = { ...color };

    const shadesTemp: Array<any> = [];
    shadesTemp.push(rgbToHex(color));

    for (let i = 0; i < shadesDetails.darkShadesNum - 1; i++) {
        newShade = getshadeColor(newShade, -20);
        console.log(newShade);
        shadesTemp.push(rgbToHex(newShade));
    }
    shadesTemp.reverse();
    shades = shadesTemp.concat(shades);

    return shades;
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
    const darkShadesNum = total - lightShadesNum;


    return { lightShadesNum, darkShadesNum };

};