import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePets } from '../contexts/PetContext';
import { useAuth } from '../contexts/AuthContext';
import MobileHeader from './layout/MobileHeader';

export default function CadastroPet() {
  const navigate = useNavigate();
  const { addPet } = usePets();
  const { user } = useAuth();
  const [donoNome, setDonoNome] = useState(user?.name || '');
  const [donoNasc, setDonoNasc] = useState('');
  const [donoLocal, setDonoLocal] = useState('');
  const [donoFoto, setDonoFoto] = useState('');
  const [petNome, setPetNome] = useState('');
  const [petTipo, setPetTipo] = useState('');
  const [petSexo, setPetSexo] = useState('');
  const [petRaca, setPetRaca] = useState('');
  const [petPeso, setPetPeso] = useState('');
  const [petNasc, setPetNasc] = useState('');
  const [petDesc, setPetDesc] = useState('');
  const [petFotos, setPetFotos] = useState([]);

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
    Promise.all(promises).then(images => setPetFotos(images));
  };

  const calcularIdade = (dataNasc) => {
    const hoje = new Date();
    const nasc = new Date(dataNasc);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const mes = hoje.getMonth() - nasc.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) idade--;
    return `${idade} anos`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!donoNome || !donoNasc || !donoLocal || !petNome || !petTipo || !petSexo || !petRaca || !petPeso || !petNasc || !petDesc) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const novoPet = {
      nome: petNome,
      tipo: petTipo,
      sexo: petSexo,
      raca: petRaca,
      peso: parseFloat(petPeso),
      idade: calcularIdade(petNasc),
      local: donoLocal,
      saude: { pedigree: false, exames: 'Em análise', vacinas: 'Em análise' },
      descricao: petDesc,
      fotos: petFotos.length ? petFotos : ['/img/avatar.png.jpg'],
      dono: {
        nome: donoNome,
        foto: donoFoto || '/img/avatar.png.jpg',
        telefone: user?.phone || '(83) 99999-9999'
      }
    };

    try {
      await addPet(novoPet);
      alert('Pet cadastrado com sucesso!');
      navigate('/perfil');
    } catch (error) {
      console.error('Erro ao cadastrar pet:', error);
      alert('Erro ao cadastrar pet. Verifique os dados ou tente novamente.');
    }
  };

  return (
    <div className="app-container">
      <MobileHeader title="Cadastrar Pet" />
      <main className="main-content">
        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="form-section">
            <div className="section-header"><span className="material-icons">person</span><h3>Dados do Tutor(a)</h3></div>
            <div className="form-group"><label>Nome completo</label><input type="text" value={donoNome} onChange={e => setDonoNome(e.target.value)} required /></div>
            <div className="form-row">
              <div className="form-group"><label>Data de nascimento</label><input type="date" value={donoNasc} onChange={e => setDonoNasc(e.target.value)} required /></div>
              <div className="form-group"><label>Localização</label><input type="text" value={donoLocal} onChange={e => setDonoLocal(e.target.value)} required /></div>
            </div>
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
            <div className="form-group"><label>Data de nascimento</label><input type="date" value={petNasc} onChange={e => setPetNasc(e.target.value)} required /></div>
            <div className="form-group"><label>Fotos do Pet</label><input type="file" accept="image/*" multiple onChange={handlePetFotos} /></div>
            {petFotos.length > 0 && <div className="preview-container">{petFotos.map((f, i) => <img key={i} src={f} alt="Preview" />)}</div>}
            <div className="form-group"><label>Descrição</label><textarea rows="4" value={petDesc} onChange={e => setPetDesc(e.target.value)} required></textarea></div>
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-large">Cadastrar Pet</button>
        </form>
      </main>
    </div>
  );
}