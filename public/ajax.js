function server(my)
{
  $.post('localHost:3000/add',personData,function(res,color){
    massage.innerHTML = res;
    // massage.style.color = 'red';
  })
  //  xmlhttp = new XMLHttpRequest();
  //  xmlhttp.open("GET","http://localhost:3000/"+my, true);
  //  xmlhttp.onreadystatechange=function(){
  //        if (xmlhttp.readyState==4 && xmlhttp.status==200){
  //          string=xmlhttp.responseText;
  //        }
  //  }
  //  xmlhttp.send();
}