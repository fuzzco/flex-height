<template>
    <main class="demo">
        <flex-height>
            <div
                class="flex-content"
                v-html="content[id % content.length]"
                :key="id"
            />
        </flex-height>

        <button class="button" @click="id++">
            Next Text
        </button>
    </main>
</template>

<script>
import FlexHeight from '../src/FlexHeight'

export default {
    components: {
        'flex-height': FlexHeight
    },
    data() {
        return {
            content: [
                'A single line of text.',
                'More<br/>lines<br/>of<br/>text.',
                'A couple lines<br/>of text.'
            ],
            id: 0
        }
    }
}
</script>

<style lang="scss">
.demo {
    text-align: center;
    margin-top: 100px;

    .flex-height {
        background: tomato;
        padding: 10px;
        color: white;
        font-family: sans-serif;
        max-width: 300px;
        margin: auto;
    }
    .button {
        margin-top: 50px;
    }
}
</style>
