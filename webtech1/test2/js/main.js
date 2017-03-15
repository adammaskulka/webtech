
var text = document.getElementById('text').innerHTML;
var articles = indexes(text,"article");

//text = text.replace(/<[^>]*>/g, "");

function indexes(source, find) {
  var result = [];
  var length_find=find.length;
  var final;
  for (i = 0; i < source.length; ++i) {
    // If you want to search case insensitive use
    // if (source.substring(i, i + find.length).toLowerCase() == find) {
    if (source.substring(i, i + find.length) == find) {
      result.push(i);
    }
  }
  return result;
}

function replace() {

  var str = document.getElementById('input').value;
  var strLen = str.length;
  console.log(strLen);

  var res = indexes(text, str);

  for(i=0;i<res.length;i++) {
    text = text.substr(0,res[i]) + '<span id="span">'+str+'</span>' + text.substr(res[i]+strLen);
  }
  console.log(text);

document.getElementById("text").innerHTML = text;
}

// var res = indexes(text, "ipsum");
//
// for(i=0;i<4;i++) {
//   cut(text,res[i],res[i]+5);
// }

// for(i=0;i<res.length;i++) {
//   var ahoj = str.fontcolor('yellow');
//   text = text.replace("ipsum",ahoj);
//   document.getElementById("text").innerHTML = text;
// }
