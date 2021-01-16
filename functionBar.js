const strHtml = `<div id='typo_qweqwe'><div><input id="typo_input" placeholder='not search bar yet'/></div><div id='typo_scriptlist'></div></div>`;
let temp = document.createElement("template")
temp.innerHTML = strHtml
document.body.appendChild(temp.content.firstChild)

const typo = {
    enabled: false,
    sugestions: [],
    focused: 0,
    update () {
        document.getElementById("typo_qweqwe").style.display = this.enabled ? "flex" : "none"
    }
}
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
            typo.enabled = false
            typo.update()
        default: 
            inputBuffor.length = 0; break
    }
    let anyShift = (inputBuffor.includes("ShiftLeft") || inputBuffor.includes("ShiftRight"))
    let anyControl = (inputBuffor.includes("ControlLeft") || inputBuffor.includes("ControlRight"))
    if (inputBuffor.includes("KeyK") && anyShift && anyControl) {
        typo.enabled = true
        typo.update()
        sugestionUpdate("")
        document.getElementById("typo_input").focus()
        inputBuffor.length = 0
    }
})

document.addEventListener("keydown", e => {
    if (typo.sugestions.length > 0 && typo.enabled) {
        switch (e.code) {
            case "ArrowUp":
                e.preventDefault()
                document.querySelector("#typo_scriptlist").children[typo.focused].classList.remove("focused")
                if (typo.focused == 0) {
                    document.querySelector("#typo_scriptlist").children[typo.sugestions.length-1].classList.add("focused")
                    typo.focused = typo.sugestions.length-1
                } else {
                    document.querySelector("#typo_scriptlist").children[typo.focused-1].classList.add("focused")
                    typo.focused -= 1
                }
                break
            case "ArrowDown":
                e.preventDefault()
                document.querySelector("#typo_scriptlist").children[typo.focused].classList.remove("focused")
                if (typo.focused == document.querySelector("#typo_scriptlist").childElementCount-1) {
                    document.querySelector("#typo_scriptlist").children[0].classList.add("focused")
                    typo.focused = 0
                } else {
                    document.querySelector("#typo_scriptlist").children[typo.focused+1].classList.add("focused")
                    typo.focused += 1
                }
                break
            case "Tab":
                e.preventDefault()
                // e.stopPropagation()  
                document.querySelector("#typo_input").value = typo.sugestions[typo.focused]
                sugestionUpdate(typo.sugestions[typo.focused])
                break
            case "Enter":
                scripts[typo.sugestions[typo.focused]]()
                document.querySelector("#typo_input").value = ""
                typo.enabled = !1
                typo.update()
                break
        }
    }    
})

document.addEventListener("input", e => {
    if (document.querySelector("#typo_input").value == e.target.value ? Object.keys(scripts) : false) {
        sugestionUpdate(e.target.value)
    }
})

function sugestionUpdate(strValue) {
    Array.from(document.querySelector("#typo_scriptlist").children).forEach(item => document.querySelector("#typo_scriptlist").removeChild(item))
    let funcPickComponentStr = `<div class="typo_funcPick"></div>`
    let temp = document.createElement("template")
    typo.sugestions = Object.keys(scripts).filter(item => {
        let reg = new RegExp(strValue)
        return (item.match(reg) != null ? true : false)
    })
    for (const [i, v] of typo.sugestions.entries()) {
        temp.innerHTML += funcPickComponentStr
        temp.content.children[i].innerText = v
    }
    if (temp.content.children.length > 0) {
        temp.content.children[0].classList.add("focused")
        typo.focused = 0
    }
    Array.from(temp.content.children).forEach(elem => {
        document.body.querySelector("#typo_scriptlist").appendChild(elem)
    })
}