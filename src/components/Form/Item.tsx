import classNames from "classnames";
import React, {
  CSSProperties,
  ChangeEvent,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import Schema from 'async-validator';
import FormContext from "./context";

interface ItemProps extends React.HTMLAttributes<HTMLElement> {
  style?: CSSProperties;
  className?: string;
  name?: string;
  label?: string;
  valuePropName?: string;
  children: ReactElement;
  rules?: Record<string, any>[];
}

const getValueFromEvent = (e: ChangeEvent<HTMLInputElement>) => {
  const target = e.target;
  if (target.type === "radio") {
    return target.value;
  } else if (target.type === "checkbox") {
    return target.checked;
  }
  return target.value;
};
const Item: FC<ItemProps> = (props) => {
  const {
    style,
    className,
    name,
    label,
    children,
    valuePropName,
    rules,
  } = props;
  
  const { values, onValueChange, validateRegister } = useContext(FormContext);
  const [ error, setError ] = useState('')
  const [value, setValue] = useState<string | number | boolean>(
  );

  useEffect(() => {
    if(value !== values?.[name!]) {
      setValue(values?.[name!])
    }
  }, [value, values?.[name!]])
  useEffect(() => {
    if(name){
      validateRegister?.(name, () => handleValidate(value))
    }
  }, [name, value])
  if (!name) {
    return children;
  }
 
  const handleValidate = (value: any) => {
    let errorMsg = null;
    if (Array.isArray(rules) && rules.length) {
      const validator = new Schema({
        [name]: rules.map((rule) => {
          return {
            type: "string",
            ...rule,
          };
        }),
      });

      validator.validate({ [name]: value }, (errors) => {
        if (errors) {
          if (errors?.length) {
            setError(errors[0].message!);
            errorMsg = errors[0].message;
          }
        } else {
          setError("");
          errorMsg = null;
        }
      });
    }

    return errorMsg;
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = getValueFromEvent(e);
    setValue(value);
    handleValidate(value)
    onValueChange?.(name, value);
  };
  const cls = classNames("form-item", className);
  const propsName: Record<string, any> = {};
  if (valuePropName) {
    propsName[valuePropName] = value;
  } else {
    propsName.value = value;
  }

  


  const child =
    React.Children.toArray(children).length !== 1
      ? children
      : React.cloneElement(children, {
          ...propsName,
          onChange,
        });
        return (
          <div className={cls} style={style}>
              <div>
                  {
                      label && <label>{label}</label>
                  }
              </div>
              <div>
                  {child}
                  {error && <div style={{color: 'red'}}>{error}</div>}
              </div>
          </div>
      )
};

export default Item;
