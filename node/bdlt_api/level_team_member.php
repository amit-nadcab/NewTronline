<?php
$connection = $con = mysqli_connect("localhost", "bdlt_admin", "Nadcab@1234", "bdlt") or die("DB not connected");
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
    $sql = "SELECT Sum(amount) from `UserIncome` where sender ='$udata[user]' and receiver='$user' and _for='Level Income'";
    $re = mysqli_query($con, $sql);
    $s = mysqli_fetch_array($re);
    $ttl += $s[0];
  }
  array_push($result, ["required_member" => pow(2,$i) ,"level" => "Level " . $i, "total_member" => count($level), "total_income" => round($ttl / 1e18, 5)]);
  $i++;

  while ($i < 19) {
    $tmp = [];
    $ttl = 0;
    for ($j = 0; $j < count($level); $j++) {
      $d_ref = "SELECT * FROM `Registration` WHERE referrer='$level[$j]'";
      $direct = mysqli_query($con, $d_ref);
      while ($udata = mysqli_fetch_assoc($direct)) {
        array_push($tmp, $udata['user']);
        $sql = "SELECT Sum(amount) from `UserIncome` where sender ='$udata[user]' and receiver='$user' and _for='Level Income'";
        $re = mysqli_query($con, $sql);
        $s = mysqli_fetch_array($re);
        $ttl += $s[0];
      }
    }
    array_push($result, ["required_member" => pow(2,$i) ,"level" => "Level " . $i, "total_member" => count($tmp), "total_income" => round($ttl / 1e18, 5)]);
    $level = $tmp;
    $i++;
  }
  echo json_encode($result);