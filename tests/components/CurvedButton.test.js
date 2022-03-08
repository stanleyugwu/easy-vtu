import {fireEvent, render} from '@testing-library/react-native';
import { Text } from 'react-native';
import CurvedButton from '../../components/CurvedButton';

describe('<CurvedButton/> Component', () => {
    it('should render a curved button with given text label', () => {
        const {getByA11yLabel} = render(<CurvedButton label="TEST BTN" dropShadow={false}/>);
        expect(getByA11yLabel('button label').props.children).toBe('TEST BTN')
    });

    const renderNode = <Text testID={"test text"}/>
    it('should render a given node left to the button', () => {
        const {getByTestId} = render(<CurvedButton leftNode={renderNode} label={"LABEL"} dropShadow={false}/>);
        expect(getByTestId('inner view').props.children[0].props.testID).toBe('test text')
    });

    it('should render a given node right to the button', () => {
        const {getByTestId} = render(<CurvedButton rightNode={renderNode} label={"LABEL"} dropShadow={false}/>);
        expect(getByTestId('inner view').props.children[2].props.testID).toBe('test text')
    });

    it('should render an Icon with given name left to button', () => {
        const {getByTestId} = render(<CurvedButton leftIconName="apps" label={"LABEL"} dropShadow={false}/>);
        expect(getByTestId('inner view').props.children[0].props.name).toBe('apps')
    });

    it('should render an Icon with given name right to button', () => {
        const {getByTestId} = render(<CurvedButton rightIconName="apps" label={"LABEL"} dropShadow={false}/>);
        expect(getByTestId('inner view').props.children[2].props.name).toBe('apps')
    });

    it('should apply given gradient color to button', () => {
        const gradient = ['red','blue'];
        const {getByTestId} = render(<CurvedButton label={"LABEL"} dropShadow={false} gradient={gradient}/>);
        expect(getByTestId('gradient wrapper').props.proxiedProperties.colors).toEqual([ 4294901760, 4278190335 ]);
    });

    it('should apply given background color to button', () => {
        const {getByTestId} = render(<CurvedButton label={"LABEL"} dropShadow={false} bgColor={"red"}/>);
        expect(getByTestId("gradient wrapper").props.proxiedProperties.colors).toEqual([4294901760,4294901760]);
    });

    it('should apply given color to label text', () => {
        const {getByA11yLabel} = render(<CurvedButton labelColor="pink" label={"LABEL"} dropShadow={false}/>);
        expect(getByA11yLabel('button label').props.style.color).toBe('pink');
    });

    it('should invoke a given callback when the button is pressed', () => {
        const onPressMock = jest.fn();
        const {getByA11yRole} = render(<CurvedButton onPress={onPressMock} label={"LABEL"} dropShadow={false}/>);
        fireEvent.press(getByA11yRole('button'));
        expect(onPressMock).toBeCalledTimes(1);
    });

    it('should apply given style to button', () => {
        const {getByA11yRole} = render(<CurvedButton containerStyle={{backgroundColor:"purple"}} label={"LABEL"} dropShadow={false}/>);
        expect(getByA11yRole('button').props.style.backgroundColor).toBe('purple')
    });

    it('should render with drop shadow if `dropShadow` is `true`', () => {
        const {queryByA11yLabel} = render(<CurvedButton label={"LABEL"} dropShadow={true}/>);
        expect(queryByA11yLabel('BoxShadowView component wrapper')).toBeTruthy();
    });

    it('should render without drop shadow if `dropShadow` is `false`', () => {
        const {queryByA11yLabel} = render(<CurvedButton label={"LABEL"} dropShadow={false}/>);
        expect(queryByA11yLabel('BoxShadowView component wrapper')).toBeFalsy();
    });
});