const Vue = require('vue/dist/vue');
const downloadData = require('../src/index');

Vue.use({install: downloadData.default});

describe('static download data', () => {
    let vm;

    beforeEach(() => {
        const template = `
        <div>
            <button v-download-data="'some text'">Download!</button>
        </div>
        `;

        vm = new Vue({
            template
        }).$mount();
    });

    test('setting download data', () => {
        const result = vm.$el.firstChild.$downloadValue;
        expect(result).toEqual('some text');
    });

    test('download data type should be empty', () => {
        const result = vm.$el.firstChild.$downloadType;
        expect(result).toEqual(undefined);
    });

    test('download filename should be empty', () => {
        const result = vm.$el.firstChild.$downloadFileName;
        expect(result).toEqual(undefined);
    });
});

describe('static download data with all attributes', () => {
    let vm;

    beforeEach(() => {
        const template = `
        <div>
            <button v-download-data="'some text'" v-download-data:type="'json'" v-download-data:filename="'data.csv'">Download!</button>
        </div>
        `;

        vm = new Vue({
            template
        }).$mount();
    });

    test('setting download data', () => {
        const result = vm.$el.firstChild.$downloadValue;
        expect(result).toEqual('some text');
    });

    test('setting download data type', () => {
        const result = vm.$el.firstChild.$downloadType;
        expect(result).toEqual('json');
    });

    test('setting download filename', () => {
        const result = vm.$el.firstChild.$downloadFileName;
        expect(result).toEqual('data.csv');
    });
});

describe('highlighting dynamic code', () => {
    let vm;

    beforeEach(() => {
        const template = `
        <div>
            <button v-download-data="downloaddata" v-download-data:type="type" v-download-data:filename="filename">Download!</button>
        </div>
        `;

        vm = new Vue({
            template,
            data: {
                downloaddata: 'some text',
                type: 'json',
                filename: 'data.csv'
            }
        }).$mount();
    });

    test('setting download data', () => {
        let result = vm.$el.firstChild.$downloadValue;
        expect(result).toEqual('some text');
        vm.downloaddata = 'different text';
        Vue.nextTick(() => {
            result = vm.$el.firstChild.$downloadValue;
            expect(result).toEqual('different text');
        });
    });

    test('setting download data type', () => {
        let result = vm.$el.firstChild.$downloadType;
        expect(result).toEqual('json');
        vm.type = 'csv';
        Vue.nextTick(() => {
            result = vm.$el.firstChild.$downloadType;
            expect(result).toEqual('csv');
        });
    });

    test('setting download filename', () => {
        let result = vm.$el.firstChild.$downloadFileName;
        expect(result).toEqual('data.csv');
        vm.filename = 'differentFile.json';
        Vue.nextTick(() => {
            result = vm.$el.firstChild.$downloadFileName;
            expect(result).toEqual('differentFile.json');
        });
    });
});
