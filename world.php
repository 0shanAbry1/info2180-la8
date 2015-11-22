<?php
  //String >> IP & UserName
  $hostname = getenv('IP'); 
  $user = getenv('C9_USER'); 
  //Establishing a connection with the database
  mysql_connect($hostname,$user);
  mysql_select_db("world");
  //Request variables >> Lookup button, true - If all countries to be displayed, Xml or not
  $LOOKUP = $_REQUEST['lookup'];
  $ALL = $_REQUEST['all'];
  $FORMAT = $_REQUEST['format'];
  
  if($ALL==true and $LOOKUP==null){ //If No Search criteria was entered
    # execute a SQL query on the database (ALL)
    $sql_all = "SELECT name,head_of_state FROM countries";
    $r_all = mysql_query($sql_all); //print $r_all; //Resource/Table set returned
  
    if($FORMAT == 'xml'){
      header("Content-type: text/xml");
      $strxml = '<countrydata>'; //Contains all country tags
    
      while ($rows = mysql_fetch_array($r_all)){ //Accessing the returned data
        $strxml .= '<country>';
        $strxml .= '<name>'.utf8_encode($rows["name"]).'</name>';
        $strxml .= '<ruler>'.utf8_encode($rows["head_of_state"]).'</ruler>';
        $strxml .= '</country>';
      } //Each tag >> Each country record
    
      $strxml .= '</countrydata>';
      $xml =  new SimpleXMLElement($strxml);
      echo $xml->asXML();
    }
    else{
      while ($rows = mysql_fetch_array($r_all)) { //Accessing the returned data
        ?><li> <?php echo $rows["name"]; ?>, ruled by <?php echo $rows["head_of_state"]; ?> </li><?php
      }
    }
  }
  else{ //If Search criteria (Name of Country) was entered
    # execute a SQL query on the database (LOOKUP)
    $sql_lkup = "SELECT * FROM countries WHERE name LIKE '%$LOOKUP%'";      
    $r_lkup = mysql_query($sql_lkup); //Resource/Table set returned
  
    # loop through each country
    while ($row = mysql_fetch_array($r_lkup)) { //Accessing the returned data
      ?><li> <?php echo $row["name"]; ?>, ruled by <?php echo $row["head_of_state"]; ?></li><?php
    }
  }
?>