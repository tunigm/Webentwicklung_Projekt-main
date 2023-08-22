<?php
session_start();

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
    $password = $_POST["password"];

    $sql = "SELECT * FROM User WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row["password"])) {
            // Benutzer erfolgreich angemeldet
            $_SESSION['user_id'] = $row['id']; // Speichere die user_id in der Session
            $response["success"] = true;
            $response["message"] = "Erfolgreich angemeldet!";
            header("Location: ../index.html"); // Weiterleitung zur index.html-Seite
            exit; 
        } else {
            // Anmeldeversuch fehlgeschlagen
            $response["success"] = false;
            $response["message"] = "Falscher Benutzername oder Passwort.";
        }
    } else {
        // Anmeldeversuch fehlgeschlagen
        $response["success"] = false;
        $response["message"] = "Falscher Benutzername oder Passwort.";
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>
