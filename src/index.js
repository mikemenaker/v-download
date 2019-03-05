import download from 'downloadjs';

export const downloadData = {
    bind(el, {value, arg}) {
        if (arg === 'type') {
            el.$downloadType = value;
        } else if (arg === 'filename') {
            el.$downloadFileName = value;
        } else {
            el.$downloadValue = value;
            el.addEventListener('click', () => handler(el));
            el.$destroyDownload = () => el.removeEventListener('click', handler);
        }
    },

    unbind(el) {
        el.$destroyDownload();
    },

    componentUpdated(el, {value, arg}) {
        if (arg === 'type') {
            el.$downloadType = value;
        } else if (arg === 'filename') {
            el.$downloadFileName = value;
        } else {
            el.$downloadValue = value;
        }
    }
};

function handler(el) {
    if (el.$downloadType) {
        if (el.$downloadType.toLowerCase() === 'csv') {
            const fileName = el.$downloadFileName || 'data.csv';
            const downloadData = isString(el.$downloadValue) ? el.$downloadValue : toCsv(el.$downloadValue);
            download(downloadData, fileName, 'application/csv');
        } else if (el.$downloadType.toLowerCase() === 'tsv') {
            const fileName = el.$downloadFileName || 'data.tsv';
            const downloadData = isString(el.$downloadValue) ? el.$downloadValue : toTsv(el.$downloadValue);
            download(downloadData, fileName, 'application/tsv');
        } else if (el.$downloadType.toLowerCase() === 'json') {
            const fileName = el.$downloadFileName || 'data.json';
            const downloadData = isString(el.$downloadValue)
                ? el.$downloadValue
                : JSON.stringify(el.$downloadValue, null, 2);
            download(downloadData, fileName, 'application/json');
        }
        const fileName = el.$downloadFileName || 'data';
        download(el.$downloadValue, fileName, el.$downloadType);
    }

    const fileName = el.$downloadFileName || 'data';
    download(el.$downloadValue, fileName);
}

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

function toTsv(data) {
    const keys = Object.keys(data[0]);
    let tsvData = keys.join('\t') + '\r\n';

    data.map(item => {
        for (let key of keys) {
            let escaped = item[key] + ''; // cast Numbers to string
            tsvData += `${escaped}\t`;
        }
        tsvData = tsvData.slice(0, tsvData.length - 1);
        tsvData += '\r\n';
    });
    return tsvData;
}

function isString(x) {
    return typeof x === 'string';
}

const install = Vue => {
    Vue.directive('DownloadData', downloadData);
};

export default install;

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
