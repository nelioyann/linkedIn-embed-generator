const APP = {
  code: null,
  prettyCode: null,
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
    dialogPolyfill.registerDialog(APP.elDialog);
    // const link = `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:6757299314709561344"  frameborder="0" allowfullscreen="" title="Post intégré"></iframe>`
  },
  getCode(postLink) {
    const regex = /(\d+)/gm;
    let m;
    while ((m = regex.exec(postLink)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      m.forEach((match) => {
        if (match.length > 3) {
          prettyCode = 
`<span data-code="tag">&lt;div</span><span data-code="attr"> style=</span><span data-code="value" >"position:relative;overflow:hidden;padding-top:56.25%;"</span><span data-code="tag" >&gt;</span>
  <span data-code="tag">&lt;iframe</span> 
  <span data-code="attr"> frameborder=</span><span data-code="value">"0"</span>
  <span data-code="attr"> style=</span><span data-code="value">"position:absolute;top:0;left:0;width:100%;height:100%;border:0;"</span>
   <span data-code="attr">src=</span><span data-code="value">"https://www.linkedin.com/embed/feed/update/urn:li:activity:${match}"</span>
  <span data-code="tag">&gt;&lt;/iframe&gt;</span>
<span data-code="tag">&lt;/div&gt;</span>
`;



          code =
`<div style="position:relative;overflow:hidden;padding-top:56.25%;">
  <iframe
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    src="https://www.linkedin.com/embed/feed/update/urn:li:activity:${match}" 
    frameborder="0" title="LinkedIn">
  </iframe>
</div>`;
        }
      });
    }
    return {prettyCode, code};
  },
  getInput(e) {
    e.preventDefault();
    APP.elDialog.showModal();
    try {
      plausible("Generated");
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      APP.code = APP.getCode(APP.elInput.value).code;
      APP.prettyCode = APP.getCode(APP.elInput.value).prettyCode;
      APP.elPreview.innerHTML = APP.code;
      APP.elCode.innerHTML = APP.prettyCode;
    }, 100);

  },
  copyCode() {
    navigator.clipboard.writeText(APP.code).then(res => {
      alert("Embed code successfully copied");
    }).catch(err => {
      alert("Something went wrong, copy the code manually");
      plausible("Error on code copy")
    });
  },
  showPreview(){
      document.querySelector(".preview_wrapper").dataset.revealable = "visible:true";
  }
};
document.addEventListener("DOMContentLoaded", APP.init);
