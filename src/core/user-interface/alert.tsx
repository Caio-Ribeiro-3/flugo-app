import { createContext, useCallback, useContext, useState, type PropsWithChildren } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { Button } from './button';
import { getId } from '../utils/get-id';



export interface AlertProps {
    onSubmit: () => void;
    onClose: () => void;
    description: string;
}

type Notify = { (payload: Omit<AlertProps, 'onClose'>): void }

const AlertContext = createContext<Notify | undefined>(undefined)

export const AlertProvider = ({ children }: PropsWithChildren) => {
    const [state, setState] = useState<(Omit<AlertProps, 'onClose'> & { id: string; })[]>([])


    const notify: Notify = useCallback((payload) => {
        setState(prev => [{ id: getId(), ...payload }, ...prev])
    }, [])

    return (
        <AlertContext.Provider value={notify}>
            {children}
            {state.map(({ id, description, onSubmit }) => {
                const onClose = () => setState(prev => prev.filter(laert => laert.id !== id))
                return (
                    <Alert
                        key={id}
                        onClose={onClose}
                        description={description}
                        onSubmit={() => {
                            onSubmit()
                            onClose()
                        }}
                    />
                )
            })}
        </AlertContext.Provider>
    )
}

export const useAlert = () => {
    return useContext(AlertContext)!
}

export const Alert = (props: AlertProps) => {
    const { description, onClose, onSubmit } = props;

    return (
        <Dialog onClose={onClose} open>
            <DialogTitle>
                Alerta
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='text'
                    onClick={onClose}
                    color='neutral'
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    form="subscription-form"
                    onClick={onSubmit}
                >
                    Continuar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
