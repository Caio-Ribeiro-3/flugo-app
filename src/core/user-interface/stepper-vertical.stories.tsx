import type { Meta, StoryObj } from '@storybook/react';
import { StepperVertical } from './stepper-vertical';

const meta: Meta<typeof StepperVertical> = {
    title: 'Components/StepperVertical',
    component: StepperVertical,
};

export default meta;
type Story = StoryObj<typeof StepperVertical>;

export const FullFlow: Story = {
    render: () => (
        <StepperVertical>
            <StepperVertical.StepperVerticalItem isCompleted>
                <StepperVertical.StepperVerticalSeparator>
                    <StepperVertical.StepperVerticalDot>1</StepperVertical.StepperVerticalDot>
                    <StepperVertical.StepperVerticalConnector />
                </StepperVertical.StepperVerticalSeparator>
                <StepperVertical.StepperVerticalContent>Dados Pessoais</StepperVertical.StepperVerticalContent>
            </StepperVertical.StepperVerticalItem>

            <StepperVertical.StepperVerticalItem isCurrent>
                <StepperVertical.StepperVerticalSeparator>
                    <StepperVertical.StepperVerticalDot>2</StepperVertical.StepperVerticalDot>
                    <StepperVertical.StepperVerticalConnector />
                </StepperVertical.StepperVerticalSeparator>
                <StepperVertical.StepperVerticalContent>Endereço de Entrega</StepperVertical.StepperVerticalContent>
            </StepperVertical.StepperVerticalItem>

            <StepperVertical.StepperVerticalItem>
                <StepperVertical.StepperVerticalSeparator>
                    <StepperVertical.StepperVerticalDot>3</StepperVertical.StepperVerticalDot>
                </StepperVertical.StepperVerticalSeparator>
                <StepperVertical.StepperVerticalContent>Pagamento</StepperVertical.StepperVerticalContent>
            </StepperVertical.StepperVerticalItem>
        </StepperVertical>
    ),
};
