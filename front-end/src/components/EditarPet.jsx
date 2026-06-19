import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePets } from '../contexts/PetContext';
import MobileHeader from './layout/MobileHeader';

export default function EditarPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPetById, updatePet } = usePets();
  const [pet, setPet] = useState(null);

  // Estados do formulário
  const [donoNome, setDonoNome] = useState('');
  const [donoLocal, setDonoLocal] = useState('');
  const [donoFoto, setDonoFoto] = useState('');
  const [petNome, setPetNome] = useState('');
  const [petTipo, setPetTipo] = useState('');
  const [petSexo, setPetSexo] = useState('');
  const [petRaca, setPetRaca] = useState('');
  const [petPeso, setPetPeso] = useState('');
  const [petDesc, setPetDesc] = useState('');
  const [petFotos, setPetFotos] = useState([]);
  const [exames, setExames] = useState('');
  const [vacinas, setVacinas] = useState('');

  useEffect(() => {
    getPetById(id).then(data => {
      setPet(data);
      setDonoNome(data.dono.nome);
      setDonoLocal(data.local);
      setPetNome(data.nome);
      setPetTipo(data.tipo);
      setPetSexo(data.sexo);
      setPetRaca(data.raca);
      setPetPeso(data.peso);
      setPetDesc(data.descricao);
      setExames(data.saude.exames);
      setVacinas(data.saude.vacinas);
    });
  }, [id, getPetById]);

  const handleDonoFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setDonoFoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePetFotos = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then(images => setPetFotos([...pet?.fotos || [], ...images]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!donoNome || !donoLocal || !petNome || !petTipo || !petSexo || !petRaca || !petPeso || !petDesc) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const updatedPet = {
      ...pet,
      nome: petNome,
      tipo: petTipo,
      sexo: petSexo,
      raca: petRaca,
      peso: parseFloat(petPeso),
      local: donoLocal,
      descricao: petDesc,
      fotos: petFotos.length ? petFotos : pet.fotos,
      dono: {
        ...pet.dono,
        nome: donoNome,
        foto: donoFoto || pet.dono.foto,
      },
      saude: {
        ...pet.saude,
        exames: exames,
        vacinas: vacinas,
      },
    };

    await updatePet(id, updatedPet);
    alert('Pet atualizado com sucesso!');
    navigate('/perfil');
  };

  if (!pet) return <div className="app-container">Carregando dados do pet...</div>;

  return (
    <div className="app-container">
      <MobileHeader title="Editar Pet" />
      <main className="main-content">
        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="form-section">
            <div className="section-header"><span className="material-icons">person</span><h3>Dados do Tutor(a)</h3></div>
            <div className="form-group"><label>Nome completo</label><input type="text" value={donoNome} onChange={e => setDonoNome(e.target.value)} required /></div>
            <div className="form-group"><label>Localização</label><input type="text" value={donoLocal} onChange={e => setDonoLocal(e.target.value)} required /></div>
            <div className="form-group">
              <label>Foto do Tutor(a)</label>
              <input type="file" accept="image/*" onChange={handleDonoFoto} />
              {donoFoto && <img src={donoFoto} alt="Preview" className="preview-image" />}
            </div>
          </div>

          <div className="form-section">
            <div className="section-header"><span className="material-icons">pets</span><h3>Dados do Pet</h3></div>
            <div className="form-group"><label>Nome do Pet</label><input type="text" value={petNome} onChange={e => setPetNome(e.target.value)} required /></div>
            <div className="form-row">
              <div className="form-group"><label>Tipo</label><select value={petTipo} onChange={e => setPetTipo(e.target.value)} required><option value="">Selecione</option><option value="gato">Felino</option><option value="cachorro">Cão</option><option value="passaro">Pássaro</option><option value="roedor">Roedor</option><option value="peixe">Peixe</option><option value="reptil">Réptil</option></select></div>
              <div className="form-group"><label>Sexo</label><select value={petSexo} onChange={e => setPetSexo(e.target.value)} required><option value="">Selecione</option><option value="Macho">Macho</option><option value="Fêmea">Fêmea</option></select></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Raça</label><input type="text" value={petRaca} onChange={e => setPetRaca(e.target.value)} required /></div>
              <div className="form-group"><label>Peso (kg)</label><input type="number" step="0.1" value={petPeso} onChange={e => setPetPeso(e.target.value)} required /></div>
            </div>
            <div className="form-group"><label>Fotos do Pet</label><input type="file" accept="image/*" multiple onChange={handlePetFotos} /></div>
            <div className="form-group"><label>Descrição</label><textarea rows="4" value={petDesc} onChange={e => setPetDesc(e.target.value)} required></textarea></div>
          </div>

          <div className="form-section">
            <div className="section-header"><span className="material-icons">health_and_safety</span><h3>Saúde e Documentos</h3></div>
            <div className="form-group">
              <label>Situação dos Exames</label>
              <select value={exames} onChange={e => setExames(e.target.value)} required>
                <option value="Em análise">Em análise</option>
                <option value="Aprovado">Aprovado</option>
                <option value="Reprovado">Reprovado</option>
              </select>
            </div>
            <div className="form-group">
              <label>Situação das Vacinas</label>
              <select value={vacinas} onChange={e => setVacinas(e.target.value)} required>
                <option value="Em análise">Em análise</option>
                <option value="Em dia">Em dia</option>
                <option value="Atrasado">Atrasado</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-large">Salvar Alterações</button>
        </form>
      </main>
    </div>
  );
}