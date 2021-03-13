

const APP = {
  code: null,
  init() {
    // let urn = ""

    // const link = `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:6757299314709561344"  frameborder="0" allowfullscreen="" title="Post intégré"></iframe>`
    let test = "https://www.linkedin.com/posts/association-prisme_local-accompagnement-associationprisme-activity-6775784238177390592-tGEg/"
    
  },
  getCode (postLink){
    const regex = /(\d+)/gm;
    let m;
    while ((m = regex.exec(postLink)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
        let urn = match;
        APP.code = `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:${match}"  frameborder="0" allowfullscreen="" title="Post intégré"></iframe>`;
      });
    }
  }
};
// document.addEventListener("DOMContentLoaded", APP.init);
