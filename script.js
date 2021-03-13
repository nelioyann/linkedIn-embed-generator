// let url = window.location.href ;
// // alert(url) 
// console.log(url)


let urn = ""

// const link = `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:6757299314709561344"  frameborder="0" allowfullscreen="" title="Post intégré"></iframe>`


const regex = /(\d+)/gm;

const str = window.location.href;
let m;

while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
        urn = match;
        let code  = `https://www.linkedin.com/embed/feed/update/urn:li:activity:${match}`;
        navigator.clipboard.writeText(code);
        console.log(str);

    });
}
