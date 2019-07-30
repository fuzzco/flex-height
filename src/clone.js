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

export default { removeClone, clone }
