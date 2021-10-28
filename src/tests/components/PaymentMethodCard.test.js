import {render, fireEvent} from '@testing-library/react-native';
import PaymentMethodCard from '../../components/PaymentMethodCard';

describe('PaymentMethodCard Component', () => {
    it('given a label text, renders a card with capitalized label text', () => {
        const label = "HELLO PAYMENT";
        const {getByA11yLabel} = render(<PaymentMethodCard label={label}/>)
        const text = getByA11yLabel('payment-method-label');
        expect(text.props.children).toBe(label);
    })

    it('given an icon name, renders a card with icon at the left', () => {
        const iconName = "card";
        const {getByA11yLabel} = render(<PaymentMethodCard iconName={iconName} />);
        const icon = getByA11yLabel('payment-method-icon');
        expect(icon.props.accessibilityLabel).toBe('payment-method-icon')
    })
    
    it('given a callback function, invokes the callback when the card is pressed', () => {
        const mockFn = jest.fn();
        const {container} = render(<PaymentMethodCard onPress={mockFn} />);
        fireEvent(container,'onPress');
        expect(mockFn).toBeCalled();
    })
})