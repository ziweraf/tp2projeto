import React from "react";

const PerfilPsicologo = ({ psicologo, aoClicarAgendar }) => {
  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <img
          className="perfil-foto"
          src={psicologo.foto || "https://via.placeholder.com/150"}
          alt={`Foto de ${psicologo.nomeCompleto}`}
        />
        <div className="perfil-info">
          <h2>{psicologo.nomeCompleto}</h2>
          <p>
            <strong>CRP:</strong> {psicologo.crp}
          </p>
          <p>
            <strong>Especialidades:</strong>{" "}
            {(psicologo.especialidades || []).join(", ")}
          </p>
        </div>
      </div>

      <div className="perfil-bio">
        <h3>Biografia</h3>
        <p>{psicologo.biografia}</p>
      </div>

      <div className="perfil-endereco">
        <h3>Endereço do Consultório</h3>
        <p>{psicologo.endereco}</p>
      </div>

      <div className="perfil-horarios">
        <h3>Horários de Atendimento</h3>
        <ul>
          {(psicologo.horarios || []).map((horario, i) => (
            <li key={i}>{horario}</li>
          ))}
        </ul>
      </div>

      <div className="perfil-acao">
        <button onClick={aoClicarAgendar}>Agendar Consulta</button>
      </div>
    </div>
  );
};

export default PerfilPsicologo;
