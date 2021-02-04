import React from 'react'
import './common.css'

const InRowComponents: React.FC = props => (
  <div id='in-row-component' className='inline'>
    {props.children}
  </div>
)

interface ValidInvalidProps {
  isValid: boolean
}

const ValidInvalid: React.FC<ValidInvalidProps> = props => (
  <div id='valid-invalid' className={props.isValid ? '' : 'invalid'}>
    {props.children}
  </div>
)

export { InRowComponents, ValidInvalid }
