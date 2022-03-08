import {render, fireEvent} from '@testing-library/react-native';
import RecipientTypeDialog from '../../components/RecipientTypeDialog';

const RecipientTypeDialogTest = () => {
    const onDismissMock = jest.fn();

    describe('<ReipientTypeDialog/> Component', () => {
        it('hides dialog modal when `visible` is false', () => {
            const {queryByA11yLabel} = render(<RecipientTypeDialog visible={false} onDismiss={onDismissMock}/>);
            expect(queryByA11yLabel('dialog wrapper')).toBe(null);
        });
    
        it('shows dialog modal when `visible` is true', () => {
            const {queryByA11yLabel} = render(<RecipientTypeDialog onDismiss={onDismissMock}/>);//visible defaults to true
            expect(queryByA11yLabel('recipient modal title')).toBeTruthy();
        });

        it('invokes a given callback when the dialog modal is dismissed', () => {
            const {container} = render(<RecipientTypeDialog onDismiss={onDismissMock} />);
            expect(container.props.onDismiss).toBe(onDismissMock);
        });
    
        it('given `self` as type, selects/checks first radio button', () => {
            const {getAllByA11yLabel} = render(<RecipientTypeDialog type={"self"} onDismiss={onDismissMock} />);
            const radios = getAllByA11yLabel('radio input');
            expect(radios[0].props.accessibilityState.checked).toBe(true);
        });
    
        it('given `others` as type, selects/checks second radio button', () => {
            const {getAllByA11yLabel} = render(<RecipientTypeDialog type={"others"} onDismiss={onDismissMock} />);
            const radios = getAllByA11yLabel('radio input');
            expect(radios[1].props.accessibilityState.checked).toBe(true);
        });
    
        it(
            ` calls a given callback with 2 arguments:
            1. number corresponding to the index of the button that was pressed from the dialog; starting from 1.
            2. string 'self' or 'others' corresponding to recipient type`,
        () => {
            const onSelectMock = jest.fn()
            const {getAllByTestId} = render(<RecipientTypeDialog onSelect={onSelectMock} onDismiss={onDismissMock} />);
            const buttons = getAllByTestId('recipient button');
    
            //press first button and assert callback was invoked
            fireEvent.press(buttons[0]);
            expect(onSelectMock).toBeCalledWith(1,'self');
    
            //press second button and assert callback was invoked
            fireEvent.press(buttons[1]);
            expect(onSelectMock).toBeCalledWith(2,'others');
        });
    });
}

RecipientTypeDialogTest();

export default RecipientTypeDialogTest
