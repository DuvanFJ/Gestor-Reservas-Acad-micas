function UsuarioTable({ usuarios }) {

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                </tr>
            </thead>

            <tbody>
                {usuarios.map((usuario) => (
                    <tr key={usuario.idUsuario}>
                        <td>{usuario.idUsuario}</td>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.correo}</td>
                        <td>{usuario.rol}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UsuarioTable;