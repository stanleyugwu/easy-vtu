import {render,fireEvent} from '@testing-library/react-native';
import {DrawerItem} from '../../components/Drawer';

const drawerItemTest = () => {
    describe('DrawerItem Component', () => {
        const label = 'Home';
        const defaultLabel = 'Click Me';
    
        it(`given a text label, renders drawer item with label`, () => {
            const {getByA11yLabel} = render(<DrawerItem label={label}/>);
            const text = getByA11yLabel(`${label} menu link`);
            expect(text.children[0]).toBe(label);
        })
    
        it(`given no text label, renders drawer item with ${defaultLabel} as default label`, () => {
            const {getByA11yLabel} = render(<DrawerItem/>);
            const text = getByA11yLabel(`${defaultLabel} menu link`);
            expect(text.children[0]).toBe(defaultLabel);
        })
    
        let iconName = 'home-outline';
        it(`given an icon name, renders drawer item with icon having the name`, () => {
            const {getByTestId} = render(<DrawerItem iconName={iconName}/>);
            const icon  = getByTestId('left-icon');
            expect(icon.props.accessibilityLabel).toBe(iconName+' icon');
        })

        it(`given no icon name, renders drawer item with 'apps' icon as default`, () => {
            const {getByTestId} = render(<DrawerItem/>);
            const icon  = getByTestId('left-icon');
            expect(icon.props.accessibilityLabel).toBe('apps icon');
        })
    
        it(`given a callback function, calls the callback when menu item is pressed`, () => {
            const mockFn = jest.fn();
            const {getByTestId} = render(<DrawerItem onItemPress={mockFn}/>);
            fireEvent(getByTestId('left-icon').parent,'onPress');
            expect(mockFn).toBeCalled();
        })

        it(`given no callback function, doesn't throw`, () => {
            const {container,getByTestId} = render(<DrawerItem/>);
            fireEvent(getByTestId('left-icon'),'onPress');
            expect(container).toBeTruthy();
        })
    })
}

drawerItemTest();

export default drawerItemTest