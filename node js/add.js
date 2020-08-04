
const vs = require('./vision.js')
function createDiv(x, y, w, h, text) {
    var testDiv = document.getElementById("img")
        x = parseInt(x)
        x += testDiv.offsetLeft

        y = parseInt(y)
        y += testDiv.offsetTop

    console.log(x,y)

    var div = document.createElement("div");
    div.style.display = "grid"
    div.style.placeItems = "center"
    div.style.textAlign = "center"
    div.style.width = w + "px"
    div.style.height = h + "px"
    div.style.left = x + "px"
    div.style.top = y + "px"
    div.style.position = "absolute"

    div.style.fontSize = ".7rem";
    
    div.innerHTML = text;
    
    document.getElementById("mainDiv").appendChild(div);
};

function createImage(path) {
    var img = document.createElement("img");
    img.src = path
    //img.style.position = "fixed"
    //img.style.position = "absolute"
   // img.style.left = "0px"
   // img.style.top = "0px"
    img.style.zIndex = "-1"
    img.id = "img"

    document.getElementById("mainDiv").appendChild(img);
};

function convertCSVToJSON(str, delimiter = ',') {
    const titles = str.slice(0, str.indexOf('\n')).split(delimiter);
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');
    return rows.map(row => {
        const values = row.split(delimiter);
        return titles.reduce((object, curr, i) => (object[curr] = values[i], object), {})
    });
};



  

window.onload = function () {
    data = ""
    createImage("holas.png")
   
    document.getElementById('file-selector').addEventListener('change', function () {

        var fr = new FileReader();
        fr.onload = function () {
            //document.getElementById('output').textContent = fr.result;
            data = fr.result
            df = convertCSVToJSON(data)
            console.log(df)
            for (let i = 0; i < df.length; i++) {  
                createDiv(df[i].x, df[i].y, df[i].w, df[i].h, df[i].txt);
            }
            
            //x = getdata('img\\img4.png');
           // console.log(x);
            
        }
        fr.readAsText(this.files[0]);
       
    })
};
