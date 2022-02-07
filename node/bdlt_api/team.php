<?php
$connection = $con = mysqli_connect("localhost", "root", "", "bdlt") or die("DB not connected");
if (isset($_SERVER['HTTP_ORIGIN'])) {

  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
$data = json_decode(trim(file_get_contents("php://input")), true);
$user = $data['user'];
$d_ref = "SELECT * FROM `Registration` WHERE referrer='$user'";
$direct = mysqli_query($con, $d_ref);
$i = 1;
$level = [];
$result = [];
$ttl = 0;
while ($udata = mysqli_fetch_assoc($direct)) {
  array_push($level, $udata['user']);
  //  $sql="SELECT Sum(amount) from `userIncome` where sender ='$udata[user]' and receiver='$user' and _for='level'";
  //  $re=mysqli_query($con,$sql);
  //  $s= mysqli_fetch_array($re);
  array_push($result, ["level" => "Level " . $i, "user_id" => $udata['userId'], "user" => $udata['user'], "registration_date" => date("Y-m-d", $udata['block_timestamp'])]);
}

$i++;

while ($i < 19) {
  $tmp = [];
  $ttl = 0;
  for ($j = 0; $j < count($level); $j++) {
    $d_ref = "SELECT * FROM `registration` WHERE referrer='$level[$j]'";
    $direct = mysqli_query($con, $d_ref);
    while ($udata = mysqli_fetch_assoc($direct)) {
      array_push($tmp, $udata['user']);
      // $sql="SELECT Sum(amount) from `userIncome` where sender ='$udata[user]' and receiver='$user' and _for='level'";
      // $re=mysqli_query($con,$sql);
      // $s= mysqli_fetch_array($re);
      // $ttl+=$s[0];
      array_push($result, ["level" => "Level " . $i, "user_id" => $udata['userId'], "user" => $udata['user'], "registration_date" => date("Y-m-d", $udata['block_timestamp'])]);
    }
  }

  $level = $tmp;
  $i++;
}
echo json_encode($result);
