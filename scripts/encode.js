const fs = require("fs");
const { PNG } = require("pngjs");

const TRANSPARENT = 0x00000000;

const encodePNG = (input) => {
  const data = fs.readFileSync(input);
  const png = PNG.sync.read(data, { colorType: 6 });

  const pixels = [];
  for (let i = 0; i < png.data.length / 4; i++) {
    const color = png.data.readUInt32BE(i * 4);
    if (color % 256 === 0) {
      pixels.push(TRANSPARENT);
    } else {
      pixels.push(color);
    }
  }

  if (pixels.length < 1) throw new Error("No pixels");

  let runLength = 0;
  let lastColor = pixels[0];

  let runs = [];
  for (const color of pixels) {
    if (color === lastColor) {
      runLength++;
    } else {
      runs.push({ length: runLength, color: lastColor });

      runLength = 1;
      lastColor = color;
    }
  }
  runs.push({ length: runLength, color: lastColor });

  const palette = {
    [TRANSPARENT]: 0,
  };

  for (const run of runs) {
    if (!palette.hasOwnProperty(run.color)) {
      palette[run.color] = Object.keys(palette).length;
    }
  }

  const paletteData = encodePalette(palette);
  const runData = encodeRuns(runs, palette);

  return Buffer.concat([paletteData, runData]);
};

const encodePalette = (palette) => {
  if (Object.keys(palette).length > 8) throw new Error("Too many colors");

  const data = new DataView(new ArrayBuffer(32));
  for (const color in palette) {
    const index = palette[color];
    data.setUint32(index * 4, color); // big endian
  }

  return Buffer.from(data.buffer);
};

const encodeRuns = (runs, palette) => {
  if (Object.keys(palette).length > 8) throw new Error("Too many colors");

  const data = [];
  runs.forEach((run) => {
    let length = run.length;
    while (length > 0) {
      const partLength = Math.min(length, 32);
      const value = (((partLength - 1) & 0x1f) << 3) | palette[run.color];
      data.push(value);
      length -= partLength;
    }
  });

  return Buffer.from(data);
};

if (process.argv.length < 4) {
  console.error("Expected at least two arguments!");
  process.exit(1);
}

const [input, output] = process.argv.slice(2);
const result = encodePNG(input);
fs.writeFileSync(output, result);
