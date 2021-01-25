// btw 
// you can use Object.assign({}, toCopy: object) to copy value instead of for..in

// ### example:

// let focusedScript = {focused: ""}
// scriptsCache = Object.assign({}, focusedScript)

// now scriptsCache is independent of focusedScript

// ### your previous method:

// let focusedScript = {focused: ""}
// scriptsCache = new Object()
// for (key in focusedScript) {
//     scriptsCache[key] = focusedScript[key]
// }

// change it please ::))

let scriptsCache = new Object()
const focusedScript = {focused: ""}

const scriptDefaults = {
    options: `chrome.runtime.sendMessage({type: "openOptions"})`
}
// checks is (<input>) inputNode.value is banned then edits outputNode.[innerText, style.display] and returns boolean
function returnAndDisplayIsValueBanned(inputString, outputNode) {
    console.log("returnAndDisplayIsValueBanned")
    console.log(inputString)
    for (i in scriptDefaults) {
        if (i == inputString) {
            console.log("found it!!!")
            outputNode.style.display = "grid"
            outputNode.innerText = `name "${inputString}" is banned`
            return true
        }
    }
    outputNode.style.display = "none"
    return false
}

function removeDisplay() {
    const value = document.querySelector("#scriptName input").value

    if (Object.keys(scriptsCache).find(e => e == value) == undefined) {
        document.querySelector("#removeScript").style.display = "none"
    } else {
        document.querySelector("#removeScript").style.display = "inline-block"
        focusedScript.focused = value
    }
    // inline-block | none
}

function scriptHeadReactionForClick(link) {
    console.log(link, ':', scriptsCache[link], '\n')
    focusedScript.focused = link
    document.querySelector("#scriptName input").value = link
    document.querySelector("#fileinput input[type='file").value = ""
    document.querySelector("#scriptText").innerText = scriptsCache[link]
    removeDisplay()
    updateScriptNameAlert(true)
    if (document.querySelector("#scriptText").hasAttribute("noval")) {
        document.querySelector("#scriptText").removeAttribute('noval')
    }
}

async function sideBarFill(change) {
    console.log("STORAGE_UPDATE::")
    console.log(change)
    new Promise((res, rej) => {
        chrome.storage.sync.get(null, val => res(val))
    }).then( valfromstorage => {
        // for (key in valfromstorage) {
        //     scriptsCache[key] = valfromstorage[key]
        // }
        scriptsCache = new Object()
        for (key in valfromstorage) {
            console.log(key.search(/TYPO_PRIVATE/gi))
            if (key.search(/TYPO_PRIVATE/gi) < 0) {
                scriptsCache[key] = valfromstorage[key]
            }
        }
        console.log("scriptsCache: ", scriptsCache)
        // scriptsCache = valfromstorage
        document.querySelector("#sidebar #scriptList").innerHTML = ''
        console.log(JSON.stringify(scriptsCache))
        Object.keys(scriptsCache).forEach(elem => {
            if (elem.search(/TYPO_PRIVATE/) < 0) {
                const tempStr = `<div class="scriptHead" onclick="scriptHeadReactionForClick(\'${elem}\')"></div>`
                console.log(elem)
                let temp = document.createElement("template")
                temp.innerHTML = tempStr
                temp.content.firstChild.innerText = elem
                document.querySelector("#sidebar #scriptList").appendChild(temp.content.firstChild)
            }
        })
        if (Object.keys(change).length == 1) {
                focusedScript.focused = ""
                removeDisplay()
        }
    })
}

// actually can change on update; that can be updated
chrome.storage.sync.onChanged.addListener(sideBarFill)

// inits change event after page load
document.addEventListener('readystatechange', () => {
    if (document.readyState == "complete") {
        chrome.storage.sync.set({"TYPO_PRIVATE dummyinit": Math.random()})
    }
})

// file input to text convertion
document.querySelector("#fileinput input").addEventListener("input", e => {
    let file = e.target.files[0]
    
    const textblob = new Blob([file])
    textblob.text().then(text => document.querySelector("#scriptText").innerText = text)

    // const reader = new FileReader();
    // reader.addEventListener('load', (event) => {
    //     console.log(event.target.result);
    // })
    // reader.readAsText(file)
})

function isScriptDataFilled () {
    // let arr = [document.querySelector("#scriptName input").value.length > 0, (document.querySelector("#fileinput input[type='file").value.length > 0 || document.querySelector("#scriptText").innerText.length > 0), document || false]
    // const [isNameAdded, isFileAdded, isNameBanned] = arr
    const [ isNameAdded, isFileAdded, isNameBanned ] = [
        document.querySelector("#scriptName input").value.length > 0,
        document.querySelector("#fileinput input[type='file").value.length > 0 || document.querySelector("#scriptText").innerText.length > 0,
        returnAndDisplayIsValueBanned(document.querySelector("#scriptName input").value, document.querySelector("#name .hintBox"))
    ]
    // if (document.querySelector("#scriptName input").value.length > 0 && (document.querySelector("#fileinput input[type='file").value.length > 0 || document.querySelector("#scriptText").innerText.length > 0)) {
    if (isNameAdded && isFileAdded && !isNameBanned) {
        return true
    } else {
        return false
    }
}

function scriptInputClear() {
    document.querySelector("#scriptName input").value = ""
    document.querySelector("#fileinput input[type='file").value = ""
    document.querySelector("#scriptText").innerText = ''
}

// uploads script to storage
document.querySelector("#uploadScript").addEventListener("click", async () => {
    if (isScriptDataFilled()) {
        const objToSet = new Object({[document.querySelector("#scriptName input").value]: document.querySelector("#scriptText").innerText})
        // objToSet[document.querySelector("#scriptName input").value] = document.querySelector("#scriptText").innerText
        await chrome.storage.sync.set(objToSet)
        scriptInputClear()
        updateScriptNameAlert(!returnAndDisplayIsValueBanned(document.querySelector("#scriptName input").value, document.querySelector("#name .hintBox")))
        updateScriptFileAlert()
        removeDisplay()
    }
})

document.querySelector("#removeScript").addEventListener("mousedown", () => {
    console.log(`should remove`, focusedScript.focused)
    chrome.storage.sync.remove(focusedScript.focused, () => {
        // focusedScript.focused = ""
        // removeDisplay()
    })
    // chrome.storage.sync.set({"TYPO_PRIVATE dummyinit": Math.random()})
})

// function updateInputAlerts () {
//     if (document.querySelector("#scriptName input").value.length > 0) {
//         document.querySelector("#scriptName").removeAttribute("noval")
//     } else {
//         document.querySelector("#scriptName").setAttribute("noval", "")
//     }

//     // console.log(typeof document.querySelector("#fileinput input[type='file").value)
//     if (document.querySelector("#fileinput input[type='file").value.length > 0) {
//         document.querySelector("#scriptText").removeAttribute("noval")
//     } else {
//         document.querySelector("#scriptText").setAttribute("noval", "")
//     }
// }

function updateScriptNameAlert (boolVal) {
    if (document.querySelector("#scriptName input").value.length > 0 && boolVal) {
        document.querySelector("#scriptName").removeAttribute("noval")
    } else {
        document.querySelector("#scriptName").setAttribute("noval", "")
    }
}

function updateScriptFileAlert() {
    if (document.querySelector("#fileinput input[type='file").value.length > 0) {
        document.querySelector("#scriptText").removeAttribute("noval")
    } else {
        document.querySelector("#scriptText").setAttribute("noval", "")
    }
}

// empty input info
document.querySelector("#scriptName input").addEventListener("input", () => {
    updateScriptNameAlert(!returnAndDisplayIsValueBanned(document.querySelector("#scriptName input").value, document.querySelector("#name .hintBox")))
    removeDisplay()
})
document.querySelector("#fileinput input[type='file").addEventListener('input', () => {
    updateScriptFileAlert()
})

// document.addEventListener("input", () => {
//     updateScriptNameAlert()
//     updateScriptFileAlert()
// })

// "showing" add script page
document.querySelector("#addScreenBtn").addEventListener("click", () => {
    scriptInputClear()
    updateScriptNameAlert(true)
    updateScriptFileAlert()
})