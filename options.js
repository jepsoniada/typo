(async () => {
    console.log(chrome)
    await chrome.storage.sync.set({'owo': 'd'}, () => console.log("done"))
    let valfromstorage = await (new Promise(async (res, rej) => {
        await chrome.storage.sync.get("owo", out => res(out))
    }))
    document.querySelector("#scriptinput").innerText = valfromstorage["owo"]
})()