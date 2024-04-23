import dayjs from 'dayjs';
import Calendar from './components/Calendar';
import { IconAdd } from './components/Icon/IconAdd';
import { createFromIconfont } from './components/Icon/createFrontIconfont';
const IconFont = createFromIconfont('//at.alicdn.com/t/c/font_2321457_tjabignvdwn.js');
function App() {
  return (
    <div className="App">
       <IconFont type="r-shengdanbingqilin" spin size="40px"></IconFont>
       <IconAdd spin size="40px"></IconAdd>
      <Calendar locale='en-US' className="a" value={dayjs('2024-10-23')}></Calendar>
    </div>
  );
}

export default App;
