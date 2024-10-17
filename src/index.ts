import Calendar, { CalendarProps } from './components/Calendar';
import Watermark, { WatermarkProps } from './components/Watermark';
import { MessageProps, Position, MessageRef} from './components/Message';
import { useMessage } from './components/Message/useMessage';
import { ConfigProvider } from './components/Message/ConfigProvider';

export {
    Calendar,
    Watermark,
    ConfigProvider,
    useMessage
}

export type {
    CalendarProps,
    WatermarkProps,
    MessageProps,
    Position,
    MessageRef
}
