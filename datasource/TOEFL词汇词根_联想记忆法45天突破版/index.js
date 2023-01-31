const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync(
  './TOEFL词汇词根_联想记忆法45天突破版/TOEFL词汇词根_联想记忆法45天突破版.pdf'
);

pdf(dataBuffer)
  .then(function (data) {
    const datasource = {};
    let dayKey = 0;
    let wordlist = null;
    data.text.split(/\n/).forEach((text) => {
      const trimmed = text.trim();
      if (/wordlist(\d)+$/.test(trimmed)) {
        if (wordlist?.length > 0) {
          datasource[`day-${dayKey}`] = wordlist;
          dayKey++;
        }
        wordlist = [];
        return;
      }
      if (wordlist && trimmed) {
        wordlist.push(trimmed);
      }
    });
    if (wordlist?.length > 0) {
      datasource[`day-${dayKey}`] = wordlist;
    }
    fs.writeFileSync(
      './TOEFL词汇词根_联想记忆法45天突破版/datasource.json',
      JSON.stringify(datasource)
    );
  })
  .catch(function (error) {
    console.log('error', error);
  });
