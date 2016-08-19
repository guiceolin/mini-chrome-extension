function copyToClipboard(text) {
  var copyDiv = document.createElement('div');
  copyDiv.contentEditable = true;
  document.body.appendChild(copyDiv);
  copyDiv.innerHTML = text;
  copyDiv.unselectable = "off";
  copyDiv.focus();
  document.execCommand('SelectAll');
  document.execCommand("Copy", false, null);
  document.body.removeChild(copyDiv);
}

function setIcon(tab, action, icon) {
  action.setIcon({
    path: icon + ".png",
    tabId: tab.id
  });
}

chrome.browserAction.onClicked.addListener(function(tab) {
  var original = tab.url

  fetch("http://m.ceol.in/urls.json", {
    method: 'post',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: 'original=' + original
  }).then(function(res) {return res.json()} ).then(function(response){
    copyToClipboard(response.url.short)
    setIcon(tab, chrome.browserAction, "done")
    setTimeout(function() { setIcon(tab, chrome.browserAction, 'favicon') }, 1000);
  }).catch(function(){
    console.log('oh noes')
  })
});
