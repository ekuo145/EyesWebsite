window.onscroll = function() {scrollFunction()};
  
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("back-to-top").classList.add("show");
  } else {
    document.getElementById("back-to-top").classList.remove("show");
  }
}

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}