import {render, fireEvent} from '@testing-library/react-native';
import Header from '../../components/Header';
import WalletCardTest from './WalletCard.test';
import ProfileAvatarTest from './ProfileAvatar.test';

describe('Header Component', () => {
    it('renders menu icon', () => {
        const {getByA11yLabel} = render(<Header/>);
        expect(getByA11yLabel('menu-icon')).toBeTruthy();
    });

    it(`given a callback via onMenuPress, calls the callback when menu icon is pressed`, () => {
        const mockFn = jest.fn();
        const {getByA11yLabel} = render(<Header onMenuPress={mockFn}/>);
        const menuIcon = getByA11yLabel('menu-icon');
        fireEvent(menuIcon,'onPress');
        expect(mockFn).toBeCalled();
    })

    
    it('renders notification icon', () => {
        const {getByA11yLabel} = render(<Header/>);
        expect(getByA11yLabel('notification-icon')).toBeTruthy();
    });

    it(`given a callback via onNotificationPress, calls the callback when bell icon is pressed`, () => {
        const mockFn = jest.fn();
        const {getByA11yLabel} = render(<Header onNotificationPress={mockFn}/>);
        const bellIcon = getByA11yLabel('notification-icon');
        fireEvent(bellIcon,'onPress');
        expect(mockFn).toBeCalled();
    })

    ProfileAvatarTest();
    it(`given a callback via onAvatarPress, calls the callback when profile avatar is pressed`, () => {
        const mockFn = jest.fn();
        const {getByA11yLabel} = render(<Header onAvatarPress={mockFn}/>);
        const avatar = getByA11yLabel('profile-icon');
        fireEvent(avatar,'onPress');
        expect(mockFn).toBeCalled();
    })

    WalletCardTest();
})