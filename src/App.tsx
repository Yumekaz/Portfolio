import Header from './sections/Header';
import EngineeringNotes from './sections/EngineeringNotes';
import CurrentWork from './sections/CurrentWork';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="container">
      <Header />
      <EngineeringNotes />
      <CurrentWork />
      <Footer />
    </div>
  );
}

export default App;
