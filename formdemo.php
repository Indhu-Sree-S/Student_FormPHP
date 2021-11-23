<?php

	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    include("connect.php");
	$input  = file_get_contents('php://input');
    $data = json_decode($input,true);
	$message = array();
		
    $GetAllData = "SELECT * FROM formdemo ORDER BY StudentRegNo ASC";

	if(isset($data['mode'])){
		$mode = $data['mode'];
		if($mode=='All'){
			$AllData = ToGetData($connection, $GetAllData);
			$message['status'] = $AllData->status;
			$message['Data'] = $AllData->data;
		}
		elseif($mode=='SingleData'){
			$id = $data['id'];
			$GetSingleData = "SELECT * FROM `formdemo` WHERE `StudentRegNo`='$id'";
			$AllData = ToGetData($connection, $GetSingleData);
			$message['status'] = $AllData->status;
			$message['Data'] = $AllData->data;
		}
		elseif($mode=='Delete'){
			$id = $data['id'];
			$DeleteData = "DELETE FROM `formdemo` WHERE `StudentRegNo`='$id'";
			$result = $connection->query($DeleteData);
			if($result==true){
				$AllData = ToGetData($connection, $GetAllData);
				$message['status'] = $AllData->status;
				$message['Data'] = $AllData->data;
			}
			else{
				$message['status'] = false;
				$message['message'] = $connection->error;
			}
		}
		elseif($mode=='Add' || $mode=='Update'){
			$StudentName = $data['StudentName'];
			$StudentRegNo = $data['StudentRegNo'];
			$English = $data['English'];
			$Tamil = $data['Tamil'];
			$Maths = $data['Maths'];
			$Science = $data['Science'];
			$Social = $data['Social'];
			$Total = $data['Total'];
			$Average = $data['Average'];
			$GetData = 	"INSERT INTO formdemo(StudentName,StudentRegNo,English,Tamil,Maths,Science,Social,Total,Average) 
					VALUES('$StudentName','$StudentRegNo','$English','$Tamil','$Maths','$Science','$Social','$Total','$Average')";
			$UpdateData = "UPDATE `formdemo` SET `StudentName`='$StudentName',`English`='$English',`Tamil`='$Tamil',`Maths`='$Maths',`Science`='$Science',`Social`='$Social',`Total`='$Total',`Average`='$Average' WHERE `StudentRegNo`='$StudentRegNo'";
			$check =CheckData($StudentName,$StudentRegNo,$English,$Tamil,$Maths,$Science,$Social,$Total,$Average);
			if ($check)
			{
				$result=($mode=='Add') ? $connection->query($GetData) : $connection->query($UpdateData);
				if ( $result){
					http_response_code(200);
					$AllData = ToGetData($connection, $GetAllData);
					$message['status'] = $AllData->status;
					$message['Data'] = $AllData->data;
				}
				else{
					http_response_code(200);
					$message['status'] = false;
					$message['message'] = $connection->error;
				}
			}
			else{
				$message['status'] = false;
				$message['Message'] = 'Invalid Entry';
			}
		}
	}
	else{
		$message['status'] = false;
		$message['Message'] = 'Some Variables are Missing';
	}

	

	function CheckData($StudentName,$StudentRegNo,$English,$Tamil,$Maths,$Science,$Social,$Total,$Average){
		$check = is_string($StudentName) && is_numeric($StudentRegNo) && is_numeric($English) && is_numeric($Tamil) && is_numeric($Maths) && is_numeric($Science)
				&& is_numeric($Social) && is_numeric($Total) && is_numeric($Average);
		return $check;
	}
	
	function ToGetData($connection , $GetData){
		$result1 = $connection->query($GetData);
		if($result1==true){
			$i=0;
			if($result1->num_rows >0){
				while($row = $result1->fetch_assoc()){
					$AllData->data[$i] = $row;
					$i++;
				}
			}
			$AllData->status =true;
		}
		else{
			$AllData->status =false;
		}		
		return $AllData;
	}
		
	echo json_encode($message);

?>