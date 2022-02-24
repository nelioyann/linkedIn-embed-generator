

const APP = {
  code: null,
  input: null,
  elPreview: document.querySelector(".preview"),
  elCode: document.querySelector(".code"),
  elInput:document.querySelector(".generator_input"),
  elForm:document.querySelector(".generator"),
  elGenerated:document.querySelector(".generated"),
  elCopier:document.querySelector(".copier"),
  init() {
    // let urn = ""
    APP.elForm.addEventListener("submit", APP.getInput)
    APP.elCopier.addEventListener("click", APP.copyCode)
    // const link = `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:6757299314709561344"  frameborder="0" allowfullscreen="" title="Post intégré"></iframe>`
    
  },
  getCode (postLink){
    const regex = /(\d+)/gm;
    let m;
    let frame;
    while ((m = regex.exec(postLink)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
        if(match.length > 3){
          
          frame = 
  `<iframe 
      src="https://www.linkedin.com/embed/feed/update/urn:li:activity:${match}" 
      frameborder="0" title="LinkedIn">
</iframe>`;
        }
      });
    }
    return(frame)
  },
  getInput(e){
    e.preventDefault();
    plausible("Generated");
    let test = "https://www.linkedin.com/posts/association-prisme_local-accompagnement-associationprisme-activity-6775784238177390592-tGEg/";
    APP.code = APP.getCode(APP.elInput.value)
    APP.elPreview.innerHTML = APP.code
    APP.elCode.innerText = APP.code
    APP.elGenerated.classList.remove("hidden")
    console.log(APP.code)
  },
  copyCode(){
    navigator.clipboard.writeText(APP.code);
    
  }
};
document.addEventListener("DOMContentLoaded", APP.init);
