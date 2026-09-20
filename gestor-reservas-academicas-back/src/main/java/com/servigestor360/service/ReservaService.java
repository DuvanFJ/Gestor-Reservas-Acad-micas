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
     *
     * Antes de guardar se verifica que la sala
     * no tenga otra reserva que se cruce
     * con la fecha y horario solicitados.
     */
    public Reserva guardarReserva(Reserva reserva) {

        validarDisponibilidad(reserva, null);

        return reservaRepository.save(reserva);

    }


    /**
     * Busca una reserva por su identificador.
     */
    public Reserva buscarPorId(Integer id) {

        return reservaRepository
                .findById(id)
                .orElse(null);

    }


    /**
     * Actualiza la información de una reserva existente.
     *
     * También se verifica que la nueva fecha y horario
     * no entren en conflicto con otra reserva.
     */
    public Reserva actualizarReserva(
            Integer id,
            Reserva reservaActualizada) {

        Reserva reserva = reservaRepository
                .findById(id)
                .orElse(null);


        if (reserva != null) {

            validarDisponibilidad(
                    reservaActualizada,
                    id
            );


            reserva.setNombreSolicitante(
                    reservaActualizada.getNombreSolicitante()
            );

            reserva.setFechaReserva(
                    reservaActualizada.getFechaReserva()
            );

            reserva.setHoraInicio(
                    reservaActualizada.getHoraInicio()
            );

            reserva.setHoraFin(
                    reservaActualizada.getHoraFin()
            );

            reserva.setEstado(
                    reservaActualizada.getEstado()
            );

            reserva.setSala(
                    reservaActualizada.getSala()
            );


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


    /**
     * Comprueba si existe otra reserva que se cruce
     * con la fecha y horario de la reserva indicada.
     *
     * @param reserva reserva que se quiere crear o actualizar
     * @param idReservaActual identificador de la reserva actual.
     *                        Se utiliza al editar para no compararla
     *                        consigo misma.
     */
    private void validarDisponibilidad(
            Reserva reserva,
            Integer idReservaActual) {


        if (reserva.getSala() == null ||
                reserva.getSala().getIdSala() == null) {

            throw new IllegalArgumentException(
                    "La sala es obligatoria."
            );

        }


        List<Reserva> reservasExistentes =
                reservaRepository
                        .findBySala_IdSalaAndFechaReservaAndHoraInicioLessThanAndHoraFinGreaterThan(
                                reserva.getSala().getIdSala(),
                                reserva.getFechaReserva(),
                                reserva.getHoraFin(),
                                reserva.getHoraInicio()
                        );


        for (Reserva existente : reservasExistentes) {

            /*
             * Cuando estamos editando una reserva,
             * ignoramos la propia reserva.
             */
            if (idReservaActual != null &&
                    existente.getIdReserva()
                            .equals(idReservaActual)) {

                continue;

            }


            throw new IllegalStateException(
                    "La sala ya tiene una reserva "
                    + "en ese horario."
            );

        }

    }

}