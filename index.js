const express = require('express');
const app = express();
app.use(express.json());

  let departamentos = [];
    let cargos = [];
      let funcionarios = [];
    app.post("/departamentos", (req, res) => {
  const { departamento } = req.body;
    const novoDepartamento = { id: departamentos.length + 1, departamento };
    departamentos.push(novoDepartamento);
      res.status(201).json(novoDepartamento);
    });
    app.post("/cargos", (req, res) => {
  const { cargo, departamentoId } = req.body;
   const novoCargo = { id: cargos.length + 1, cargo, departamentoId };
    cargos.push(novoCargo);
    res.status(201).json(novoCargo);
      });
  app.post("/funcionarios", (req, res) => {
    const { nome, sobrenome, cargoId } = req.body;
  const novoFuncionario = { id: funcionarios.length + 1, nome, sobrenome, cargoId };
   funcionarios.push(novoFuncionario);
     res.status(201).json(novoFuncionario);
      });
      app.get("/departamentos/:id", (req, res) => {
        const { id } = req.params;
        const departamento = departamentos.find(d => d.id == id);
     if (!departamento) return res.status(404).json({ message: 'Departamento não encontrado!' });
     res.status(200).json(departamento);
        });
      app.get("/funcionarios/:id", (req, res) => {
     const { id } = req.params;
      const funcionario = funcionarios.find(f => f.id == id);
     if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado!' });
   res.status(200).json(funcionario);
        });
    app.get("/cargos/:id", (req, res) => {
      const { id } = req.params;
       const cargo = cargos.find(c => c.id == id);
     if (!cargo) return res.status(404).json({ message: 'Cargo não encontrado!' });
     res.status(200).json(cargo);
      });
app.get("/cargos/departamento/:departamentoId", (req, res) => {
  const { departamentoId } = req.params;
  const cargosPorDepartamento = cargos.filter(c => c.departamentoId == departamentoId);
  if (cargosPorDepartamento.length === 0) return res.status(404).json({ message: 'Nenhum cargo encontrado para este departamento!' });
  res.status(200).json(cargosPorDepartamento);
    });
      app.get("/funcionarios", (req, res) => {
      const { nome } = req.query;
      const funcionariosPorNome = funcionarios.filter(f => f.nome.toLowerCase().includes(nome.toLowerCase()));
       if (funcionariosPorNome.length === 0) return res.status(404).json({ message: 'Nenhum funcionário encontrado!' });
    res.status(200).json(funcionariosPorNome);
  });
      app.put("/departamentos/:id", (req, res) => {
    const { id } = req.params;
     const { departamento } = req.body;
     const deptIndex = departamentos.findIndex(d => d.id == id);
       if (deptIndex === -1) return res.status(404).json({ message: 'Departamento não encontrado!' });
       departamentos[deptIndex].departamento = departamento;
      res.status(200).json(departamentos[deptIndex]);
      });
    app.put("/cargos/:id", (req, res) => {
   const { id } = req.params;
    const { cargo, departamentoId } = req.body;
     const cargoIndex = cargos.findIndex(c => c.id == id);
        if (cargoIndex === -1) return res.status(404).json({ message: 'Cargo não encontrado!' });
          cargos[cargoIndex].cargo = cargo;
            cargos[cargoIndex].departamentoId = departamentoId;
                res.status(200).json(cargos[cargoIndex]);
                  });
      app.put("/funcionarios/:id", (req, res) => {
      const { id } = req.params;
      const { nome, sobrenome, cargoId } = req.body;
        const funcionarioIndex = funcionarios.findIndex(f => f.id == id);
          if (funcionarioIndex === -1) return res.status(404).json({ message: 'Funcionário não encontrado!' });
      funcionarios[funcionarioIndex].nome = nome;
          funcionarios[funcionarioIndex].sobrenome = sobrenome;
          funcionarios[funcionarioIndex].cargoId = cargoId;
        res.status(200).json(funcionarios[funcionarioIndex]);
          });

        app.delete("/departamentos/:id", (req, res) => {
      const { id } = req.params;
          const deptIndex = departamentos.findIndex(d => d.id == id);
          if (deptIndex === -1) return res.status(404).json({ message: 'Departamento não encontrado!' });
        departamentos.splice(deptIndex, 1);
          res.status(200).json({ message: 'Departamento deletado com sucesso!' });
          });

          app.delete("/cargos/:id", (req, res) => {
        const { id } = req.params;
        const cargoIndex = cargos.findIndex(c => c.id == id);
        if (cargoIndex === -1) return res.status(404).json({ message: 'Cargo não encontrado!' });
        cargos.splice(cargoIndex, 1);
        res.status(200).json({ message: 'Cargo deletado com sucesso!' });
      });

            app.delete("/funcionarios/:id", (req, res) => {
            const { id } = req.params;
             const funcionarioIndex = funcionarios.findIndex(f => f.id == id);
                 if (funcionarioIndex === -1) return res.status(404).json({ message: 'Funcionário não encontrado!' });
              funcionarios.splice(funcionarioIndex, 1);
              res.status(200).json({ message: 'Funcionário deletado com sucesso!' });
              });

app.listen(3000, () => {
  Console.log("Servidor rodando na porta 3000");
});
