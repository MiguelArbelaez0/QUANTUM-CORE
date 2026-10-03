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
  const [transaccionEditando, setTransaccionEditando] = useState(null);
  const [transaccionEliminando, setTransaccionEliminando] = useState(null);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  // =========================
  // CARGAR TRANSACCIONES
  // =========================

  const cargarTransacciones = async () => {
    try {
      setCargando(true);
      setError("");

      const respuesta = await fetch(`${BASE_URL}/`);

      if (!respuesta.ok) {
        throw new Error(
          "No fue posible consultar las transacciones."
        );
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
        err.message ||
          "Error al cargar las transacciones."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTransacciones();
  }, []);

  // =========================
  // ESTADISTICAS
  // =========================

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

    // Saldo neto = créditos - débitos
    const saldoNeto =
      totalCreditos - totalDebitos;

    return {
      total: transacciones.length,
      creditos: totalCreditos,
      debitos: totalDebitos,
      saldoNeto,
    };
  }, [transacciones]);

  // =========================
  // FORMULARIO PRINCIPAL
  // =========================

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
    setError("");
  };

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

      const respuesta = await fetch(
        `${BASE_URL}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        }
      );

      if (!respuesta.ok) {
        throw new Error(
          "No fue posible crear la transacción."
        );
      }

      setMensaje(
        "Transacción creada correctamente."
      );

      limpiarFormulario();

      await cargarTransacciones();
    } catch (err) {
      setError(
        err.message ||
          "Ocurrió un error al crear la transacción."
      );
    } finally {
      setGuardando(false);
    }
  };

  // =========================
  // ABRIR MODAL EDITAR
  // =========================

  const abrirModalEditar = (transaccion) => {
    const id =
      transaccion.id ??
      transaccion.ID ??
      transaccion.Id;

    setTransaccionEditando(transaccion);
    setEditandoId(id);

    setError("");
    setMensaje("");
  };

  // =========================
  // CERRAR MODAL EDITAR
  // =========================

  const cancelarEdicion = () => {
    if (guardando) return;

    setTransaccionEditando(null);
    setEditandoId(null);
    setError("");
  };

  // =========================
  // CAMBIAR DATOS DEL MODAL
  // =========================

  const cambiarCampoEdicion = (event) => {
    const { name, value } = event.target;

    setTransaccionEditando((actual) => ({
      ...actual,
      [name]: value,
    }));

    setError("");
  };

  // =========================
  // CONFIRMAR EDICION
  // =========================

  const confirmarEdicion = async (event) => {
    event.preventDefault();

    if (!transaccionEditando) return;

    if (
      !String(
        transaccionEditando.codigo || ""
      ).trim() ||
      transaccionEditando.monto === "" ||
      transaccionEditando.impacto === ""
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
        codigo: String(
          transaccionEditando.codigo
        ).trim(),

        tipo: String(
          transaccionEditando.tipo ||
            "CREDITO"
        ).toUpperCase(),

        monto: Number(
          transaccionEditando.monto
        ),

        impacto: Number(
          transaccionEditando.impacto
        ),
      };

      const respuesta = await fetch(
        `${BASE_URL}/${editandoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        }
      );

      if (!respuesta.ok) {
        throw new Error(
          "No fue posible actualizar la transacción."
        );
      }

      setMensaje(
        "Transacción actualizada correctamente."
      );

      setTransaccionEditando(null);
      setEditandoId(null);

      await cargarTransacciones();
    } catch (err) {
      setError(
        err.message ||
          "Ocurrió un error al actualizar la transacción."
      );
    } finally {
      setGuardando(false);
    }
  };

  // =========================
  // ABRIR MODAL ELIMINAR
  // =========================

  const abrirModalEliminar = (transaccion) => {
    setTransaccionEliminando(transaccion);
    setError("");
  };

  // =========================
  // CANCELAR ELIMINACION
  // =========================

  const cancelarEliminacion = () => {
    if (eliminando) return;

    setTransaccionEliminando(null);
  };

  // =========================
  // CONFIRMAR ELIMINACION
  // =========================

  const confirmarEliminacion = async () => {
    if (!transaccionEliminando) return;

    const id =
      transaccionEliminando.id ??
      transaccionEliminando.ID ??
      transaccionEliminando.Id;

    try {
      setEliminando(true);
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

      setTransaccionEliminando(null);

      setMensaje(
        "Transacción eliminada correctamente."
      );

      await cargarTransacciones();
    } catch (err) {
      setError(
        err.message ||
          "Ocurrió un error al eliminar la transacción."
      );
    } finally {
      setEliminando(false);
    }
  };

  // =========================
  // FORMATEAR MONEDA
  // =========================

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(Number(valor || 0));
  };

  return (
    <div className="app-shell">

      {/* =========================
          HEADER
      ========================= */}

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

      <main className="dashboard">

        {/* =========================
            BIENVENIDA
        ========================= */}

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

        {/* =========================
            ESTADISTICAS
        ========================= */}

        <section className="stats-grid">

          {/* TOTAL TRANSACCIONES */}

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

          {/* TOTAL CREDITOS */}

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

          {/* TOTAL DEBITOS */}

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

          {/* SALDO NETO */}

          <article className="stat-card">

            <div className="stat-icon blue">
              $
            </div>

            <div>

              <span>
                Saldo neto
              </span>

              <strong>
                {formatearMoneda(
                  estadisticas.saldoNeto
                )}
              </strong>

            </div>

          </article>

        </section>

        {/* =========================
            CREAR TRANSACCION
        ========================= */}

        <section className="panel">

          <div className="panel-header">

            <div>

              <span className="section-label">
                NUEVO REGISTRO
              </span>

              <h3>
                Registrar transacción
              </h3>

            </div>

          </div>

          <form onSubmit={guardarTransaccion}>

            <div className="form-grid">

              <div className="field">

                <label htmlFor="codigo">
                  Código
                </label>

                <input
                  id="codigo"
                  name="codigo"
                  type="text"
                  placeholder="Ej. T009"
                  value={formulario.codigo}
                  onChange={cambiarCampo}
                />

              </div>

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

            <div className="form-actions">

              <button
                className="btn-primary"
                type="submit"
                disabled={guardando}
              >

                {guardando
                  ? "Guardando..."
                  : "Crear transacción"}

              </button>

            </div>

          </form>

        </section>

        {/* =========================
            TABLA
        ========================= */}

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

          {cargando ? (

            <div className="empty-state">

              <div className="loader"></div>

              <p>
                Cargando transacciones...
              </p>

            </div>

          ) : transacciones.length === 0 ? (

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
                                type="button"
                                className="action-edit"
                                onClick={() =>
                                  abrirModalEditar(
                                    transaccion
                                  )
                                }
                              >
                                Editar
                              </button>

                              <button
                                type="button"
                                className="action-delete"
                                onClick={() =>
                                  abrirModalEliminar(
                                    transaccion
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

      {/* =========================
          MODAL EDITAR
      ========================= */}

      {transaccionEditando && (

        <div
          className="modal-overlay"
          onMouseDown={(event) => {

            if (
              event.target === event.currentTarget &&
              !guardando
            ) {
              cancelarEdicion();
            }

          }}
        >

          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-editar-titulo"
          >

            <div className="modal-header">

              <div>

                <span className="section-label">
                  ACTUALIZACIÓN
                </span>

                <h3 id="modal-editar-titulo">
                  Editar transacción
                </h3>

                <p>
                  Modifica los datos de la
                  transacción y confirma los cambios.
                </p>

              </div>

              <button
                type="button"
                className="modal-close"
                onClick={cancelarEdicion}
                disabled={guardando}
                aria-label="Cerrar"
              >
                ×
              </button>

            </div>

            <form
              className="modal-form"
              onSubmit={confirmarEdicion}
            >

              <div className="form-grid">

                <div className="field">

                  <label htmlFor="editar-codigo">
                    Código
                  </label>

                  <input
                    id="editar-codigo"
                    name="codigo"
                    type="text"
                    value={
                      transaccionEditando.codigo ?? ""
                    }
                    onChange={cambiarCampoEdicion}
                    disabled={guardando}
                  />

                </div>

                <div className="field">

                  <label htmlFor="editar-tipo">
                    Tipo de transacción
                  </label>

                  <select
                    id="editar-tipo"
                    name="tipo"
                    value={
                      String(
                        transaccionEditando.tipo ||
                          "CREDITO"
                      ).toUpperCase()
                    }
                    onChange={cambiarCampoEdicion}
                    disabled={guardando}
                  >

                    <option value="CREDITO">
                      CRÉDITO
                    </option>

                    <option value="DEBITO">
                      DÉBITO
                    </option>

                  </select>

                </div>

                <div className="field">

                  <label htmlFor="editar-monto">
                    Monto
                  </label>

                  <input
                    id="editar-monto"
                    name="monto"
                    type="number"
                    min="0"
                    value={
                      transaccionEditando.monto ?? ""
                    }
                    onChange={cambiarCampoEdicion}
                    disabled={guardando}
                  />

                </div>

                <div className="field">

                  <label htmlFor="editar-impacto">
                    Impacto
                  </label>

                  <input
                    id="editar-impacto"
                    name="impacto"
                    type="number"
                    value={
                      transaccionEditando.impacto ?? ""
                    }
                    onChange={cambiarCampoEdicion}
                    disabled={guardando}
                  />

                </div>

              </div>

              {error && (
                <div className="error-message modal-message">
                  {error}
                </div>
              )}

              <div className="modal-actions">

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={cancelarEdicion}
                  disabled={guardando}
                >
                  Cancelar edición
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={guardando}
                >
                  {guardando
                    ? "Guardando..."
                    : "Confirmar edición"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =========================
          MODAL ELIMINAR
      ========================= */}

      {transaccionEliminando && (

        <div
          className="modal-overlay"
          onMouseDown={(event) => {

            if (
              event.target === event.currentTarget &&
              !eliminando
            ) {
              cancelarEliminacion();
            }

          }}
        >

          <div
            className="modal modal-delete"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-eliminar-titulo"
          >

            <div className="delete-icon">
              !
            </div>

            <div className="delete-content">

              <h3 id="modal-eliminar-titulo">
                ¿Eliminar transacción?
              </h3>

              <p>
                ¿Seguro que quieres eliminar esta
                transacción? Esta acción no se puede
                deshacer.
              </p>

              <div className="delete-preview">

                <div>

                  <span>
                    Código
                  </span>

                  <strong>
                    {transaccionEliminando.codigo}
                  </strong>

                </div>

                <div>

                  <span>
                    Tipo
                  </span>

                  <strong>
                    {String(
                      transaccionEliminando.tipo ||
                        ""
                    ).toUpperCase()}
                  </strong>

                </div>

                <div>

                  <span>
                    Monto
                  </span>

                  <strong>
                    {formatearMoneda(
                      transaccionEliminando.monto
                    )}
                  </strong>

                </div>

              </div>

            </div>

            <div className="modal-actions">

              <button
                type="button"
                className="btn-secondary"
                onClick={cancelarEliminacion}
                disabled={eliminando}
              >
                No, cancelar
              </button>

              <button
                type="button"
                className="btn-danger"
                onClick={confirmarEliminacion}
                disabled={eliminando}
              >
                {eliminando
                  ? "Eliminando..."
                  : "Sí, eliminar"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;