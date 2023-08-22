<?php
$db_host = $_ENV["DB_HOST"];
$db_database = $_ENV["DB_DATABASE"];
$db_user = $_ENV["DB_USER"];
$db_password = $_ENV["DB_PASSWORD"];

$conn = new mysqli($db_host, $db_user, $db_password, $db_database);

if ($conn->connect_error) {
    die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
}

$response = array();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT); // Sicher verschlüsseltes Passwort
    $street = $_POST["street"];
    $plz = $_POST["plz"];
    $location = $_POST["location"];
    $profile_picture = $_POST["profile_picture"]; 

        $sql = "INSERT INTO User (username, email, password, street, plz, location, profile_picture) VALUES ('$username', '$email', '$hashedPassword', '$street', '$plz', '$location', '$profile_picture')";

        if ($conn->query($sql) === TRUE) {
            $response["success"] = true;
            $response["message"] = "Daten erfolgreich gespeichert!";
        } else {
            $response["success"] = false;
            $response["message"] = "Fehler beim Speichern der Daten: " . $conn->error;
        }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>
