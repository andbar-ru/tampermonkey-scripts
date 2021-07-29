// ==UserScript==
// @name         Gitlab: toggle all diffs
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Toggles all files on a GitLab merge request diff page
// @author       Andrey Bartashevich
// @match        http://git.int.kronshtadt.ru/*
// @icon         https://www.google.com/s2/favicons?domain=kronshtadt.ru
// @grant        none
// ==/UserScript==

(function() {
    'use strict'

    function isCollapsed(diffFile) {
        const diffContents = diffFile.querySelectorAll('.diff-content')
        if (diffContents.length < 2) {
            throw new Error('diffContents.length < 2')
        }
        return diffContents[0].style.display === 'none'
    }

    function toggle(diffFile, action) {
        const diffContents = diffFile.querySelectorAll('.diff-content')
        if (diffContents.length < 2) {
            throw new Error('diffContents.length < 2')
        }
        diffContents[0].style.display = (action === 'collapse' ? 'none' : '')
        diffContents[1].style.display = (action === 'collapse' ? '' : 'none')
    }

    // 'collapse' | 'expand' | 'undefined'
    let action = 'undefined'

    try {
        document.querySelectorAll('.diff-file').forEach((diffFile, i) => {
            if (i === 0) {
                const collapsed = isCollapsed(diffFile)
                if (collapsed) {
                    action = 'expand'
                } else {
                    action = 'collapse'
                }
            }
            toggle(diffFile, action)
        })
    } catch(err) {
        alert(err)
        return
    }
})()