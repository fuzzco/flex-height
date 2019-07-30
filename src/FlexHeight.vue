<template>
    <component :is="wrapper" class="flex-height">
        <div class="flex-height-internal" ref="wrapper">
            <transition
                @enter="enter"
                @leave="leave"
                mode="out-in"
                :css="false"
            >
                <slot />
            </transition>
        </div>
    </component>
</template>

<script>
import { tween, styler } from 'popmotion'

let inProgressEnter, inProgressEnterComplete
let inProgressLeave

export default {
    props: {
        wrapper: {
            type: String,
            default: 'div'
        },
        leaveTime: {
            type: Number,
            default: 200
        }
    },
    methods: {
        data() {
            return {
                startingHeight: null
            }
        },
        enter(el, complete) {
            if (inProgressEnter && inProgressEnter.stop) {
                inProgressEnter.stop()
            }
            if (inProgressEnterComplete && inProgressEnterComplete.stop) {
                inProgressEnterComplete.stop()
            }

            // get + measure parent, set up styler
            const parent = this.$refs.wrapper
            const { height } = parent.getBoundingClientRect()

            // prep styler
            const s = styler(parent)

            // manually set parent height, hide el
            parent.style.height = `${s.get('height')}px`
            el.style.opacity = 0

            // Go 150px / sec
            const duration = Math.abs(height - this.startingHeight) / 0.15

            // animate height
            inProgressEnter = tween({
                from: s.get('height'),
                to: height,
                duration: Math.min(duration, 650)
            }).start({
                update: v => s.set('height', v),
                complete() {
                    // animate opacity
                    inProgressEnterComplete = tween({
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
            if (inProgressLeave && inProgressLeave.stop) {
                inProgressLeave.stop()
            }

            // save height before leaving
            const parent = this.$refs.wrapper
            const { height } = parent.getBoundingClientRect()
            this.startingHeight = height

            const s = styler(el)

            // fade out
            inProgressLeave = tween({
                from: s.get('opacity'),
                to: 0,
                duration: this.leaveTime
            }).start({
                update: v => s.set('opacity', v),
                complete
            })
        }
    }
}
</script>
