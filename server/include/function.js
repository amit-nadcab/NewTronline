const Userlevel = require('../models/user_level');
const User = require('../models/user');
const Transaction = require('../models/transtation_history');



// function Calculate_level_income(_username,_from_id,_package){
//     let username = "rahul123"; // _username; 
//     let from_id = "rahul"; // _from_id;
//     let package = "5000"; // _package;
//     let result = "";     
//     for(i=0;i<=3;i++){
//     // To find reffer --------------------------------------
//       result =  User.findOne({ username: username }).exec();

//         const Trancsaction = new Transaction({
//                   username : refferal_id,
//                   income_from_id : from_id,
//                   total_income : package
//                 });
//                Trancsaction.save();  

//      username = result.refferal_id; 
//      if(username == 'admin'){
//          break;
//      } 
//    }
// }

// function level_income(level){
//     if(level==1){
//         return 17;
//     }else
//     if(level==2){
//         return 8;
//     }else
//     if(level==3){
//         return 2;
//     }else
//     if(level==4){
//         return 2;
//     }else
//     if(level==5){
//         return 5;
//     }else
//     if(level==6){
//         return 3;
//     }else
//     if(level==7){
//         return 3;
//     }  
// }

	 
function update_active_member(username, user_id)
{
	const total_level = 20;
	for(a=1;a<=total_level;a++)
	{
        // $mstr="Select promoter_id from tbl_memberreg where member_user_id='$tmember_user_id'"; 
	    // $mresult=mysqli_query($connection,$mstr) or die(mysqli_error($connection));
		// while($mrow=mysqli_fetch_array($mresult))
		// {
		//     $promoter=$mrow['promoter_id']; 
        //    echo $sql2="Update tbl_member_level set active_member=active_member+1 where member_user_id='$promoter' and level_name=$a"; 
        //     mysqli_query($connection,$sql2); 
		// } 
		// $tmember_user_id=$promoter;
		// echo "success".$a;
	}   
} 

function insert_level(){
      
    for(i=1;i<=20;i++){
       const  UserLevel = new Userlevel({
           username : "rahul",
           user_id : "rahul",
           status : 0                     
         });
         UserLevel.save();  
   }
}



module.exports = {insert_level};