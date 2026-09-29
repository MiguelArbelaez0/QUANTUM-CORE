import { useEffect, useMemo, useState } from "react";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/transacciones";

const EMPTY_FORM = {
  codigo: "",
  tipo: "CREDITO",
  monto: "",
  impacto: "",
};

function App() {
  const [transacciones, setTransacciones] = useState([]);
  const [formulario, setFormulario] = useState(EMPTY_FORM);
  const [editandoId, setEditandoId] = useState(null);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  /* =========================
     CARGAR TRANSACCIONES
     ========================= */

  const cargarTransacciones = async () => {
    try {
      setCargando(true);
      setError("");

      const respuesta = await fetch(`${BASE_URL}/`);

      if (!respuesta.ok) {
        throw new Error("No fue posible consultar las transacciones.");
      }

      const resultado = await respuesta.json();

      const lista = Array.isArray(resultado)
        ? resultado
        : resultado.transacciones ||
          resultado.data ||
          resultado.result ||
          [];

      setTransacciones(lista);
    } catch (err) {
      setError(
        err.message || "Error al cargar las transacciones."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTransacciones();
  }, []);

  /* =========================
     ESTADÍSTICAS
     ========================= */

  const estadisticas = useMemo(() => {
    const creditos = transacciones.filter(
      (item) =>
        String(item.tipo).toUpperCase() === "CREDITO"
    );

    const debitos = transacciones.filter(
      (item) =>
        String(item.tipo).toUpperCase() === "DEBITO"
    );

    const totalCreditos = creditos.reduce(
      (total, item) =>
        total + Number(item.monto || 0),
      0
    );

    const totalDebitos = debitos.reduce(
      (total, item) =>
        total + Number(item.monto || 0),
      0
    );

    return {
      total: transacciones.length,
      creditos: totalCreditos,
      debitos: totalDebitos,
    };
  }, [transacciones]);

  /* =========================
     FORMULARIO
     ========================= */

  const cambiarCampo = (event) => {
    const { name, value } = event.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));

    setError("");
    setMensaje("");
  };

  const limpiarFormulario = () => {
    setFormulario(EMPTY_FORM);
    setEditandoId(null);
    setError("");
  };

  /* =========================
     CREAR / ACTUALIZAR
     ========================= */

  const guardarTransaccion = async (event) => {
    event.preventDefault();

    if (
      !formulario.codigo.trim() ||
      !formulario.monto ||
      formulario.impacto === ""
    ) {
      setError(
        "Completa código, monto e impacto."
      );
      return;
    }

    try {
      setGuardando(true);
      setError("");
      setMensaje("");

      const datos = {
        codigo: formulario.codigo.trim(),
        tipo: formulario.tipo,
        monto: Number(formulario.monto),
        impacto: Number(formulario.impacto),
      };

      const url = editandoId
        ? `${BASE_URL}/${editandoId}`
        : `${BASE_URL}/`;

      const metodo = editandoId ? "PUT" : "POST";

      const respuesta = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (!respuesta.ok) {
        throw new Error(
          editandoId
            ? "No fue posible actualizar la transacción."
            : "No fue posible crear la transacción."
        );
      }

      setMensaje(
        editandoId
          ? "Transacción actualizada correctamente."
          : "Transacción creada correctamente."
      );

      limpiarFormulario();

      await cargarTransacciones();
    } catch (err) {
      setError(
        err.message || "Ocurrió un error."
      );
    } finally {
      setGuardando(false);
    }
  };

  /* =========================
     EDITAR
     ========================= */

  const editarTransaccion = (transaccion) => {
    const id =
      transaccion.id ??
      transaccion.ID ??
      transaccion.Id;

    setEditandoId(id);

    setFormulario({
      codigo: transaccion.codigo ?? "",
      tipo: String(
        transaccion.tipo ?? "CREDITO"
      ).toUpperCase(),
      monto: transaccion.monto ?? "",
      impacto: transaccion.impacto ?? "",
    });

    setError("");
    setMensaje("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     ELIMINAR
     ========================= */

  const eliminarTransaccion = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar esta transacción?"
    );

    if (!confirmar) return;

    try {
      setError("");
      setMensaje("");

      const respuesta = await fetch(
        `${BASE_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!respuesta.ok) {
        throw new Error(
          "No fue posible eliminar la transacción."
        );
      }

      if (editandoId === id) {
        limpiarFormulario();
      }

      setMensaje(
        "Transacción eliminada correctamente."
      );

      await cargarTransacciones();
    } catch (err) {
      setError(
        err.message ||
          "Ocurrió un error al eliminar."
      );
    }
  };

  /* =========================
     FORMATO DE MONEDA
     ========================= */

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(Number(valor || 0));
  };

  /* =========================
     INTERFAZ
     ========================= */

  return (
    <div className="app-shell">

      {/* HEADER */}

      <header className="topbar">
        <div className="brand">

          <div className="brand-logo">
            Q
          </div>

          <div>
            <h1>QUANTUM CORE</h1>
            <p>
              Gestión de transacciones empresariales
            </p>
          </div>

        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          <span>Sistema activo</span>
        </div>
      </header>


      {/* CONTENIDO */}

      <main className="dashboard">

        {/* TITULO */}

        <section className="welcome">
          <span className="section-label">
            PANEL DE CONTROL
          </span>

          <h2>
            Gestión de transacciones
          </h2>

          <p>
            Administra, consulta y controla las
            operaciones registradas en Quantum Core.
          </p>
        </section>


        {/* ESTADÍSTICAS */}

        <section className="stats-grid">

          {/* TOTAL */}

          <article className="stat-card">
            <div className="stat-icon blue">
              ▣
            </div>

            <div>
              <span>
                Total de transacciones
              </span>

              <strong>
                {estadisticas.total}
              </strong>
            </div>
          </article>


          {/* CRÉDITOS */}

          <article className="stat-card">
            <div className="stat-icon green">
              $
            </div>

            <div>
              <span>
                Total créditos
              </span>

              <strong>
                {formatearMoneda(
                  estadisticas.creditos
                )}
              </strong>
            </div>
          </article>


          {/* DÉBITOS */}

          <article className="stat-card">
            <div className="stat-icon red">
              −
            </div>

            <div>
              <span>
                Total débitos
              </span>

              <strong>
                {formatearMoneda(
                  estadisticas.debitos
                )}
              </strong>
            </div>
          </article>

        </section>


        {/* FORMULARIO */}

        <section className="panel">

          <div className="panel-header">

            <div>
              <span className="section-label">
                {editandoId
                  ? "ACTUALIZACIÓN"
                  : "NUEVO REGISTRO"}
              </span>

              <h3>
                {editandoId
                  ? "Editar transacción"
                  : "Registrar transacción"}
              </h3>
            </div>


            {editandoId && (
              <button
                type="button"
                className="btn-secondary"
                onClick={limpiarFormulario}
              >
                Cancelar edición
              </button>
            )}

          </div>


          <form onSubmit={guardarTransaccion}>

            <div className="form-grid">

              {/* CÓDIGO */}

              <div className="field">
                <label htmlFor="codigo">
                  Código
                </label>

                <input
                  id="codigo"
                  name="codigo"
                  type="text"
                  placeholder="Ej. T007"
                  value={formulario.codigo}
                  onChange={cambiarCampo}
                />
              </div>


              {/* TIPO */}

              <div className="field">
                <label htmlFor="tipo">
                  Tipo de transacción
                </label>

                <select
                  id="tipo"
                  name="tipo"
                  value={formulario.tipo}
                  onChange={cambiarCampo}
                >
                  <option value="CREDITO">
                    CRÉDITO
                  </option>

                  <option value="DEBITO">
                    DÉBITO
                  </option>
                </select>
              </div>


              {/* MONTO */}

              <div className="field">
                <label htmlFor="monto">
                  Monto
                </label>

                <input
                  id="monto"
                  name="monto"
                  type="number"
                  min="0"
                  placeholder="Ej. 100000"
                  value={formulario.monto}
                  onChange={cambiarCampo}
                />
              </div>


              {/* IMPACTO */}

              <div className="field">
                <label htmlFor="impacto">
                  Impacto
                </label>

                <input
                  id="impacto"
                  name="impacto"
                  type="number"
                  placeholder="Ej. 10 o -5"
                  value={formulario.impacto}
                  onChange={cambiarCampo}
                />
              </div>

            </div>


            {/* MENSAJES */}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {mensaje && (
              <div className="success-message">
                {mensaje}
              </div>
            )}


            {/* BOTÓN */}

            <div className="form-actions">

              <button
                className="btn-primary"
                type="submit"
                disabled={guardando}
              >
                {guardando
                  ? "Guardando..."
                  : editandoId
                  ? "Guardar cambios"
                  : "Crear transacción"}
              </button>

            </div>

          </form>

        </section>


        {/* REGISTROS */}

        <section className="panel">

          <div className="panel-header">

            <div>
              <span className="section-label">
                REGISTROS
              </span>

              <h3>
                Transacciones
              </h3>
            </div>

            <span className="record-count">
              {transacciones.length} registros
            </span>

          </div>


          {/* CARGANDO */}

          {cargando ? (

            <div className="empty-state">
              <div className="loader"></div>

              <p>
                Cargando transacciones...
              </p>
            </div>

          ) : transacciones.length === 0 ? (

            /* SIN DATOS */

            <div className="empty-state">

              <div className="empty-icon">
                ▣
              </div>

              <h4>
                No hay transacciones
              </h4>

              <p>
                Registra la primera transacción
                utilizando el formulario.
              </p>

            </div>

          ) : (

            /* TABLA */

            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>CÓDIGO</th>
                    <th>TIPO</th>
                    <th>MONTO</th>
                    <th>IMPACTO</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>


                <tbody>

                  {transacciones.map(
                    (transaccion) => {

                      const id =
                        transaccion.id ??
                        transaccion.ID ??
                        transaccion.Id;

                      const tipo =
                        String(
                          transaccion.tipo || ""
                        ).toUpperCase();

                      const impacto =
                        Number(
                          transaccion.impacto || 0
                        );

                      return (
                        <tr key={id}>

                          <td className="id-cell">
                            #{id}
                          </td>


                          <td>
                            <strong>
                              {transaccion.codigo}
                            </strong>
                          </td>


                          <td>
                            <span
                              className={`badge ${
                                tipo === "CREDITO"
                                  ? "badge-credit"
                                  : "badge-debit"
                              }`}
                            >
                              {tipo}
                            </span>
                          </td>


                          <td className="amount">
                            {formatearMoneda(
                              transaccion.monto
                            )}
                          </td>


                          <td>
                            <span
                              className={
                                impacto >= 0
                                  ? "impact-positive"
                                  : "impact-negative"
                              }
                            >
                              {impacto >= 0
                                ? "+"
                                : ""}
                              {impacto}
                            </span>
                          </td>


                          <td>
                            <div className="actions">

                              <button
                                className="action-edit"
                                onClick={() =>
                                  editarTransaccion(
                                    transaccion
                                  )
                                }
                              >
                                Editar
                              </button>

                              <button
                                className="action-delete"
                                onClick={() =>
                                  eliminarTransaccion(
                                    id
                                  )
                                }
                              >
                                Eliminar
                              </button>

                            </div>
                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>


      {/* FOOTER */}

      <footer className="footer">

        <div>
          <strong>
            QUANTUM CORE
          </strong>

          <span>
            {" "}· Sistema de gestión empresarial
          </span>
        </div>

        <span>
          © 2026
        </span>

      </footer>

    </div>
  );
}

export default App;