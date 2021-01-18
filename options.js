new Promise(async (res, rej) => {
    await chrome.storage.sync.get(null, val => res(val))
}).then( valfromstorage => console.log(valfromstorage))

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