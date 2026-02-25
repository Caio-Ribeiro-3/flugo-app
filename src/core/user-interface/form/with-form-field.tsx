import FormHelperText from '@mui/material/FormHelperText';
import type { ReactNode } from 'react';



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
export function withFormField<T>(Component: (props: T) => ReactNode) {
    return function ({ error, ...rest }: T & { error?: string; }) {
        return (
            <div>
                <Component {...rest} />
                <FormHelperText error={!!error} >
                    {error}
                </FormHelperText>
            </div>
        )
    }
}