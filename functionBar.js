const scriptDefaults = {
    options: `chrome.runtime.sendMessage({type: "openOptions"})`
}
// let scriptsCache = new Object()
let scriptsCache = new Object()
for (item in scriptDefaults) {
    scriptsCache[item] = scriptDefaults[item]
}

const strHtml = 
    `<div id="typo">
    <div id="typo_appbar">
        <div id="typo_input"><input id="typo_input_elem" placeholder="f" autocomplete="off" /></div>
        <div id="typo_options"><svg id="typo_options_icon">
                <g xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,0h24v24H0V0z" fill="none"></path>
                    <path
                        d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z">
                    </path>
                </g>
            </svg></div>
    </div>
    <div id="typo_scriptlist"></div>
</div>`;
let temp = document.createElement("template")
temp.innerHTML = strHtml
document.body.appendChild(temp.content.firstChild)

const typo = {
    enabled: false,
    sugestions: [],
    focused: 0,
    update () {
        document.getElementById("typo").style.display = this.enabled ? "flex" : "none"
    }
}
// const scripts = new Object()

// scripts["play"] = function () {
//     if (document.querySelectorAll("video").length > 0) {
//         document.querySelector("video").play()
//     }
// }

// scripts["pause"] = function () {
//     if (document.querySelectorAll("video").length > 0) {
//         document.querySelector("video").pause()
//     }
// }

// scripts["pause&play"] = function () {
//     if (document.querySelectorAll("video").length > 0) {
//         document.querySelector("video").pause()
//         document.querySelector("video").play()
//     }
// }

// scripts["alexa play despacito"] = function () {
//     window.open("https://youtu.be/J_bMArMJ-f8?t=26")
// }

let inputBuffor = []

// open menu
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
            document.querySelector("#typo_input_elem").value = ""
            typo.enabled = !1
            typo.update()
        default: 
            inputBuffor.length = 0; break
    }
    let anyShift = (inputBuffor.includes("ShiftLeft") || inputBuffor.includes("ShiftRight"))
    let anyControl = (inputBuffor.includes("ControlLeft") || inputBuffor.includes("ControlRight"))
    if (inputBuffor.includes("KeyK") && anyShift && anyControl) {
        new Promise((res, rej) => {
            chrome.storage.sync.get(null, items => res(items))
        }).then( valfromstorage => {
            scriptsCache = new Object()
            for (item in scriptDefaults) {
                scriptsCache[item] = scriptDefaults[item]
            }
            for (key in valfromstorage) {
                if (key.search(/TYPO_PRIVATE/gi) < 0) {
                    scriptsCache[key] = valfromstorage[key]
                }
            }
            // console.log(scriptsCache)
            typo.enabled = true
            typo.update()
            sugestionUpdate("")
            document.getElementById("typo_input_elem").focus()
            inputBuffor.length = 0
        })
        // new Promise((res, rej) => {
        //     chrome.storage.sync.get("owo", out => res(out))
        // }).then( valfromstorage => console.log(valfromstorage["owo"]))
    }
})

// chossing scripts handler
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
                document.querySelector("#typo_input_elem").value = typo.sugestions[typo.focused]
                sugestionUpdate(typo.sugestions[typo.focused])
                break
            case "Enter":
                try {
                    eval(scriptsCache[typo.sugestions[typo.focused]])
                } catch {
                    console.error("TYPO: something went wrong")
                }
                document.querySelector("#typo_input_elem").value = ""
                typo.enabled = !1
                typo.update()
                break
        }
    }    
})

document.addEventListener("input", e => {
    if (document.querySelector("#typo_input_elem").value == e.target.value ? Object.keys(scriptsCache) : false) {
        sugestionUpdate(e.target.value)
    }
})

function sugestionUpdate(strValue) {
    Array.from(document.querySelector("#typo_scriptlist").children).forEach(item => document.querySelector("#typo_scriptlist").removeChild(item))
    let funcPickComponentStr = `<div class="typo_scriptlist_script"></div>`
    let temp = document.createElement("template")
    typo.sugestions = Object.keys(scriptsCache).filter(item => {
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

document.querySelector("#typo_options").addEventListener("click", () => {
    chrome.runtime.sendMessage({type: "openOptions"})
})