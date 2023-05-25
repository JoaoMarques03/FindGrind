function openPopup(popupId) {
    var popup = document.querySelector("." + popupId);
    popup.style.display = "block";
  }
  
  function closePopup(popupId) {
    var popup = document.querySelector("." + popupId);
    popup.style.display = "none";
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    var buttons = document.getElementsByClassName("title-button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function() {
        var popupId = this.getAttribute("data-popup");
        openPopup(popupId);
      });
    }
  });