import {fireEvent, render} from '@testing-library/react-native';
import RoundButton from '../../components/RoundButton';

describe('<RoundButton/> Component', () => {
    it('should render a round button having the given icon', () => {
        const {getByTestId} = render(<RoundButton icon="arrow-left" />);
        expect(getByTestId('gradient-wrapper').props.children.props.icon).toBe('arrow-left')
    });

    it('should apply given icon color to icon', () => {
        const {getByTestId} = render(<RoundButton icon="arrow-left" iconColor="pink" />);
        expect(getByTestId('gradient-wrapper').props.children.props.color).toBe('pink')
    });

    it('should apply given gradient to button', () => {
        const {getByTestId} = render(<RoundButton gradient={['red','blue']} />);
        expect(getByTestId('gradient-wrapper').props.proxiedProperties.colors).toEqual([ 4294901760, 4278190335 ]);
    });

    it('should invoke given callback when button is pressed', () => {
        const onPressMock = jest.fn();
        const { getByA11yLabel} = render(<RoundButton onPress={onPressMock} />);
        fireEvent.press(getByA11yLabel('round button'));
        expect(onPressMock).toBeCalledTimes(1);
    });

    it('should apply given accessibility label to parent button', () => {
        const onPressMock = jest.fn();
        const { getByA11yLabel} = render(<RoundButton onPress={onPressMock} accessibilityLabel={"heyo btn"} />);
        expect(getByA11yLabel('heyo btn')).toBeTruthy()
    });
});