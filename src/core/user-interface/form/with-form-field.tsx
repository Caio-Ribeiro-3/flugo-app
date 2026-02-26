import type React from 'react';

import FormHelperText from '@mui/material/FormHelperText';



/**
 * Higher-Order Component (HOC) para integração de campos com mensagens de erro.
 * 
 * Adiciona automaticamente um componente de texto abaixo do 
 * componente de entrada, gerenciando a exibição da mensagem de erro e o estado 
 * visual crítico.
 * 
 * @example
 * // 1. Envolva seu componente de input:
 * const MyInputWithField = withFormField(MyInput);
 * 
 * // 2. Utilize passando a prop 'error':
 * <MyInputWithField 
 *   label="E-mail" 
 *   error="Endereço de e-mail inválido" 
 * />
 */
export function withFormField<T extends {}>(Component: React.ComponentType<T>) {
    return function ({ error, ...rest }: Partial<T> & { id?: string; name?: string; error?: string; onBlur?: () => void }) {
        return (
            <div>
                <Component  {...rest as T} />
                <FormHelperText error={!!error} >
                    {error}
                </FormHelperText>
            </div>
        )
    }
}