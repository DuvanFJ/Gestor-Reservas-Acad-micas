import { useState, useEffect } from "react";

import {
    guardarAula,
    actualizarAula
} from "../services/aulaService";

import {
    exito,
    advertencia
} from "../utils/alertas";

import {
    FaSave,
    FaEdit
} from "react-icons/fa";

import "../styles/formulario.css";

function FormularioAula({
    agregarAula,
    aulaEditar,
    setAulaEditar
}) {

    // Estados del formulario
    const [nombre, setNombre] = useState("");
    const [edificio, setEdificio] = useState("");
    const [capacidad, setCapacidad] = useState("");
    const [tipo, setTipo] = useState("");
    const [activa, setActiva] = useState(true);
    const [departamento, setDepartamento] = useState("");
    const [municipio, setMunicipio] = useState("");

    // Cargar los datos cuando se selecciona un aula para editar
    useEffect(() => {

        if (aulaEditar) {

            setNombre(aulaEditar.nombre || "");
            setEdificio(aulaEditar.edificio || "");
            setCapacidad(aulaEditar.capacidad || "");
            setTipo(aulaEditar.tipo || "");
            setActiva(
                aulaEditar.activa !== undefined
                    ? aulaEditar.activa
                    : true
            );
            setDepartamento(aulaEditar.departamento || "");
            setMunicipio(aulaEditar.municipio || "");

        }

    }, [aulaEditar]);

    // Guardar o actualizar aula
    async function guardarAulaFormulario(e) {

        e.preventDefault();

        // Validar nombre
        if (nombre.trim() === "") {
            advertencia("Ingrese el nombre o número del aula");
            return;
        }

        // Validar edificio
        if (edificio.trim() === "") {
            advertencia("Ingrese el edificio");
            return;
        }

        // Validar capacidad
        if (capacidad === "" || Number(capacidad) <= 0) {
            advertencia("La capacidad debe ser mayor que cero");
            return;
        }

        // Validar tipo
        if (tipo.trim() === "") {
            advertencia("Ingrese el tipo de aula");
            return;
        }

        // Crear objeto para enviar al backend
        const nuevaAula = {

            nombre: nombre,
            edificio: edificio,
            capacidad: Number(capacidad),
            tipo: tipo,
            activa: activa,
            departamento: departamento,
            municipio: municipio

        };

        try {

            // Si estamos editando
            if (aulaEditar) {

                const aulaActualizada = await actualizarAula(
                    aulaEditar.idAula,
                    nuevaAula
                );

                agregarAula(aulaActualizada);

                exito("Aula actualizada correctamente.");

                setAulaEditar(null);

            } else {

                // Si estamos creando
                const aulaGuardada = await guardarAula(nuevaAula);

                agregarAula(aulaGuardada);

                exito("Aula guardada correctamente.");

            }

            // Limpiar formulario
            setNombre("");
            setEdificio("");
            setCapacidad("");
            setTipo("");
            setActiva(true);
            setDepartamento("");
            setMunicipio("");

        } catch (error) {

            console.error("Error al guardar aula:", error);

            advertencia(
                "No fue posible guardar el aula. Verifique el inicio de sesión."
            );

        }

    }

    return (

        <form
            className="formulario"
            onSubmit={guardarAulaFormulario}
        >

            <h3>

                {aulaEditar
                    ? "Editar Aula"
                    : "Registrar Aula"}

            </h3>

            <input
                type="text"
                placeholder="Nombre o número del aula"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <input
                type="text"
                placeholder="Edificio"
                value={edificio}
                onChange={(e) => setEdificio(e.target.value)}
            />

            <input
                type="number"
                placeholder="Capacidad"
                value={capacidad}
                onChange={(e) => setCapacidad(e.target.value)}
            />

            <input
                type="text"
                placeholder="Tipo de aula"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
            />

            <input
                type="text"
                placeholder="Departamento"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
            />

            <input
                type="text"
                placeholder="Municipio"
                value={municipio}
                onChange={(e) => setMunicipio(e.target.value)}
            />

            <label>

                <input
                    type="checkbox"
                    checked={activa}
                    onChange={(e) => setActiva(e.target.checked)}
                />

                Aula activa

            </label>

            <button type="submit">

                {aulaEditar ? (

                    <>
                        <FaEdit /> Actualizar Aula
                    </>

                ) : (

                    <>
                        <FaSave /> Guardar Aula
                    </>

                )}

            </button>

        </form>

    );

}

export default FormularioAula;