var user        =   document.getElementById('user');
var address     =   document.getElementById('address');
var btn         =   document.getElementById('btn');
var massage     =   document.getElementById('massage');
var cnic        =   document.getElementById('cnic');
var phone       =   document.getElementById('phone');
var person      =   [];
// $.get('http://localhost:3000/get-data','hi', data=>{
//     console.log(person)
//     person = JSON.parse(data)
//     console.log(person)

// } )

function add(){

if(user.value == ''){
    massage.innerHTML = 'pls type name';
    massage.style.color = 'red';
}else if(address.value == ''||address.value == undefined||address.value == null){
    massage.innerHTML = 'pls type address';
    massage.style.color = 'red';
}else if(cnic.value == ''||cnic.value == undefined||cnic.value == null){
    massage.innerHTML = 'pls type CNIC';
    massage.style.color = 'red';
}else if(phone.value == ''||phone.value == undefined||phone.value == null){
    massage.innerHTML = 'pls type phone';
    massage.style.color = 'red';
}else{
var personData = {name:null,address:null,phone:null,cnic:null,gender:null,profession:null};
personData.cnic = cnic.value;
personData.phone= phone.value;
personData.name = user.value;
personData.address = address.value;
var radios = document.getElementsByName("gender");
for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
        console.log(radios[i].value)
        personData.gender = radios[i].value;
        break
    }
}
var selectBoxes = document.getElementById("pro");
for (var i = 0; i < selectBoxes.length; i++) {
    if (selectBoxes[i].selected) {
        console.log(selectBoxes[i].value)
        personData.profession = selectBoxes[i].value;
        break
    }
}
$.post('http://localhost:3000/add',personData,function(res){
    massage.innerHTML = res[0];
    massage.style.color = res[1]==200?'green':'red';
})
    // person.push(personData);
    // console.log(person)

    // // localStorage.person = JSON.stringify(person);
    // massage.innerHTML = 'Submitted';
    // massage.style.color = 'green';
};
console.log(personData);
}
function rander(){
    var containe = document.getElementById('contain')
    containe.innerHTML = '';
        containe.innerHTML  += `
    <tr>
        <th>index</th>
        <th>name</th>
        <th>address</th>
        <th>profession</th>
        <th>cnic</th>
        <th>phone</th>
        <th>gender</th>
        <th>Delete</th>
    </tr>
        `;
    $.post('http://localhost:3000/get-data','hi',function(res){
        // console.log(res)
        person = res;
        console.log(person)


    for(i=0;i<person.length;i++){
        containe.innerHTML  += `
    <tr>
        <td>`+(i+1)+`</td>
        <td>`+person[i].name+`</td>
        <td>`+person[i].address+`</td>
        <td>`+person[i].profession+`</td>
        <td>`+person[i].cnic+`</td>
        <td>`+person[i].phone+`</td>
        <td>`+person[i].gender+`</td>
        <td><input type="submit" class="btn btn-danger" onclick="delet(`+i+`)" value="delete"></td>
    </tr>
        `;
    };
    })
}
function delet(obj){
    console.log(obj)

 $.post('http://localhost:3000/splic',{ind: obj},function(res){
    console.log('res')
    rander();
 })
}
