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

export const generateColors = (num: number) => {
    const colors = [];
    for (let i = 0; i < num; i++) {
        colors.push(pickRandomColor());
    }
    return colors;
};