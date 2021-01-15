const strHtml = `<div id='typo_qweqwe'><div><input id="typo_input" placeholder='not search bar yet'/></div><div id='typo_scriptlist'></div></div>`;
let temp = document.createElement("template")
temp.innerHTML = strHtml
document.body.appendChild(temp.content.firstChild)

const scripts = new Object()

scripts["play"] = function () {
    if (document.querySelectorAll("video").length > 0) {
        document.querySelector("video").play()
    }
}

scripts["pause"] = function () {
    if (document.querySelectorAll("video").length > 0) {
        document.querySelector("video").pause()
    }
}

scripts["pause&play"] = function () {
    if (document.querySelectorAll("video").length > 0) {
        document.querySelector("video").pause()
        document.querySelector("video").play()
    }
}

let inputBuffor = []

document.addEventListener(`keydown`, e => {
    switch (e.code) {
        case "KeyK":
        case "ShiftLeft":
        case "ShiftRight":
        case "ControlLeft":
        case "ControlRight":
            if ((inputBuffor.filter(i => i == e.code)).length > 0) {
                inputBuffor.length = 0
            }
            inputBuffor.push(e.code)
            break
        case "Escape":
            document.getElementById("typo_qweqwe").style.display = "none"
        default: 
            inputBuffor.length = 0; break
    }
    let anyShift = (inputBuffor.includes("ShiftLeft") || inputBuffor.includes("ShiftRight"))
    let anyControl = (inputBuffor.includes("ControlLeft") || inputBuffor.includes("ControlRight"))
    if (inputBuffor.includes("KeyK") && anyShift && anyControl) {
        document.getElementById("typo_qweqwe").style.display = "flex"
        document.getElementById("typo_input").focus()
        inputBuffor.length = 0
    }
})

document.addEventListener("keydown", e => {
    if (document.querySelector("#typo_scriptlist").children.length > 0) {
        const focusedSugestions = Array.from(document.querySelector("#typo_scriptlist").children).findIndex(item => item == document.querySelector('#typo_scriptlist .focused'))
        switch (e.code) {
            case "ArrowUp":
                e.preventDefault()
                if (focusedSugestions != -1) {
                    document.querySelector("#typo_scriptlist").children[focusedSugestions].classList.remove("focused")
                    if (focusedSugestions == 0) {
                        document.querySelector("#typo_scriptlist").children[document.querySelector("#typo_scriptlist").childElementCount-1].classList.add("focused")
                    } else {
                        document.querySelector("#typo_scriptlist").children[focusedSugestions-1].classList.add("focused")
                    }
                }
                break
            case "ArrowDown":
                e.preventDefault()
                if (focusedSugestions != -1) {
                    document.querySelector("#typo_scriptlist").children[focusedSugestions].classList.remove("focused")
                    if (focusedSugestions == document.querySelector("#typo_scriptlist").childElementCount-1) {
                        document.querySelector("#typo_scriptlist").children[0].classList.add("focused")
                    } else {
                        document.querySelector("#typo_scriptlist").children[focusedSugestions+1].classList.add("focused")
                    }
                }
                break
        }
    }    
})

document.addEventListener("input", e => {
    if (document.querySelector("#typo_input").value == e.target.value ? Object.keys(scripts) : false) {
        Array.from(document.querySelector("#typo_scriptlist").children).forEach(e => document.querySelector("#typo_scriptlist").removeChild(e))
        let funcPickComponentStr = `<div class="typo_funcPick"></div>`
        let temp = document.createElement("template")
        let searched = Object.keys(scripts).filter(item => {
            let reg = new RegExp(e.target.value)
            return (item.match(reg) != null ? true : false)
        })
        for (const [i, v] of searched.entries()) {
            temp.innerHTML += funcPickComponentStr
            temp.content.children[i].innerText = v
        }
        if (temp.content.children.length > 0) {
            temp.content.children[0].classList.add("focused")
        }
        Array.from(temp.content.children).forEach(elem => {
            document.body.querySelector("#typo_scriptlist").appendChild(elem)
        })
    }
})