import {fireEvent, render} from '@testing-library/react-native';
import { Text } from 'react-native';
import FormInputField from '../../components/FormInputField';

const FormInputFieldTest = () => {
    describe('<FormInputField/> Component', () => {
        it('should render input field with given label text', () => {
            const {getByA11yLabel} = render(<FormInputField fieldLabel={"Phone Number"} />);
            expect(getByA11yLabel('field label').props.children).toBe('Phone Number');
        });
    
        it('should render a label icon with given name beside label text', () => {
            const {getByTestId} = render(<FormInputField fieldLabelIcon={"apps"} />);
            expect(getByTestId('label wrapper').props.children[0].props.name).toBe('apps');
        });
    
        it('should render a given text as subtitle below label text', () => {
            const {getByA11yLabel} = render(<FormInputField fieldLabelSubtitle={"this is a small text"} />);
            expect(getByA11yLabel('field label subtitle').props.children).toBe("this is a small text");
        });
    
        it('should render pressable button when fieldType prop is `button`', () => {
            const {getByA11yLabel} = render(<FormInputField fieldType={"button"} />);
            expect(getByA11yLabel('input field button')).toBeTruthy();
        });
    
        it('should render text input when fieldType prop is `input`', () => {
            const {getByA11yLabel} = render(<FormInputField fieldType={"input"} />);
            expect(getByA11yLabel('input field text')).toBeTruthy();
        });
    
        it('should render a given text value inside `input` field', () => {
            const {getByA11yLabel} = render(<FormInputField fieldType={"input"} fieldValue={"VALUE"} />);
            expect(getByA11yLabel('input field text').props.value).toBe("VALUE");
        });
    
        it('should render a given text label inside `button` field', () => {
            const {getByA11yLabel} = render(<FormInputField fieldType={"button"} fieldValue={"CLICK ME"} />);
            expect(getByA11yLabel('input field button').props.children[0].props.children[0].props.children).toBe("CLICK ME");
        });
        
        it('should render multi-line text input of given number of lines', () => {
            const {getByA11yLabel} = render(<FormInputField fieldType={"input"} inputLines={3} />);
            expect(getByA11yLabel('input field text').props.multiline).toBeTruthy();
            expect(getByA11yLabel('input field text').props.numberOfLines).toBe(3);
        });
    
        it('should invoke a given callback with entered text as `input` field value is changed', () => {
            const onTextChangeMock = jest.fn();
            const {getByA11yLabel} = render(<FormInputField fieldType={"input"} onChangeText={onTextChangeMock} />);
            const input = getByA11yLabel('input field text');
            fireEvent.changeText(input,'some text');
            expect(onTextChangeMock).toBeCalledWith('some text');
        });
    
        it('should invoke a given callback when input field button is pressed', () => {
            const onBtnPressMock = jest.fn();
            const {getByA11yLabel} = render(<FormInputField fieldType={"button"} onButtonPress={onBtnPressMock} />);
            const button = getByA11yLabel('input field button');
            fireEvent.press(button);
            expect(onBtnPressMock).toBeCalledTimes(1);
        });
    
        it('should render an icon with given name to the right of `button` field', () => {
            const {getByA11yLabel} = render(<FormInputField fieldType={"button"} rightInputIcon={"apps"} />);
            expect(getByA11yLabel('input field button').props.children[0].props.children[1].props.name).toBe("apps");
        });
    
        it('should render an icon with given name to the right of `input` field', () => {
            const {getByTestId} = render(<FormInputField fieldType={"input"} rightInputIcon={"home"}/>);
            expect(getByTestId('right input icon').props.style[2].fontFamily).toBe("ionicons");
        });
    
        it('should render a given react node to the right of `button` field', () => {
            const {getByTestId} = render(<FormInputField fieldType={"button"} rightInputNode={<Text testID="right input test node">RIGHT NODE</Text>} />);
            expect(getByTestId('right input test node')).toBeTruthy();
        });
    
        it('should render a given react node to the right of `input` field', () => {
            const {getByTestId} = render(<FormInputField fieldType={"input"} rightInputNode={<Text testID="right input test node">RIGHT NODE</Text>} />);
            expect(getByTestId('right input test node')).toBeTruthy();
        });
    
    });
}

FormInputFieldTest();//run test

export default FormInputFieldTest