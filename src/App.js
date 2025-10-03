import React, { useState, useEffect } from "react";
import FormularioPsicologo from "./componentes/FormularioPsicologo";
import PerfilPsicologo from "./componentes/PerfilPsicologo";
import AgendamentoConsulta from "./componentes/AgendamentoConsulta";
import "./styles.css";

const App = () => {
  const [psicologos, setPsicologos] = useState(() => {
    const psicologosSalvos = localStorage.getItem("psicologos");
    return psicologosSalvos ? JSON.parse(psicologosSalvos) : [];
  });

  const [psicologoSelecionado, setPsicologoSelecionado] = useState(null);

  const [consultas, setConsultas] = useState(() => {
    const consultasSalvas = localStorage.getItem("consultas");
    return consultasSalvas ? JSON.parse(consultasSalvas) : {};
  });

  const [mostrarAgendamento, setMostrarAgendamento] = useState(false);

  useEffect(() => {
    localStorage.setItem("psicologos", JSON.stringify(psicologos));
  }, [psicologos]);

  useEffect(() => {
    localStorage.setItem("consultas", JSON.stringify(consultas));
  }, [consultas]);

  const aoCadastrarPsicologo = (dados) => {
    const novoPsicologo = {
      id: Date.now(),
      ...dados,
    };
    setPsicologos([...psicologos, novoPsicologo]);
    setPsicologoSelecionado(novoPsicologo);
    setMostrarAgendamento(false);
  };

  const aoAgendarConsulta = (nomeCliente, horarioConsulta) => {
    if (!psicologoSelecionado.horarios.includes(horarioConsulta)) {
      alert("Horário indisponível.");
      return;
    }
    const id = psicologoSelecionado.id;
    const consultasDoPsicologo = consultas[id] || [];
    const novaConsulta = { nomeCliente, horarioConsulta };

    setConsultas({
      ...consultas,
      [id]: [...consultasDoPsicologo, novaConsulta],
    });
  };

  const abrirAgendamento = () => {
    setMostrarAgendamento(true);
  };

  const voltarParaPerfil = () => {
    setMostrarAgendamento(false);
  };

  const selecionarPsicologo = (id) => {
    const psic = psicologos.find((p) => p.id === id);
    setPsicologoSelecionado(psic);
    setMostrarAgendamento(false);
  };

  const removerPsicologo = (id) => {
    const listaFiltrada = psicologos.filter((p) => p.id !== id);
    setPsicologos(listaFiltrada);
    if (psicologoSelecionado?.id === id) {
      setPsicologoSelecionado(null);
      setMostrarAgendamento(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="titulo-principal">MindCare</h1>

      {!psicologoSelecionado && (
        <>
          <FormularioPsicologo aoCadastrarPsicologo={aoCadastrarPsicologo} />

          <h2>Psicólogos cadastrados</h2>
          {psicologos.length === 0 && <p>Nenhum psicólogo cadastrado.</p>}
          <ul className="lista-psicologos">
            {psicologos.map((psic) => (
              <li key={psic.id} className="item-psicologo">
                <strong>{psic.nomeCompleto}</strong>
                <div>
                  <button onClick={() => selecionarPsicologo(psic.id)}>
                    Ver Perfil
                  </button>
                  <button onClick={() => removerPsicologo(psic.id)}>
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {psicologoSelecionado && !mostrarAgendamento && (
        <>
          <PerfilPsicologo
            psicologo={psicologoSelecionado}
            aoClicarAgendar={abrirAgendamento}
          />
          <button
            className="botao-voltar"
            onClick={() => {
              setPsicologoSelecionado(null);
              setMostrarAgendamento(false);
            }}
          >
            Voltar à lista de psicólogos
          </button>
        </>
      )}

      {psicologoSelecionado && mostrarAgendamento && (
        <>
          <button className="botao-voltar" onClick={voltarParaPerfil}>
            ← Voltar para Perfil
          </button>

          <AgendamentoConsulta
            psicologo={psicologoSelecionado}
            aoAgendarConsulta={aoAgendarConsulta}
          />

          <div className="consultas-agendadas">
            <h3>Consultas Agendadas:</h3>
            <ul>
              {(consultas[psicologoSelecionado.id] || []).map((consulta, i) => (
                <li key={i}>
                  {consulta.nomeCliente} - {consulta.horarioConsulta}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
