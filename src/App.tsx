import dayjs from 'dayjs';
import Calendar from './components/Calendar';

function App() {
  return (
    <div className="App">
      <Calendar locale='en-US' className="a" value={dayjs('2024-10-23')}></Calendar>
    </div>
  );
}

export default App;
