import React from "react";
import FormularioCliente from "./FormularioCliente";

const AgendamentoConsulta = ({ psicologo, aoAgendarConsulta }) => {
  if (!psicologo) {
    return <div>Não há psicólogo cadastrado.</div>;
  }

  return (
    <FormularioCliente
      psicologo={psicologo}
      aoAgendarConsulta={aoAgendarConsulta}
    />
  );
};

export default AgendamentoConsulta;
