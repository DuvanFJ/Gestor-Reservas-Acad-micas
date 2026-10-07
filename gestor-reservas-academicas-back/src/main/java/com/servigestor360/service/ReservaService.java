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
     * Obtiene las reservas según el rol del usuario.
     *
     * ADMIN:
     * Puede consultar todas las reservas.
     *
     * USUARIO:
     * Solamente puede consultar sus propias reservas.
     */
    public List<Reserva> listarReservas(
            String correoUsuario,
            boolean esAdmin) {

        if (esAdmin) {
            return reservaRepository.findAll();
        }

        return reservaRepository
                .findByCorreoSolicitante(correoUsuario);
    }


    /**
     * Busca una reserva por ID.
     *
     * ADMIN:
     * Puede consultar cualquier reserva.
     *
     * USUARIO:
     * Solamente puede consultar una reserva propia.
     */
    public Reserva buscarPorId(
            Integer id,
            String correoUsuario,
            boolean esAdmin) {

        if (esAdmin) {

            return reservaRepository
                    .findById(id)
                    .orElse(null);
        }

        return reservaRepository
                .findByIdReservaAndCorreoSolicitante(
                        id,
                        correoUsuario
                )
                .orElse(null);
    }


    /**
     * Guarda una nueva reserva.
     *
     * El correo del propietario se obtiene del JWT.
     *
     * El estado siempre se establece como PENDIENTE
     * al crear una nueva reserva.
     */
    public Reserva guardarReserva(
            Reserva reserva,
            String correoUsuario) {

        // El propietario se establece desde el usuario autenticado.
        reserva.setCorreoSolicitante(correoUsuario);

        // Toda nueva reserva comienza pendiente.
        reserva.setEstado("Pendiente");

        validarHorario(reserva);

        validarDisponibilidad(reserva, null);

        return reservaRepository.save(reserva);
    }


    /**
     * Actualiza una reserva existente.
     *
     * ADMIN:
     * Puede modificar cualquier reserva y su estado.
     *
     * USUARIO:
     * Solamente puede modificar una reserva propia.
     * No puede cambiar su estado.
     */
    public Reserva actualizarReserva(
            Integer id,
            Reserva reservaActualizada,
            String correoUsuario,
            boolean esAdmin) {

        Reserva reserva;

        if (esAdmin) {

            reserva = reservaRepository
                    .findById(id)
                    .orElse(null);

        } else {

            reserva = reservaRepository
                    .findByIdReservaAndCorreoSolicitante(
                            id,
                            correoUsuario
                    )
                    .orElse(null);
        }


        if (reserva == null) {
            return null;
        }


        // Validar horario.
        validarHorario(reservaActualizada);

        // Validar que la sala no tenga conflicto.
        validarDisponibilidad(
                reservaActualizada,
                id
        );


        // ==========================================
        // ACTUALIZAR DATOS DE LA RESERVA
        // ==========================================

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

        reserva.setSala(
                reservaActualizada.getSala()
        );


        /*
         * El correo NO se toma del frontend.
         *
         * Si es USUARIO, conserva su propietario.
         *
         * Si es ADMIN, conserva el propietario original
         * de la reserva.
         */
        if (reserva.getCorreoSolicitante() == null ||
                reserva.getCorreoSolicitante().isBlank()) {

            reserva.setCorreoSolicitante(correoUsuario);
        }


        /*
         * Solamente ADMIN puede cambiar el estado.
         */
        if (esAdmin) {

            if (reservaActualizada.getEstado() != null &&
                    !reservaActualizada.getEstado().isBlank()) {

                reserva.setEstado(
                        reservaActualizada.getEstado()
                );
            }

        }


        /*
         * USUARIO no puede cambiar el estado.
         *
         * Si la reserva estaba Pendiente, permanece Pendiente.
         * Si estaba Aprobada o Rechazada, permanece con ese estado.
         */
        return reservaRepository.save(reserva);
    }


    /**
     * Elimina una reserva.
     *
     * ADMIN:
     * Puede eliminar cualquier reserva.
     *
     * USUARIO:
     * Solamente puede eliminar una reserva propia.
     */
    public boolean eliminarReserva(
            Integer id,
            String correoUsuario,
            boolean esAdmin) {

        Reserva reserva;

        if (esAdmin) {

            reserva = reservaRepository
                    .findById(id)
                    .orElse(null);

        } else {

            reserva = reservaRepository
                    .findByIdReservaAndCorreoSolicitante(
                            id,
                            correoUsuario
                    )
                    .orElse(null);
        }


        if (reserva == null) {
            return false;
        }


        reservaRepository.delete(reserva);

        return true;
    }


    /**
     * Valida que la hora de inicio sea anterior
     * a la hora de finalización.
     */
    private void validarHorario(Reserva reserva) {

        if (reserva.getHoraInicio() == null ||
                reserva.getHoraFin() == null) {

            throw new IllegalArgumentException(
                    "La hora de inicio y la hora de fin son obligatorias."
            );
        }


        if (!reserva.getHoraInicio()
                .isBefore(reserva.getHoraFin())) {

            throw new IllegalArgumentException(
                    "La hora de inicio debe ser anterior "
                    + "a la hora de fin."
            );
        }
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