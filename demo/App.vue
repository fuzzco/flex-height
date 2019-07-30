<template>
    <main class="class">
        <div class="transition-wrapper">
            <flex-height>
                <div v-html="content[id % content.length]" :key="id" />
            </flex-height>
        </div>

        {{ id }}

        <button @click="id++">
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
.class {
}
</style>
