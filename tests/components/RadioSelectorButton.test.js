import {fireEvent, render} from '@testing-library/react-native';
import RadioSelectorButton from '../../components/RadioSelectorButton';

describe('<RadioSelectorButton/> component', () => {
    it('renders a button with given label text', () => {
        const label = "A BUTTON"
        const {getByA11yLabel} = render(<RadioSelectorButton label={label} />);
        expect(getByA11yLabel('button text').props.children).toBe(label) 
    });

    it('renders a radio input inside the button', () => {
        expect(render(<RadioSelectorButton/>).getByA11yLabel('radio input')).toBeTruthy()
    });

    it('invokes a given callback when button is pressed', () => {
        const onPressMock = jest.fn();
        const {container} = render(<RadioSelectorButton onPress={onPressMock} />);
        fireEvent.press(container)
        expect(onPressMock).toBeCalledTimes(1);
        expect(onPressMock).toBeCalled();
    });

    it('given `checked` as true, renders a checked radio input', () => {
        const {getByA11yLabel} = render(<RadioSelectorButton checked={true} />)
        expect(getByA11yLabel('radio input').props.accessibilityState.checked).toBe(true);
    });

    it('given `checked` as false, renders an unchecked radio input', () => {
        const {getByA11yLabel} = render(<RadioSelectorButton checked={false} />)
        expect(getByA11yLabel('radio input').props.accessibilityState.checked).toBe(false);
    });
})