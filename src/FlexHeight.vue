<template>
    <transition @enter="enter" @leave="leave" mode="out-in" :css="false">
        <slot />
    </transition>
</template>

<script>
import { tween, styler } from 'popmotion'

export default {
    methods: {
        data() {
            return {
                startingHeight: null
            }
        },
        enter(el, complete) {
            // get + measure parent, set up styler
            const parent = el.parentNode
            const { height } = parent.getBoundingClientRect()

            // manually set parent height, hide el
            parent.style.height = `${this.startingHeight}px`
            el.style.opacity = 0

            // Go 150px / sec
            const duration = Math.abs(height - this.startingHeight) / 0.15

            // animate height
            tween({
                from: this.startingHeight,
                to: height,
                duration: Math.min(duration, 650)
            }).start({
                update: v => styler(parent).set('height', v),
                complete() {
                    // animate opacity
                    tween({
                        from: 0,
                        to: 1,
                        duration: 650
                    }).start({
                        update: val => styler(el).set('opacity', val),
                        complete() {
                            parent.style.height = null
                            complete()
                        }
                    })
                }
            })
        },
        leave(el, complete) {
            // save height before leaving
            const parent = this.$el
            const { height } = parent.getBoundingClientRect()
            this.startingHeight = height

            // fade out
            tween({
                from: 1,
                to: 0,
                duration: 200
            }).start({
                update: styler(el).set('opacity').set,
                complete
            })
        }
    }
}
</script>
