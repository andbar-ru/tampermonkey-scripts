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
        if (diffContents.length !== 2) {
            throw new Error('diffContents.length !== 2')
        }
        return diffContents[0].style.display === 'none'
    }

    // 'collapse' | 'expand' | 'undefined'
    let action = 'undefined'

    try {
        document.querySelectorAll('.diff-file').forEach((diffFile, i) => {
            const collapsed = isCollapsed(diffFile)
            if (i === 0) {
                if (collapsed) {
                    action = 'expand'
                } else {
                    action = 'collapse'
                }
            }
            const fileTitle = diffFile.querySelector('.js-file-title')
            if (!fileTitle) {
                throw new Error("can't find '.js-file-title'")
            }
            if ((collapsed && action === 'expand') || (!collapsed && action === 'collapse')) {
                fileTitle.click()
            }
        })
    } catch(err) {
        alert(err)
        return
    }
})()