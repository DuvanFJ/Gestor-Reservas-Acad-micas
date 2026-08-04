package com.servigestor360.service;

import com.servigestor360.entity.Reserva;
import com.servigestor360.repository.ReservaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio encargado de contener la lógica de negocio
 * relacionada con las reservas académicas.
 */
@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    /**
     * Obtiene todas las reservas registradas.
     */
    public List<Reserva> listarReservas() {
        return reservaRepository.findAll();
    }

    /**
     * Guarda una nueva reserva.
     */
    public Reserva guardarReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    /**
     * Busca una reserva por su identificador.
     */
    public Reserva buscarPorId(Integer id) {
        return reservaRepository.findById(id).orElse(null);
    }

    /**
     * Actualiza la información de una reserva existente.
     */
    public Reserva actualizarReserva(Integer id, Reserva reservaActualizada) {

        Reserva reserva = reservaRepository.findById(id).orElse(null);

        if (reserva != null) {

            reserva.setNombreSolicitante(reservaActualizada.getNombreSolicitante());
            reserva.setFechaReserva(reservaActualizada.getFechaReserva());
            reserva.setHoraInicio(reservaActualizada.getHoraInicio());
            reserva.setHoraFin(reservaActualizada.getHoraFin());
            reserva.setEstado(reservaActualizada.getEstado());
            reserva.setSala(reservaActualizada.getSala());

            return reservaRepository.save(reserva);
        }

        return null;
    }

    /**
     * Elimina una reserva por su identificador.
     */
    public void eliminarReserva(Integer id) {
        reservaRepository.deleteById(id);
    }
}