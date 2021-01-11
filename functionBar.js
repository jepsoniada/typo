const strHtml = `<div id='qweqwe'><input placeholder='not search bar yet'/></div>`;
let temp = document.createElement("template")
temp.innerHTML = strHtml
document.body.appendChild(temp.content.firstChild)