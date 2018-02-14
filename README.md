# v-download
Vue.js directive to download (and optionally transform) data

#### Install

For browser usage, import the component by adding a src tag in the header (<head>):
`<script src="https://unpkg.com/v-download@1.0.4/dist/main.js">`

For Node usage, install the timeline map package using NPM
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
  <button v-download-data="`{'example':'some text'}`" v-download-data:type="application/json">Download!</button>
</template>
```

If an object, array is provided and the type is 'csv' or 'json', the object/array will be converted (json will be convert using JSON.stringify, csv is assuming an array and will be iterated)
```vue
<template>
  <button v-download-data="myObject" v-download-data:type="json">Download!</button>
</template>
```

