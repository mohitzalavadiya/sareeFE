const fs = require('fs');
const https = require('https');
const path = require('path');

const html = fs.readFileSync('source.html', 'utf-8');

// Regex to grab product cards
// Look for card-wrapper which usually contains the image and text
const products = [];

// To find products safely in raw HTML, let's find the titles first inside card__heading
const headingsRegex = /<h3 class="[^"]*card__heading[^"]*">([\s\S]*?)<\/h3>/g;
const titles = [];
let m;
while ((m = headingsRegex.exec(html)) !== null) {
  let title = m[1].replace(/<[^>]+>/g, '').trim();
  title = title.replace(/\s+/g, ' '); // remove extra newlines
  if (title) titles.push(title);
}

// Find images inside card__media
const imgsRegex = /<div class="[^"]*card__media[^"]*">([\s\S]*?)<\/div>/g;
const images = [];
while ((m = imgsRegex.exec(html)) !== null) {
  let inner = m[1];
  let srcMatch = inner.match(/src="([^"]+)"/);
  if (srcMatch) {
    let url = srcMatch[1];
    if (url.startsWith('//')) url = 'https:' + url;
    images.push(url);
  }
}

// Map them. Assuming they align:
const finalProducts = titles.map((t, i) => ({
  name: t,
  image: images[i] ? images[i].split('?')[0] : null
}));

// We only want about 8 products for NEW ARRIVALS for example, or all of them.
console.log(JSON.stringify(finalProducts.slice(0, 10), null, 2));

