Flexible height transition for Vue. [Demo](https://fuzzco.github.io/flex-height/)

`npm i @fuzzco/flex-height`

[Register component in Vue](https://vuejs.org/v2/guide/components-registration.html), then:

```html
<template>
    <main>
        <flex-height>
            <!-- Any component with varying height can go here. -->
            <!-- flex-height will wrap that component and adjust its height accordingly.-->
            <!-- Make sure you key the contents so the change registers! -->
            <img
                :src="imageSizes[imageSizes.length % currentIndex]"
                :key="currentIndex"
            />
        </flex-height>

        <button @click="currentIndex++">Next Image</button>
    </main>
</template>

<script>
    export default {
        data() {
            return {
                currentIndex: 0,
                imageSizes: ['300x300', '300x400', '300x500']
            }
        }
    }
</script>
```

## Options

| Prop        | Type   | Default | Notes                                                                                                                                                                                                   |
| ----------- | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wrapper`   | String | `div`   | Wrapper element for the entire `flex-height` component.<br/><br/>Structure goes: `<wrapper> -> <div.internal> -> <transition> -> <slot>`, where `div.internal` is the component that is actually sized. |
| `leaveTime` | Number | 200     | ms to fade out when transitioning.                                                                                                                                                                      |
