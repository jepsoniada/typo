import app from './src/app.pug'
import scriptDefaults from './ScriptDefaults.js'
console.log("bundled")

// let scriptsCache = new Object()
// for (let item in scriptDefaults) {
//     scriptsCache[item] = scriptDefaults[item]
// }
let scriptsCache = Object.assign({}, scriptDefaults)
const strHtml = app(new Object())

let temp = document.createElement("template")
temp.innerHTML = strHtml
document.body.appendChild(temp.content.firstChild)

const typo = {
    enabled: false,
    mode_value: "main",
    // main - base function selection
    // arg - for infect arguments to selected function in "main" mode
    mode (e) {
        switch (e) {
            case "main": {
                this.mode_value = "main"
                break
            }
            case "arg": {
                this.mode_value = "arg"
                break
            }
            default: {
                console.error("incorrect mode selected")
                break
            }
        }
    },

    sugestions: [],
    focused: 0,

    // at 0 function to exec. and beyound arguments
    funcWithArgsAcc: [],
    // same as above but with arg names
    funcConstructorData: [],
    // first on top
    argTips: [],

    updateModeDependDisplay () {
        switch (this.mode_value) {
            case "arg": {
                document.querySelector("#typo_scriptlist").style.display = "none"
                document.querySelector("#typo_arglist").style.display = "initial"
                break
            }
            case "main": {
                document.querySelector("#typo_scriptlist").style.display = "initial"
                document.querySelector("#typo_arglist").style.display = "none"
                break
            }
        }
    },

    updateDisplay () {
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

// let inputBuffor = []

// open menu
document.addEventListener("keyup",e => {
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
    //         document.querySelector("#typo_input_elem").value = ""
    //         typo.enabled = !1
    //         typo.updateDisplay()
    //     default: 
    //         inputBuffor.length = 0; break
    // }
    if (e.code == "KeyK" && e.ctrlKey && e.shiftKey) {
        new Promise((res, rej) => {
            chrome.storage.sync.get(null, items => res(items))
        }).then( valfromstorage => {
            scriptsCache = Object.assign({}, scriptDefaults)
            for (let key in valfromstorage) {
                if (key.search(/TYPO_PRIVATE/gi) < 0) {
                    scriptsCache[key] = valfromstorage[key]
                }
            }
            // console.log(scriptsCache)
            typo.enabled = true
            typo.updateDisplay()
            sugestionUpdate("")
            document.getElementById("typo_input_elem").focus()
        })
    } else if (e.key == "Escape") {
        document.querySelector("#typo_input_elem").value = ""
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

// chossing scripts handler
document.addEventListener("keydown", e => {
    console.log("just entry")
    if (typo.enabled) {
        console.log("in switch")
        switch (e.code) {
            case "ArrowUp": {
                if (typo.mode_value == 'main') {
                    e.preventDefault()
                    document.querySelector("#typo_scriptlist").children[typo.focused].classList.remove("focused")
                    if (typo.focused == 0) {
                        document.querySelector("#typo_scriptlist").children[typo.sugestions.length-1].classList.add("focused")
                        typo.focused = typo.sugestions.length-1
                    } else {
                        document.querySelector("#typo_scriptlist").children[typo.focused-1].classList.add("focused")
                        typo.focused -= 1
                    }
                }
                break
            }
            case "ArrowDown": {
                if (typo.mode_value == 'main') {
                    e.preventDefault()
                    document.querySelector("#typo_scriptlist").children[typo.focused].classList.remove("focused")
                    if (typo.focused == document.querySelector("#typo_scriptlist").childElementCount-1) {
                        document.querySelector("#typo_scriptlist").children[0].classList.add("focused")
                        typo.focused = 0
                    } else {
                        document.querySelector("#typo_scriptlist").children[typo.focused+1].classList.add("focused")
                        typo.focused += 1
                    }
                }
                break
            }
            case "Tab": {
                if (typo.mode_value == 'main') {
                    e.preventDefault()
                    // e.stopPropagation()  
                    document.querySelector("#typo_input_elem").value = typo.sugestions[typo.focused]
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
            //     document.querySelector("#typo_input_elem").value = ""
            //     typo.enabled = false
            //     typo.updateDisplay()
            //     break
            case "Enter": {
                // console.log(JSON.stringify(typo), '\n', Object.entries(typo), '\n', Object.assign({}, typo))
                // console.log(JSON.stringify(typo), '\n', JSON.parse(JSON.stringify(typo)))
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
                        document.querySelector("#typo_input_elem").value = ""
                        typo.funcWithArgsAcc.push(typo.sugestions[typo.focused])
                        typo.funcConstructorData.push(typo.sugestions[typo.focused])
                        typo.funcConstructorData.push(...innerArgs)
                        typo.argTips = [...innerArgs]
                        typo.updateModeDependDisplay()
                        typo.sugestions.length = 0
                    } else {
                        funcToCheck()
                        document.querySelector("#typo_input_elem").value = ""
                        typo.enabled = false
                        typo.updateDisplay()
                    }
                } else if (typo.mode_value == "arg") {
                    typo.funcWithArgsAcc.push(document.querySelector("#typo_input_elem").value)
                    if (typo.funcWithArgsAcc.length < typo.funcConstructorData.slice(1).length + 1) {
                        document.querySelector("#typo_input_elem").value = ""
                        console.log(typo)
                        break
                    }
                    let funcContent = scriptsCache[typo.funcConstructorData[0]].replace(/function\smain\s*\(.*\)\s*\{?/, '').replace(/\}\s*$/, '')
                    new Function(...typo.funcConstructorData.slice(1), funcContent)(...typo.funcWithArgsAcc.slice(1))

                    typo.funcWithArgsAcc = []
                    typo.funcConstructorData = []
                    typo.argTips = []
                    document.querySelector("#typo_input_elem").value = ""
                    typo.enabled = false
                    typo.updateDisplay()
                    typo.mode("main")
                    typo.updateModeDependDisplay()
                }
                // console.log(JSON.stringify(typo), '\n', Object.entries(typo), '\n', Object.assign({}, typo))
                // console.log(JSON.stringify(typo), '\n', Object.freeze(Object.assign({}, typo)))
                console.log(JSON.parse(JSON.stringify(typo)))
                break
            }
        }
    }    
})

// document.addEventListener("input", e => {
//     if (document.querySelector("#typo_input_elem").value == e.target.value ? Object.keys(scriptsCache) : false && typo.mode_value == "arg") {
//         sugestionUpdate(e.target.value)
//     }
// })
document.querySelector('#typo_input_elem').addEventListener("input", e => {
    if (typo.mode_value == "main") {
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