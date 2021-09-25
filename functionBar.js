// TODO:
// add visual error handling
/// rework typo as anon class and move update functions to setters
/// maybe make methods in typo like "toVisualMainMode" and "toVisualArgMode" - changing all 

import app from './src/app.pug'
import scriptDefaults from './ScriptDefaults.js'
import style from './serchBarStyle.css'
console.log("bundled")

// let scriptsCache = new Object()
// for (let item in scriptDefaults) {
//     scriptsCache[item] = scriptDefaults[item]
// }
let scriptsCache = Object.assign({}, scriptDefaults)
const strHtml = app(new Object())

let temp = document.createElement("template")
temp.innerHTML = strHtml

document.body.append(
    (()=>{
        const typoRoot = document.createElement('div')
        typoRoot.id = "typo_root"
        typoRoot.style.position = "absolute"
        typoRoot.style.top = "0"
        typoRoot.style.zIndex = "99999"
        typoRoot.attachShadow({mode: 'open'})
        const inRootStyle = document.createElement("style")
        inRootStyle.innerText = style.toString()
        typoRoot.shadowRoot.append(inRootStyle)
        typoRoot.shadowRoot.append(temp.content.firstChild)
        return typoRoot
    })()
)
// document.body.appendChild(temp.content.firstChild)

const typo = {
    DOMInterface: document.querySelector("#typo_root").shadowRoot,

    enabled: false,
    mode_value: "main",
    // main - base function selection
    // arg - for infect arguments to selected function in "main" mode
    mode (e) {
        switch (e) {
            case "main": { this.mode_value = "main"; break }
            case "arg": { this.mode_value = "arg"; break }
            default: {
                console.error("incorrect mode selected"); break
            }
        }
    },

    sugestions: [],
    focused: 0,

    // at 0 function to exec. and beyound arguments
    funcWithArgsAcc: [],
    // same as above but with arg names
    funcConstructorData: [],
    // index for interating through funcConstructorData
    fcdItr: 0,
    // first on top
    argTips: [],

    updateModeDependDisplay () {
        switch (this.mode_value) {
            case "arg": {
                this.DOMInterface.querySelector("#scriptlist").style.display = "none"
                this.DOMInterface.querySelector("#arglist").style.display = "initial"
                this.DOMInterface.querySelector("#argument_count").style.display = "grid"
                this.DOMInterface.querySelector("#options").style.display = "none"
                break
            }
            case "main": {
                this.DOMInterface.querySelector("#scriptlist").style.display = "initial"
                this.DOMInterface.querySelector("#arglist").style.display = "none"
                this.DOMInterface.querySelector("#argument_count").style.display = "none"
                this.DOMInterface.querySelector("#options").style.display = "grid"
                break
            }
        }
    },

    updateNumOfArgsLeft () {
        this.DOMInterface.querySelector('#argument_count').innerText = `${this.fcdItr + 1} of ${this.funcConstructorData.slice(1).length}`
        this.fcdItr++
    },

    updateDisplay () {
        this.DOMInterface.querySelector("#typo").style.display = this.enabled ? "flex" : "none"
    }
}

// open menu
document.addEventListener("keyup", event => {
    // switch (e.code) {
    //     case "KeyK":
    //     case "ShiftLeft":
    //     case "ShiftRight":
    //     case "ControlLeft":
    //     case "ControlRight":
    //         if ((inputBuffor.filter(i => i == e.code)).length > 0) {
    //             inputBuffor.length = 0
    //         }
    //         inputBuffor.push(e.code)
    //         break
    //     case "Escape":
    //         document.querySelector("#input_elem").value = ""
    //         typo.enabled = !1
    //         typo.updateDisplay()
    //     default: 
    //         inputBuffor.length = 0; break
    // }
    if (event.code == "KeyK" && event.ctrlKey && event.shiftKey) {
        new Promise((res, rej) => {
            chrome.storage.sync.get(null, items => res(items))
        }).then( valfromstorage => {
            scriptsCache = Object.assign({}, scriptDefaults)
            for (let key in valfromstorage) {
                if (key.search(/TYPO_PRIVATE/gi) < 0) {
                    scriptsCache[key] = valfromstorage[key]
                }
            }
            typo.enabled = true
            typo.updateDisplay()
            sugestionUpdate("")
            typo.DOMInterface.querySelector("#input_elem").focus()
        })
    } else if (event.key == "Escape") {
        if (typo.mode_value == "arg") {
            typo.funcWithArgsAcc = []
            typo.funcConstructorData = []
            typo.argTips = []
            typo.mode("main")
            typo.fcdItr = 0
            typo.updateModeDependDisplay()
        } else if (typo.mode_value == "main") {}
        typo.DOMInterface.querySelector("#input_elem").value = ""
        typo.enabled = false
        typo.updateDisplay()
    }

    // let anyShift = (inputBuffor.includes("ShiftLeft") || inputBuffor.includes("ShiftRight"))
    // let anyControl = (inputBuffor.includes("ControlLeft") || inputBuffor.includes("ControlRight"))
    // if (inputBuffor.includes("KeyK") && anyShift && anyControl) {
    //     new Promise((res, rej) => {
    //         chrome.storage.sync.get(null, items => res(items))
    //     }).then( valfromstorage => {
    //         scriptsCache = Object.assign({}, scriptDefaults)
    //         for (let key in valfromstorage) {
    //             if (key.search(/TYPO_PRIVATE/gi) < 0) {
    //                 scriptsCache[key] = valfromstorage[key]
    //             }
    //         }
    //         // console.log(scriptsCache)
    //         typo.enabled = true
    //         typo.updateDisplay()
    //         sugestionUpdate("")
    //         document.getElementById("typo_input_elem").focus()
    //         inputBuffor.length = 0
    //     })
    //     // new Promise((res, rej) => {
    //     //     chrome.storage.sync.get("owo", out => res(out))
    //     // }).then( valfromstorage => console.log(valfromstorage["owo"]))
    // }
})

// choosing scripts handler
document.addEventListener("keydown", event => {
    console.log("just entry")
    if (typo.enabled) {
        event.stopPropagation();
        switch (event.code) {
            case "ArrowUp": {
                if (typo.mode_value == 'main') {
                    event.preventDefault()
                    typo.DOMInterface.querySelector("#scriptlist").children[typo.focused].classList.remove("focused")
                    if (typo.focused == 0) {
                        typo.DOMInterface.querySelector("#scriptlist").children[typo.sugestions.length-1].classList.add("focused")
                        typo.focused = typo.sugestions.length-1
                    } else {
                        typo.DOMInterface.querySelector("#scriptlist").children[typo.focused-1].classList.add("focused")
                        typo.focused -= 1
                    }
                }
                break
            }
            case "ArrowDown": {
                if (typo.mode_value == 'main') {
                    event.preventDefault()
                    typo.DOMInterface.querySelector("#scriptlist").children[typo.focused].classList.remove("focused")
                    if (typo.focused == typo.DOMInterface.querySelector("#scriptlist").childElementCount-1) {
                        typo.DOMInterface.querySelector("#scriptlist").children[0].classList.add("focused")
                        typo.focused = 0
                    } else {
                        typo.DOMInterface.querySelector("#scriptlist").children[typo.focused+1].classList.add("focused")
                        typo.focused += 1
                    }
                }
                break
            }
            case "Tab": {
                if (typo.mode_value == 'main') {
                    event.preventDefault()
                    typo.DOMInterface.querySelector("#input_elem").value = typo.sugestions[typo.focused]
                    sugestionUpdate(typo.sugestions[typo.focused])
                }
                break
            }
            // case "Enter":
            //     try {
            //         // regex for finding main func declaration
            //         // function\smain\s*\(.*\)\s*\{?

            //         let innerArgs = scriptsCache[typo.sugestions[typo.focused]].match(/function\smain\s*\((.*)\)\s*\{?/)[1].split(/,/)
            //         let funcContent = scriptsCache[typo.sugestions[typo.focused]].replace(/function\smain\s*\(.*\)\s*\{?/, '').replace(/\}\s*$/, '')
            //         let funcToCheck = new Function(...innerArgs, funcContent)
            //         console.log("funcToCheck = ", funcToCheck)
            //         console.log(funcToCheck.length)
                    
            //         if (funcToCheck.length > 0 && typo.mode_value == 'main') {
                        
            //         } else {
            //             funcToCheck.call(null)
            //         }

            //         // eval(
            //         //     scriptsCache[typo.sugestions[typo.focused]].concat("\nmain()")
            //         // )
            //     } catch (err) {
            //         // (e => {
            //         //     e.match(/^(.+):/)
            //         // })(err)
            //         console.error("TYPO: something went wrong\n\n", err)
            //     }
            //     document.querySelector("#input_elem").value = ""
            //     typo.enabled = false
            //     typo.updateDisplay()
            //     break
            case "Enter": {
                console.log(JSON.parse(JSON.stringify(typo)))
                if (typo.mode_value == "main") {
                    let innerArgs = scriptsCache[typo.sugestions[typo.focused]].match(/function\smain\s*\((.*)\)\s*\{?/)[1].split(/,/)
                    let funcContent = scriptsCache[typo.sugestions[typo.focused]].replace(/function\smain\s*\(.*\)\s*\{?/, '').replace(/\}\s*$/, '')
                    try {
                        new Function(...innerArgs, funcContent)
                    } catch (err) {
                        console.error("TYPO: can't declare given function\n", err)
                        break
                    }
                    let funcToCheck = new Function(...innerArgs, funcContent)
                    if (funcToCheck.length > 0) {
                        typo.mode("arg")
                        typo.DOMInterface.querySelector("#input_elem").value = ""
                        typo.funcWithArgsAcc.push(typo.sugestions[typo.focused])
                        typo.funcConstructorData.push(typo.sugestions[typo.focused])
                        typo.funcConstructorData.push(...innerArgs)
                        typo.fcdItr = 0
                        typo.updateNumOfArgsLeft()
                        typo.argTips = [...innerArgs]
                        typo.updateModeDependDisplay()
                        typo.sugestions.length = 0
                    } else {
                        funcToCheck()
                        typo.DOMInterface.querySelector("#input_elem").value = ""
                        typo.enabled = false
                        typo.updateDisplay()
                    }
                } else if (typo.mode_value == "arg") {
                    typo.funcWithArgsAcc.push(typo.DOMInterface.querySelector("#input_elem").value)
                    if (typo.funcWithArgsAcc.length < typo.funcConstructorData.slice(1).length + 1) {
                        typo.updateNumOfArgsLeft()
                        typo.DOMInterface.querySelector("#input_elem").value = ""
                        console.log(typo)
                        break
                    }
                    let funcContent = scriptsCache[typo.funcConstructorData[0]].replace(/function\smain\s*\(.*\)\s*\{?/, '').replace(/\}\s*$/, '')
                    try {
                        new Function(...typo.funcConstructorData.slice(1), funcContent)(...typo.funcWithArgsAcc.slice(1))
                    } catch (error) {
                        console.error("TYPO: function thrown error\n", error)
                    }

                    typo.funcWithArgsAcc = []
                    typo.funcConstructorData = []
                    typo.argTips = []
                    typo.DOMInterface.querySelector("#input_elem").value = ""
                    typo.enabled = false
                    typo.updateDisplay()
                    typo.mode("main")
                    typo.fcdItr = 0
                    typo.updateModeDependDisplay()
                }
                // console.log(JSON.stringify(typo), '\n', Object.entries(typo), '\n', Object.assign({}, typo))
                // console.log(JSON.stringify(typo), '\n', Object.freeze(Object.assign({}, typo)))
                console.log(JSON.parse(JSON.stringify(typo)))
                break
            }
        }
    }    
}, { capture: true })

// document.addEventListener("input", e => {
//     if (document.querySelector("#input_elem").value == e.target.value ? Object.keys(scriptsCache) : false && typo.mode_value == "arg") {
//         sugestionUpdate(e.target.value)
//     }
// })

typo.DOMInterface.querySelector("#input_elem").addEventListener("input", event => {
    if (typo.mode_value == "main") {
        sugestionUpdate(event.target.value)
    }
})

function sugestionUpdate(strValue) {
    Array.from(typo.DOMInterface.querySelector("#scriptlist").children).forEach(item => typo.DOMInterface.querySelector("#scriptlist").removeChild(item))
    let funcPickComponentStr = `<div class="scriptlist_script"></div>`
    let temp = document.createElement("template")

    let reg = new RegExp(strValue)
    typo.sugestions = Object.keys(scriptsCache)
        .filter(item => {
            // let reg = new RegExp(strValue)
            // return (item.match(reg) != null ? true : false)

            return (reg.test(item))
        })
        .sort((a, b) => {
            return a.match(reg)["index"] - b.match(reg)["index"]
        })
    for (const [i, value] of typo.sugestions.entries()) {
        temp.innerHTML += funcPickComponentStr
        temp.content.children[i].innerText = value
    }
    if (temp.content.children.length > 0) {
        temp.content.children[0].classList.add("focused")
        typo.focused = 0
    }
    Array.from(temp.content.children).forEach(elem => {
        typo.DOMInterface.querySelector("#scriptlist").appendChild(elem)
    })
}

typo.DOMInterface.querySelector("#options").addEventListener("click", () => {
    chrome.runtime.sendMessage({type: "openOptions"})
})