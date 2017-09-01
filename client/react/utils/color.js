const hexShort = /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i;
const hexLong = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/;
const rgb = /^rgba?\(\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*(?:,\s*(0?\.\d+|1|\d{1,3}%)\s*)?\)$/i;

/**
 * A <code>Color</code> object represents a color vector.
 * Each vector component is a number between 0 and 1.
 */
export class Color {
	red = 0;
	green = 0;
	blue = 0;
	alpha = 0;
	
	constructor(red, green, blue, alpha) {
		this.red = red;
		this.green = green;
		this.blue = blue;
		this.alpha = alpha;
	}
	
	static fromCSS = color => {
		let result;
		let parse;
		let parseAlpha;
		
		findParser: {
			result = hexShort.exec(color);
			if (result) {
				parse = parseAlpha = value => parseInt(value || 'f', 16) * 17 / 255;
				break findParser;
			}
			
			result = hexLong.exec(color);
			if (result) {
				parse = parseAlpha = value => parseInt(value || 'ff', 16) / 255;
				break findParser;
			}
			
			result = rgb.exec(color);
			if (result) {
				parse = value => {
					if (value.endsWith('%')) {
						return parseInt(value.slice(0, -1)) / 100;
					}
					else {
						return parseInt(value) / 255;
					}
				};
				parseAlpha = value => {
					if (value.endsWith('%')) {
						return parseInt(value.slice(0, -1)) / 100;
					}
					else {
						return parseFloat(value);
					}
				};
				break findParser;
			}
		}
		
		return new Color(parse(result[1]), parse(result[2]), parse(result[3]), parseAlpha(result[4]));
	};
	
	toString = () => {
		return `rgba(${Math.round(this.red * 255)}, ${Math.round(this.green * 255)}, ${Math.round(this.blue * 255)}, ${this.alpha.toFixed(3)})`;
	};
}

/**
 * @param color1 A CSS-compatible Color string
 * @param color2 A CSS-compatible Color string
 * @param p A value between 0 and 1 to determine the balance between the two colors. Values closer to 0 makes the output closer to color1, and values closer to 1 makes the output closer to color2.
 */
export const mix = (color1, color2, p = 0.5) => {
	color1 = Color.fromCSS(color1);
	color2 = Color.fromCSS(color2);
	
	let q = 1 - p;
	return new Color(
		color1.red * q + color2.red * p,
		color1.green * q + color2.green * p,
		color1.blue * q + color2.blue * p,
		color1.alpha * q + color2.alpha * p
	).toString();
};
