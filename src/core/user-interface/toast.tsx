import { createContext, memo, useCallback, useContext, useState, type PropsWithChildren } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";


type Toast = { id: string; variant: 'error' | 'success', message: string }

type Notify = { (payload: Omit<Toast, 'id'>): void }

const ToastContext = createContext<Notify | undefined>(undefined)

/**
 * Provedor de notificações globais (Toast/Snackbar).
 * 
 * Gerencia uma pilha de notificações temporárias que podem ser disparadas
 * de qualquer lugar da aplicação através do hook `useToast`.
 * 
 * @example
 * // 1. Envolva a aplicação:
 * <ToastProvider>...</ToastProvider>
 * 
 * // 2. Use no componente:
 * const notify = useToast();
 * notify({ variant: 'success', message: 'Salvo com sucesso!' });
 */
export const ToastProvider = memo(({ children }: PropsWithChildren) => {
    const [state, setState] = useState<Toast[]>([])
    const notify: Notify = useCallback((payload) => {
        setState(prev => [{ id: String(Math.random()), ...payload }, ...prev])
    }, [])
    return (
        <ToastContext.Provider value={notify}>
            {children}
            {state.map(({ id, variant, message }) => {
                const onClose = () => setState(prev => prev.filter(toast => toast.id !== id))
                return (
                    <Snackbar key={id} open autoHideDuration={6000} onClose={onClose}>
                        <Alert
                            onClose={onClose}
                            severity={variant}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                )
            })}
        </ToastContext.Provider>
    )
})

export const useToast = () => {
    return useContext(ToastContext)!
}

