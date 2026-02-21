const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '../../client/src/data/curriculum.js');
const destPath = path.join(__dirname, '../data/tempCurriculum.js');
const dataDir = path.join(__dirname, '../data');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

let content = fs.readFileSync(sourcePath, 'utf8');

// 1. Remove imports
content = content.replace(/^import\s+.*;/gm, '');

// 2. Remove export keyword
content = content.replace('export const courses', 'const courses');

// 3. Replace image variables with placeholders
const imageMap = {
    'mathImg': '/assets/store/class-6-10-maths.jpg',
    'scienceImg': '/assets/store/class-6-10-science.jpg',
    'socialImg': '/assets/store/class-6-10-social.jpg',
    'englishImg': '/assets/store/class-6-10-english.jpg',
    'phyImg': '/assets/store/class-11-12-physics.jpg',
    'chemImg': '/assets/store/class-11-12-chem.jpg',
    'bioImg': '/assets/store/class-11-12-bio.jpg',
    'neetImg': '/assets/store/neet-biology.jpg',
    'jeeImg': '/assets/store/jee-physics.jpg',
    'btechCsImg': '/assets/store/ug-btech-cs.jpg',
    'btechItImg': '/assets/store/ug-btech.jpg',
    'bcomImg': '/assets/store/ug-bcom.jpg',
    'mbaImg': '/assets/store/pg-mba.jpg',
    'dsImg': '/assets/store/pg-data-science.jpg'
};

Object.keys(imageMap).forEach(key => {
    // Replace "coverImage: key," with "coverImage: 'value',"
    const regex = new RegExp(`coverImage:\\s*${key}`, 'g');
    content = content.replace(regex, `coverImage: '${imageMap[key]}'`);
});

// 4. Add module.exports
content += '\nmodule.exports = courses;\n';

fs.writeFileSync(destPath, content);
console.log('✅ tempCurriculum.js created successfully!');
