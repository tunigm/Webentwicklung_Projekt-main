<?php
session_start();

$db_host = $_ENV["DB_HOST"];
$db_database = $_ENV["DB_DATABASE"];
$db_user = $_ENV["DB_USER"];
$db_password = $_ENV["DB_PASSWORD"];

$conn = new mysqli($db_host, $db_user, $db_password, $db_database);

if ($conn->connect_error) {
    die(json_encode(array("success" => false, "message" => "Verbindung zur Datenbank fehlgeschlagen")));
}

$response = array();

if(isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $sql = "SELECT * FROM User WHERE id = '$user_id'";
    
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $response["success"] = true;
        $response["userData"] = $row;
    } else {
        $response["success"] = false;
        $response["message"] = "Benutzerdaten nicht gefunden";
    }
} else {
    $response["success"] = false;
    $response["message"] = "Nicht eingeloggt";
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>
