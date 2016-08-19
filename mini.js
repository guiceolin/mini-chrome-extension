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
    chrome.browserAction.setIcon({
      path: "done.png",
      tabId: tab.id
    });
  }).catch(function(){
    console.log('oh noes')
  })
});
