# v-download
Vue.js directive to download (and optionally transform) data

#### Install

For browser usage, import the component by adding a src tag in the header (<head>):
`<script src="https://unpkg.com/v-download@1.2.0/dist/main.js">`

For Node usage, install the v-download package using npm
`npm install --save v-download`

## Usage

First register the directive globally:

```js
import DownloadData from 'v-download'

Vue.use(DownloadData)
```

Or locally:

```js
import { downloadData } from 'v-download'

export default {
  directives: {
    downloadData
  }
}
```

Then use it in template:

```vue
<template>
  <button v-download-data="`some text`">Download!</button>
</template>
```

## Data type

If type is provided it will be used as the mimetype:
```vue
<template>
  <button v-download-data="`{'example':'some text'}`" v-download-data:type="'json'">Download!</button>
</template>
```

If an object or array (instead of a string) is provided and the type is 'csv', 'tsv' or 'json', the object/array will be converted (json will be convert using JSON.stringify, csv/tsv is assuming an array and will be iterated)
```vue
<template>
  <button v-download-data="myObject" v-download-data:type="'json'">Download!</button>
</template>
```

## File name

If filename is provided it will be used as the downloaded file name:
```vue
<template>
  <button v-download-data="`{'example':'some text'}`" v-download-data:filename="'mydownload.json'">Download!</button>
</template>
```
