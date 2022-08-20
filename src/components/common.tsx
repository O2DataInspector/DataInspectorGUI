import React from 'react'
import './common.css'

type ContainerProps =  {
  children: React.ReactNode;
};

const InRowComponents = (props:ContainerProps) => (
  <div id='in-row-component' className='inline'>
    {props.children}
  </div>
)

interface ValidInvalidProps {
  isValid: boolean
  children: React.ReactNode
}

const ValidInvalid: React.FC<ValidInvalidProps> = (props:ValidInvalidProps) => (
  <div id='valid-invalid' className={props.isValid ? '' : 'invalid'}>
    {props.children}
  </div>
)

export { InRowComponents, ValidInvalid }
