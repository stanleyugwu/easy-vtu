import {fireEvent, render} from '@testing-library/react-native';
import NetworkProviderButton from '../../components/NetworkProviderButton';
import renderer from 'react-test-renderer';

describe(
    `
    NetworkProviderButton component.
    This component renders a ui pressable card that shows a network provider's image and name
    `, 

    () => {
        it('given a callback function, calls callback when the card is pressed', () => {
            const mockFn = jest.fn();
            const {container} = render(<NetworkProviderButton onPress={mockFn}/>)
            fireEvent(container,'onPress');
            expect(mockFn).toBeCalled();
        })

        it('given an image src of a network provider, renders the image', () => {
            const imgSrc = require('../../../assets/service-icons/default_network.png');
            const {getByA11yRole} = render(<NetworkProviderButton networkImageSrc={imgSrc}/>);
            const avatar = getByA11yRole('imagebutton');
            expect(avatar.props.children[1].props.source).toBe(imgSrc)
            expect(renderer.create(<NetworkProviderButton/>).toJSON()).toMatchSnapshot()
        })

        it('given provider name, renders a label with the name', () => {
            const networkName = "MTN NIGERIA";
            const {getByA11yRole} = render(<NetworkProviderButton networkName={networkName}/>)
            expect(getByA11yRole('text').props.children).toBe(networkName);
        })
    }
)