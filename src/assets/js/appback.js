mui.back = function(){
  mui.toast('再按一次退出APP');
  var first = null;
  plus.key.addEventListener('backbutton', function() {
    first = new Date().getTime();
    setTimeout(function() {
      first = null;
    }, 1000);
    if (new Date().getTime() - first < 1000) {
      plus.runtime.quit();
    }
  }, false);
}
