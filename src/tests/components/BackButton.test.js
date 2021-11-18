import { fireEvent, render } from '@testing-library/react-native';
import BackButton from '../../components/BackButton';

describe('<BackButton/> Component', () => {
    it('should render a button with given text label', () => {
        const {getByA11yLabel} = render(<BackButton buttonText={"GO BACK"} />);
        expect(getByA11yLabel("button label").props.children).toBe('GO BACK');
    });

    it('should invoke given callback when button is pressed', () => {
        const onPressMock = jest.fn();
        const {container} = render(<BackButton onPress={onPressMock}/>)
        fireEvent.press(container);
        expect(onPressMock).toBeCalledTimes(1);
    });
});