<?php
session_start();

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
if (isset($_POST['correo'], $_POST['clave'])) {
    $correo = $_POST['correo'];
    $clave = $_POST['clave'];

    try {
        $stmt = $pdo->prepare("SELECT clientID, fullName, pwd FROM Cliente WHERE correo = :correo");
        $stmt->execute(['correo' => $correo]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && $usuario['pwd'] === $clave) {
            // Guardar datos en sesión
            $_SESSION['usuario_id'] = $usuario['clientID'];
            $_SESSION['nombre'] = $usuario['fullName'];

            // Redirigir a tienda
            header("Location: tienda.html");
            exit;
        } else {
            echo "⚠️ Email o contraseña incorrectos.";
        }
    } catch (PDOException $e) {
        echo "❌ Error en el login: " . $e->getMessage();
    }
} else {
    echo "⚠️ Faltan datos del formulario.";
}
?>
