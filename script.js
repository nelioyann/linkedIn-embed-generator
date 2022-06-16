const APP = {
  code: null,
  input: null,
  elPreview: document.querySelector(".preview"),
  elCode: document.querySelector(".code"),
  elInput: document.querySelector(".generator_input"),
  elForm: document.querySelector(".generator"),
  elGenerated: document.querySelector(".generated"),
  elCopier: document.querySelector(".copier"),
  elPreviewer: document.querySelector(".previewer"),
  elDialog: document.querySelector("#dialog"),
  init() {
    APP.elForm.addEventListener("submit", APP.getInput);
    APP.elCopier.addEventListener("click", APP.copyCode);
    APP.elPreviewer.addEventListener("click", APP.showPreview);
    // const link = `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:6757299314709561344"  frameborder="0" allowfullscreen="" title="Post intégré"></iframe>`
  },
  getCode(postLink) {
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
        // console.log(`Found match, group ${groupIndex}: ${match}`);
        if (match.length > 3) {
          frame = `<span style="color: #008;">&lt;iframe</span> 
<span style="color: #606;">src=</span><span style="color: #080;">"https://www.linkedin.com/embed/feed/update/urn:li:activity:${match}"</span>
<span style="color: #008;">&gt;&lt;/iframe&gt;</span>`;
          code = `<iframe 
          src="https://www.linkedin.com/embed/feed/update/urn:li:activity:${match}" 
          frameborder="0" title="LinkedIn" scrolling="no">
          </iframe>`;
        }
      });
    }
    return {frame, code};
  },
  getInput(e) {
    e.preventDefault();
    APP.elDialog.showModal();
    try {
      plausible("Generated");
    } catch (e) {
      console.log(e);
    }
    console.log((window.ADS_BLOCKED = true));
    setTimeout(() => {
      APP.code = APP.getCode(APP.elInput.value).frame;
      APP.elPreview.innerHTML = APP.getCode(APP.elInput.value).code;
      APP.elCode.innerHTML = APP.code;
      // document.querySelector("[data-revealable]").dataset.revealable = "visible:true";
    }, 100);
    // APP.elGenerated.classList.remove("hidden");
    // console.log(APP.code);
  },
  copyCode() {
    navigator.clipboard.writeText(APP.code);
  },
  showPreview(){
    console.log("Display preview");
      document.querySelector(".preview_wrapper").dataset.revealable = "visible:true";

  }
};
document.addEventListener("DOMContentLoaded", APP.init);
