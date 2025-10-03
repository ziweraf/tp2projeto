import React, { useState } from "react";

const FormularioPsicologo = ({ aoCadastrarPsicologo }) => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [crp, setCrp] = useState("");
  const [foto, setFoto] = useState("");
  const [especialidades, setEspecialidades] = useState("");
  const [biografia, setBiografia] = useState("");
  const [endereco, setEndereco] = useState("");
  const [horarios, setHorarios] = useState("");

  const aoEnviar = (e) => {
    e.preventDefault();

    const especialidadesArray = especialidades
      .split(",")
      .map((esp) => esp.trim())
      .filter(Boolean);

    const horariosArray = horarios
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean);

    aoCadastrarPsicologo({
      nomeCompleto,
      crp,
      foto,
      especialidades: especialidadesArray,
      biografia,
      endereco,
      horarios: horariosArray,
    });

    setNomeCompleto("");
    setCrp("");
    setFoto("");
    setEspecialidades("");
    setBiografia("");
    setEndereco("");
    setHorarios("");
  };

  return (
    <form onSubmit={aoEnviar} className="form-cadastro">
      <div className="cadastro-inicial">
        <label>Nome Completo:</label>
        <input
          type="text"
          value={nomeCompleto}
          onChange={(e) => setNomeCompleto(e.target.value)}
          required
          placeholder="Digite o nome completo"
        />

        <label>CRP:</label>
        <input
          type="text"
          value={crp}
          onChange={(e) => setCrp(e.target.value)}
          required
          placeholder="Número do CRP"
        />
      </div>

      <label>URL da Foto:</label>
      <input
        type="url"
        value={foto}
        onChange={(e) => setFoto(e.target.value)}
        placeholder="https://exemplo.com/foto.jpg"
      />

      <label>Especialidades (separe por vírgula):</label>
      <input
        type="text"
        value={especialidades}
        onChange={(e) => setEspecialidades(e.target.value)}
        placeholder="Ex: Ansiedade, Depressão, Crianças"
      />

      <label>Biografia:</label>
      <textarea
        value={biografia}
        onChange={(e) => setBiografia(e.target.value)}
        placeholder="Conte um pouco sobre você"
      />

      <label>Endereço do Consultório:</label>
      <input
        type="text"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        placeholder="Rua, Número, Cidade"
      />

      <label>Horários de Atendimento (separe por vírgula):</label>
      <input
        type="text"
        value={horarios}
        onChange={(e) => setHorarios(e.target.value)}
        placeholder="Ex: 09:00, 10:30, 14:00"
      />

      <button type="submit">Cadastrar Psicólogo</button>
    </form>
  );
};

export default FormularioPsicologo;
