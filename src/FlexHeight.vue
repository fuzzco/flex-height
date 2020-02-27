<template>
    <component :is="wrapper" class="flex-height">
        <div class="flex-height-internal" :style="{}" ref="wrapper">
            <transition
                @enter="enter"
                @leave="leave"
                mode="out-in"
                :css="false"
                :appear="appear"
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
let cloneEl

function removeClone() {
    if (cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild) {
        cloneEl.parentNode.removeChild(cloneEl)
    }
}

function clone(el) {
    // remove clone if it already exists
    removeClone()

    // clone element
    cloneEl = el.cloneNode(true)

    // hide clone
    cloneEl.style.position = 'absolute'
    cloneEl.style.opacity = 0
    cloneEl.style.height = 'initial'
    cloneEl.setAttribute('aria-hidden', 'true')

    // append clone
    el.parentNode.appendChild(cloneEl)

    return cloneEl
}

export default {
    props: {
        wrapper: {
            type: String,
            default: 'div'
        },
        leaveTime: {
            type: Number,
            default: 200
        },
        appear: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        data() {
            return {
                startingHeight: null
            }
        },
        enter(el, complete) {
            if (inProgressEnter) {
                inProgressEnter.pause()
                inProgressEnter = null
            }
            if (inProgressEnterComplete) {
                inProgressEnterComplete.pause()
                inProgressEnterComplete = null
            }

            // get + measure parent, set up styler
            const parent = clone(this.$refs.wrapper)

            const { height } = parent.getBoundingClientRect()
            removeClone()

            // prep styler
            const s = styler(this.$refs.wrapper)

            // manually set parent height, hide el
            this.$refs.wrapper.style.height = `${this.startingHeight}px`
            el.style.opacity = 0

            // Go 150px / sec
            const duration = Math.abs(height - this.startingHeight) / 0.15

            // animate height
            inProgressEnter = tween({
                from: this.startingHeight,
                to: height,
                duration: Math.min(duration, 650)
            }).start({
                update: v => s.set('height', v),
                complete() {
                    inProgressEnter = null
                    s.set('height', '')

                    // animate opacity
                    inProgressEnterComplete = tween({
                        from: 0,
                        to: 1,
                        duration: 650
                    }).start({
                        update: val => styler(el).set('opacity', val),
                        complete() {
                            inProgressEnterComplete = null
                            parent.style.height = null
                            complete()
                        }
                    })
                }
            })
        },
        leave(el, complete) {
            if (inProgressLeave) {
                inProgressLeave.pause()
            }
            if (inProgressEnter) {
                inProgressEnter.pause()
                inProgressEnter = null
            }
            if (inProgressEnterComplete) {
                inProgressEnterComplete.pause()
                inProgressEnterComplete = null
            }

            // save height before leaving
            const parent = this.$refs.wrapper
            const height = parseFloat(styler(parent).get('height'))

            this.startingHeight = height

            const s = styler(el)

            // fade out
            inProgressLeave = tween({
                from: parseFloat(s.get('opacity')),
                to: 0,
                duration: this.leaveTime
            }).start({
                update: v => s.set('opacity', v),
                complete: () => {
                    inProgressLeave = null
                    complete()
                }
            })
        }
    }
}
</script>

<style>
.flex-height-internal {
    transform: translateZ(0);
}
</style>
