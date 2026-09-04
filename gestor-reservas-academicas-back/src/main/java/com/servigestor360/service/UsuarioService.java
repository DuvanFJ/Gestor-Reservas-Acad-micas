package com.servigestor360.service;

import com.servigestor360.entity.Usuario;
import com.servigestor360.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Listar todos los usuarios registrados.
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // Guardar un nuevo usuario.
    public Usuario guardarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Buscar un usuario por su ID.
    public Usuario buscarPorId(Integer id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    // Actualizar los datos de un usuario existente.
    public Usuario actualizarUsuario(Integer id, Usuario usuarioActualizado) {

        Usuario usuario = usuarioRepository.findById(id).orElse(null);

        if (usuario != null) {

            usuario.setNombre(usuarioActualizado.getNombre());
            usuario.setCorreo(usuarioActualizado.getCorreo());
            usuario.setPassword(usuarioActualizado.getPassword());
            usuario.setRol(usuarioActualizado.getRol());

            return usuarioRepository.save(usuario);
        }

        return null;
    }

    // Eliminar un usuario por su ID.
    public void eliminarUsuario(Integer id) {
        usuarioRepository.deleteById(id);
    }
}