const vision = require('@google-cloud/vision');
const { get } = require('http');



const client = new vision.ImageAnnotatorClient();

function getdimesions(vertices) {
  max_width = Math.abs(vertices[2].x-vertices[0].x)
  max_height = Math.abs(vertices[2].y-vertices[0].y)
  x = vertices[0].x
  y = vertices[0].y
  return [x,y,max_width, max_height]
}

client.textDetection('img\\img4.png').then(result => {

  var dataPage =[]
  result[0].fullTextAnnotation.pages.forEach(block => {
    block.blocks.forEach(paragraphs => {
      //console.log(paragraphs);
      var word_text = ""
      paragraphs.paragraphs.forEach(word => {
        //console.log(word)
        word.words.forEach(symbol => {
          //console.log(symbol);   
          symbol.symbols.forEach(text => {
            //console.log(text.text)
            word_text+=text.text
          });
        });   
      });
      //console.log(word_textm);
      var data = getdimesions(paragraphs.boundingBox.vertices)
      //console.log(word_text,data);
      data.push(word_text)
      dataPage.push(data)

    });
  });
  console.log(dataPage)
  return dataPage
}).catch(err => {
  console.error('error ', err);
})

function getdata(path) {
  client.textDetection(path).then(result => {

    var dataPage =[]
    result[0].fullTextAnnotation.pages.forEach(block => {
      block.blocks.forEach(paragraphs => {
        //console.log(paragraphs);
        var word_text = ""
        paragraphs.paragraphs.forEach(word => {
          //console.log(word)
          word.words.forEach(symbol => {
            //console.log(symbol);   
            symbol.symbols.forEach(text => {
              //console.log(text.text)
              word_text+=text.text
            });
          });   
        });
        //console.log(word_textm);
        var data = getdimesions(paragraphs.boundingBox.vertices)
        //console.log(word_text,data);
        data.push(word_text)
        dataPage.push(data)
  
      });
    });
    console.log(dataPage)
    return dataPage
  }).catch(err => {
    console.error('error ', err);
  })
}
exports.getdata;