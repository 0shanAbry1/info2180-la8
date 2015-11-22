// JavaScript File

window.onload = function(){
    var ctrls = document.getElementById("controls");  // 'controls' is the div id, where new elements are to be added
    
    // Create checkboxes with their corresponding labels; assign different attributes to the elements and append them to the page
    var lbl1 = document.createElement("Label"); lbl1.innerHTML = "ALL";
    var cbx1 = document.createElement("input"); cbx1.setAttribute("type", "checkbox"); 
    cbx1.setAttribute("id", "all"); cbx1.setAttribute("name", "all"); cbx1.setAttribute("value", "all");
    ctrls.appendChild(lbl1); ctrls.appendChild(cbx1);
    
    var lbl2 = document.createElement("Label"); lbl2.innerHTML = "XML";
    var cbx2 = document.createElement("input"); cbx2.setAttribute("type", "checkbox"); 
    cbx2.setAttribute("id", "xml"); cbx2.setAttribute("name", "xml"); cbx2.setAttribute("value", "xml");
    ctrls.appendChild(lbl2); ctrls.appendChild(cbx2);
    
    document.getElementById("lookup").onclick = getData; // Listen for clicks on the button with id of lookup
 };
               
function getData(){
    var term = document.getElementById("term").value; // Gets the word entered into the input with id "term"
    
    // Validate checkboxes
    if (document.getElementById("all").checked){
        if(document.getElementById("xml").checked){
                new Ajax.Request('world.php?all=true&format=xml',{method: 'get',onSuccess: displayResult}); // Return all data using xml format
            } //Entire page updated
            else{
                new Ajax.Updater('result','world.php',{method: 'get', parameters:'?all=true'}); //(Location,(Method, Criteria))
            } //Div specified updated - Return all using echo
        }
    else{
        new Ajax.Updater({success:'result'},'world.php?lookup='+term,{method: 'get'}); //(Location, Criteria, Method)
    } //Div specified updated
}// Gets data from world.php
                
function displayResult(data){ //alert(data.responseText);
    var str= document.createElement('ol');  // Create an ordered list
                    
    var xml_data = data.responseXML;
    var countryA = xml_data.getElementsByTagName('name');
    var rulerA = xml_data.getElementsByTagName('ruler');

    for(var i = 0; i < countryA.length; i++){
        var lst = document.createElement('li'); // Create <li> tags
        var lstTxt = document.createTextNode(countryA[i].innerHTML + ", ruled by " + rulerA[i].innerHTML);  // The inner text         
        lst.appendChild(lstTxt); // Add text to <li>
        str.appendChild(lst); // Append <li> to <ol>
    } // For each country add an item (Name of country & ruler) to the list
    
    document.getElementById('result').appendChild(str); //Append to div with id result
 }
 