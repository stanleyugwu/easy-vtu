import {fireEvent, render} from '@testing-library/react-native';
import { Text } from 'react-native';
import PressResizerView from '../../components/PressResizerView';

describe('<PressResizerView/> Component', () => {
    it('should render its children inside a wrapper element', () => {
        const {container} = render(<PressResizerView children={<Text>HELLO CHILD</Text>}/>);
        expect(container.props.children.props.children).toBe('HELLO CHILD');
    });

    it('should reduce the scale size of its children when pressed', () => {
        // we are asserting for scale change when pressed by attaching a 
        // press event to child element instead of parent wrapper; parent element doesn't support press
        const child = <Text onPress={() => null} testID={"test child"}>CHILD</Text>;
        const {getByTestId,getByA11yLabel} = render(<PressResizerView children={child} />);
        fireEvent.press(getByTestId('test child'));
        expect(getByA11yLabel('PressResizerView wrapper').props.style[1].transform[0].scale).toBe(1);//unfinished assertion
    });
});