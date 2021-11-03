import {fireEvent, render} from '@testing-library/react-native';
import NetworkSelectorDialog from '../../components/NetworkSelectorDialog';

describe('<NetworkSelectorDialog/> component', () => {
    it('renders a modal showing 4 network provider options to select from', () => {
        const {getAllByA11yLabel, container} = render(<NetworkSelectorDialog visible={true} />);
        expect(container.children[0].props.children[0].props.children).toBe('SELECT NETWORK')
        expect(getAllByA11yLabel('network provider button').length).toBe(4); 
    });

    it('given a callback via `onDialogDismiss`, invokes the callback when dialog modal dismissed', () => {
        const dismissMock = jest.fn();
        const {container, update} = render(<NetworkSelectorDialog visible={true} onDialogDismiss={dismissMock}/>);
        update(<NetworkSelectorDialog visible={false} />)
        //unfinished
    })

    it('given a callback function via `onNetworkSelect`, invokes the callback with selected provider`s name and image source', () => {
        const networkSelectMock = jest.fn()
        const {getAllByA11yLabel} = render(<NetworkSelectorDialog visible={true} onNetworkSelect={networkSelectMock}/>);
        const buttons = getAllByA11yLabel('network provider button');
        fireEvent.press(buttons[0]);
        expect(networkSelectMock).toBeCalledTimes(1);
        expect(networkSelectMock).toBeCalledWith('MTN NIGERIA', expect.any(Number))
    })

    it('hides component when visibility is turned off', () => {
        expect(render(<NetworkSelectorDialog visible={false} />).queryByA11yLabel('network provider button')).toBeFalsy()
    })
})