import scriptDefaults from '../ScriptDefaults.js'

let scriptsCache = new Object()
const focusedScript = {focused: ""}

// checks is (<input>) inputNode.value is banned then edits outputNode.[innerText, style.display] and returns boolean
function returnAndDisplayIsValueBanned(inputString, outputNode) {
    console.log("returnAndDisplayIsValueBanned")
    console.log(inputString)
    if (inputString.search(" ") > -1) {
        console.log("got spaces")
        outputNode.style.display = "grid"
        outputNode.innerText = `can't use spaces in nameing`
        return true
    }
    for (let i in scriptDefaults) {
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
        document.querySelector("#removeScript").style.display = "grid"
        focusedScript.focused = value
    }
    // grid | none
}

function scriptHeadReactionForClick(target) {
    let link = target.path.find(e => e.className == "scriptHead").innerText
    console.log(link, ':', scriptsCache[link], '\n')
    focusedScript.focused = link
    document.querySelector("#scriptName input").value = link
    // document.querySelector("#script-input input[type='file").value = ""
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
        scriptsCache = new Object()
        for (let key in valfromstorage) {
            console.log(key.search(/TYPO_PRIVATE/gi))
            if (key.search(/TYPO_PRIVATE/gi) < 0) {
                scriptsCache[key] = valfromstorage[key]
            }
        }
        console.log("scriptsCache: ", scriptsCache)
        document.querySelector("#sidebar #script-list").innerHTML = ''
        console.log(JSON.stringify(scriptsCache))
        Object.keys(scriptsCache).forEach(elem => {
            if (elem.search(/TYPO_PRIVATE/) < 0) {
                const tempStr = `<div class="scriptHead"></div>`
                console.log(elem)
                let temp = document.createElement("template")
                temp.innerHTML = tempStr
                temp.content.firstChild.innerText = elem
                temp.content.firstChild.addEventListener("click", scriptHeadReactionForClick)
                document.querySelector("#sidebar #script-list").appendChild(temp.content.firstChild)
            }
        })
        if (Object.keys(change).length == 1) {
                focusedScript.focused = ""
                removeDisplay()
        }
    })
}

chrome.storage.sync.onChanged.addListener(sideBarFill)

function isScriptDataFilled () {
    // let arr = [document.querySelector("#scriptName input").value.length > 0, (document.querySelector("#script-input input[type='file").value.length > 0 || document.querySelector("#scriptText").innerText.length > 0), document || false]
    // const [isNameAdded, isFileAdded, isNameBanned] = arr
    const [ isNameAdded, isFileAdded, isNameBanned ] = [
        document.querySelector("#scriptName input").value.length > 0,
        // document.querySelector("#script-input input[type='file").value.length > 0 || document.querySelector("#scriptText").innerText.length > 0,
        document.querySelector("#scriptText").innerText.length > 0,
        returnAndDisplayIsValueBanned(document.querySelector("#scriptName input").value, document.querySelector("#script-page .name .hintBox"))
    ]
    // if (document.querySelector("#scriptName input").value.length > 0 && (document.querySelector("#script-input input[type='file").value.length > 0 || document.querySelector("#scriptText").innerText.length > 0)) {
    if (isNameAdded && isFileAdded && !isNameBanned) {
        return true
    } else {
        return false
    }
}

function scriptInputClear() {
    document.querySelector("#scriptName input").value = ""
    // document.querySelector("#script-input input[type='file").value = ""
    document.querySelector("#scriptText").innerText = ''
}

function updateScriptNameAlert (boolVal) {
    if (document.querySelector("#scriptName input").value.length > 0 && boolVal) {
        document.querySelector("#scriptName").removeAttribute("noval")
    } else {
        document.querySelector("#scriptName").setAttribute("noval", "")
    }
}

function updateScriptFileAlert() {
    if (document.querySelector("#scriptText").innerText.length > 0) {
    // if (document.querySelector("#script-input input[type='file").value.length > 0 || document.querySelector("#scriptText").innerText.length > 0) {
        document.querySelector("#scriptText").removeAttribute("noval")
    } else {
        document.querySelector("#scriptText").setAttribute("noval", "")
    }
}

// empty input info
document.querySelector("#scriptName input").addEventListener("input", () => {
    updateScriptNameAlert(!returnAndDisplayIsValueBanned(document.querySelector("#scriptName input").value, document.querySelector("#script-page .name .hintBox")))
    removeDisplay()
})
// document.querySelector("#script-input input[type='file']").addEventListener('input', () => {
//     updateScriptFileAlert()
// })

// "showing" add script page
document.querySelector("#add-script-btn").addEventListener("click", () => {
    scriptInputClear()
    updateScriptNameAlert(true)
    updateScriptFileAlert()
    removeDisplay()
})

// inits change event after page load
document.addEventListener('readystatechange', () => {
    if (document.readyState == "complete") {
        sideBarFill(new Object())
    }
})

// file input to text convertion
document.querySelector("#file-upload input[type='file']").addEventListener("input", e => {
    let file = e.target.files[0]
    
    const textblob = new Blob([file])
    textblob.text().then(text => {
        document.querySelector("#scriptText").innerText = text
        updateScriptFileAlert()
    })
    // const reader = new FileReader();
    // reader.addEventListener('load', (event) => {
    //     console.log(event.target.result);
    // })
    // reader.readAsText(file)
})

document.querySelector("#scriptText").addEventListener("input", e => {
    updateScriptFileAlert()
})

// uploads script to storage
document.querySelector("#uploadScript input[type='button']").addEventListener("click", async () => {
    if (isScriptDataFilled()) {
        const objToSet = new Object({[document.querySelector("#scriptName input").value]: document.querySelector("#scriptText").innerText})
        await chrome.storage.sync.set(objToSet)
        scriptInputClear()
        updateScriptNameAlert(!returnAndDisplayIsValueBanned(document.querySelector("#scriptName input").value, document.querySelector("#script-page .name .hintBox")))
        updateScriptFileAlert()
        removeDisplay()
    }
})

// removes script to storage
document.querySelector("#removeScript input[type='button']").addEventListener("click", () => {
    console.log(`should remove`, focusedScript.focused)
    chrome.storage.sync.remove(focusedScript.focused, () => {})
})