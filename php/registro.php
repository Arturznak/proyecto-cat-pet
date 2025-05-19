<?php
// Conexión con PDO
$host = 'localhost';
$dbname = 'CATPET';
$username = 'catpet';
$password = 'system';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("❌ Error de conexión: " . $e->getMessage());
}

// Verifica que los datos vienen por POST
if (
    isset($_POST['nombre'], $_POST['apellidos'], $_POST['correo'], $_POST['usuario'], $_POST['clave1'])
) {
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $correo = $_POST['correo'];
    $usuario = $_POST['usuario'];
    $clave = $_POST['clave1'];

    $fullName = $nombre . ' ' . $apellidos;

    try {
        $stmt = $pdo->prepare("INSERT INTO Cliente (fullName, correo, telefono, premium, user, pwd) 
                               VALUES (:fullName, :correo, '', 0, :usuario, :pwd)");

        $stmt->execute([
            'fullName' => $fullName,
            'correo' => $correo,
            'usuario' => $usuario,
            'pwd' => $clave
        ]);

       header("Location: tienda.html");
        exit;


    } catch (PDOException $e) {
        echo "❌ Error en el registro: " . $e->getMessage();
    }
} else {
    echo "⚠️ Datos incompletos.";
}
?>
