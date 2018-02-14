import download from 'downloadjs';

export const downloadData = {
  bind(el, { value, arg }) {
    if (arg === 'type') {
      el.$downloadType = value;
    } else {
      el.$downloadValue = value;
      const handler = () => {
        if (el.$downloadType && el.$downloadType.toLowerCase() === 'csv') {
          if (typeof el.$downloadValue === 'string') {
            download(el.$downloadValue, 'data.csv', 'application/csv');
          } else {
            download(toCsv(el.$downloadValue), 'data.csv', 'application/csv');
          }
        } else if (
          el.$downloadType &&
          el.$downloadType.toLowerCase() === 'json'
        ) {
          if (typeof el.$downloadValue === 'string') {
            download(el.$downloadValue, 'data.json', 'application/json');
          } else {
            download(
              JSON.stringify(el.$downloadValue, null, 2),
              'data.json',
              'application/json'
            );
          }
        } else if (el.$downloadType) {
          download(el.$downloadValue, 'data', el.$downloadType);
        } else {
          download(el.$downloadValue, 'data');
        }
      };
      el.addEventListener('click', handler);
      el.$destroyDownload = () => el.removeEventListener('click', handler);
    }
  },

  unbind(el) {
    el.$destroyDownload();
  },

  componentUpdated(el, { value, arg }) {
    if (arg === 'type') {
      el.$downloadType = value;
    } else {
      el.$downloadValue = value;
    }
  }
};

function toCsv(data) {
  const keys = Object.keys(data[0]);
  let csvData = keys.join(',') + '\r\n';

  data.map(item => {
    for (let key of keys) {
      let escapedCSV = item[key] + ''; // cast Numbers to string
      if (escapedCSV.match(/[,"\n]/)) {
        escapedCSV = '"' + escapedCSV.replace(/\"/g, '""') + '"';
      }
      csvData += escapedCSV + ',';
    }
    csvData = csvData.slice(0, csvData.length - 1);
    csvData += '\r\n';
  });
  return csvData;
}

const install = Vue => {
  Vue.directive('DownloadData', downloadData);
};

export default install;

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
