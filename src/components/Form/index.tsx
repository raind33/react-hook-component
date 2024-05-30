import InternalForm from './Form';
import Item from './Item';

type FormType = typeof InternalForm

interface FormInterface extends FormType {
  Item: typeof Item
}

const Form = InternalForm as FormInterface
Form.Item = Item

export default Form