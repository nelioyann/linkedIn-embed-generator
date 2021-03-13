const elCode = document.querySelector(".code");
const elFeedback = document.querySelector(".feedback");
elCode.addEventListener("click", ()=>{
  elFeedback.innerHTML = "code copied"
})