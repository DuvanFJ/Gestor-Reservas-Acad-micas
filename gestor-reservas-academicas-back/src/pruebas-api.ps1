# ============================================================
# GESTOR RESERVAS ACADEMICAS
# Archivo de pruebas de API
# Pruebas realizadas con PowerShell
# ============================================================

$URL = "http://localhost:8080"

Write-Host "========================================="
Write-Host "1. LOGIN CORRECTO"
Write-Host "========================================="

$login = @{
    correo = "duvan@gmail.com"
    password = "123456"
} | ConvertTo-Json

$respuestaLogin = Invoke-RestMethod `
    -Uri "$URL/api/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $login

$respuestaLogin

$token = $respuestaLogin.token

$headers = @{
    Authorization = "Bearer $token"
}

Write-Host ""
Write-Host "Token obtenido correctamente."


Write-Host ""
Write-Host "========================================="
Write-Host "2. GET TODOS LOS USUARIOS"
Write-Host "========================================="

Invoke-RestMethod `
    -Uri "$URL/api/usuarios" `
    -Method GET `
    -Headers $headers


Write-Host ""
Write-Host "========================================="
Write-Host "3. GET USUARIO POR ID"
Write-Host "========================================="

Invoke-RestMethod `
    -Uri "$URL/api/usuarios/2" `
    -Method GET `
    -Headers $headers


Write-Host ""
Write-Host "========================================="
Write-Host "4. POST CREAR USUARIO"
Write-Host "========================================="

$nuevoUsuario = @{
    nombre = "Usuario Prueba"
    correo = "usuario.prueba@gmail.com"
    password = "123456"
    rol = "USUARIO"
} | ConvertTo-Json

$usuarioCreado = Invoke-RestMethod `
    -Uri "$URL/api/usuarios" `
    -Method POST `
    -ContentType "application/json" `
    -Headers $headers `
    -Body $nuevoUsuario

$usuarioCreado

$idPrueba = $usuarioCreado.idUsuario

Write-Host ""
Write-Host "ID creado: $idPrueba"


Write-Host ""
Write-Host "========================================="
Write-Host "5. PUT ACTUALIZAR USUARIO"
Write-Host "========================================="

$usuarioActualizado = @{
    nombre = "Usuario Prueba Actualizado"
    correo = "usuario.prueba@gmail.com"
    password = "123456"
    rol = "USUARIO"
} | ConvertTo-Json

Invoke-RestMethod `
    -Uri "$URL/api/usuarios/$idPrueba" `
    -Method PUT `
    -ContentType "application/json" `
    -Headers $headers `
    -Body $usuarioActualizado


Write-Host ""
Write-Host "========================================="
Write-Host "6. DELETE ELIMINAR USUARIO"
Write-Host "========================================="

Invoke-RestMethod `
    -Uri "$URL/api/usuarios/$idPrueba" `
    -Method DELETE `
    -Headers $headers

Write-Host "Usuario eliminado correctamente."


Write-Host ""
Write-Host "========================================="
Write-Host "7. LOGIN INCORRECTO"
Write-Host "========================================="

$loginIncorrecto = @{
    correo = "duvan@gmail.com"
    password = "999999"
} | ConvertTo-Json

try {

    Invoke-RestMethod `
        -Uri "$URL/api/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $loginIncorrecto

}
catch {

    Write-Host "Resultado esperado: 401 Unauthorized"

}


Write-Host ""
Write-Host "========================================="
Write-Host "PRUEBAS FINALIZADAS"
Write-Host "========================================="