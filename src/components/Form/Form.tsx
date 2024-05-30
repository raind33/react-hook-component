import classnames from 'classnames';
import React, { CSSProperties, FC, FormEvent, ReactNode, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import FormContext from './context';

export interface FormRef {
  getFieldsValue: () => Record<string, any>
  setFieldsValue: (values: Record<string, any>) => void
}
interface FormProps extends React.HTMLAttributes<HTMLFormElement>{
  className?: string
  style?: CSSProperties
  initialValues?: Record<string, any>
  onFinish?: (values: Record<string, any>) => void
  onFinishFailed?: (values: Record<string, any>) => void
  children: ReactNode
}
const Form = forwardRef<FormRef, FormProps>((props, ref) => {
  const {
    className,
    style,
    initialValues = {},
    onFinish,
    onFinishFailed,
    children,
    ...otherProps
  } = props

  const [values, setValues] = useState(initialValues)
  const validateMap = useRef(new Map<string, Function>())
  const errors = useRef<Record<string, any>>({})

  const onValueChange = (key: string, value: any) => {
    values[key] = value

  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    for(let [key, callback] of validateMap.current){
      if(typeof callback === 'function'){
        errors.current[key] = callback()
      }
    }
    const errorsList = Object.keys(errors.current).map(key => {
      return errors.current[key]
    }).filter(Boolean)
    if(errorsList.length){
      onFinishFailed?.(errors.current)
    } else {
      onFinish?.(values)
    }
  }
  const cls = classnames('antd-form', className)
  const handleValidateRegister = (name: string, cb: Function) => {
    validateMap.current.set(name, cb)
  }

  useImperativeHandle(ref, () => {
    return {
      getFieldsValue() {
        return values
      },
      setFieldsValue(fieldsValue) {
        setValues({...values, ...fieldsValue})
      }
    }
  }) 
  return <FormContext.Provider value={{
    values,
    onValueChange,
    setValues: (v) => setValues(v),
    validateRegister: handleValidateRegister
  }}>

    <form { ...otherProps } style={style} className={cls} onSubmit={handleSubmit}  >{children}</form>
  </FormContext.Provider>
})
export default Form