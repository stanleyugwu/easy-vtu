import {render, fireEvent} from '@testing-library/react-native';
import Header from '../../components/Header';
import WalletCardTest from './WalletCard.test';
import ProfileAvatarTest from './ProfileAvatar.test';

describe('Header Component', () => {
    it('renders menu icon', () => {
        const {getByA11yLabel} = render(<Header/>);
        expect(getByA11yLabel('menu-icon')).toBeTruthy();
    });

    it('renders notification icon', () => {
        const {getByA11yLabel} = render(<Header/>);
        expect(getByA11yLabel('notification-icon')).toBeTruthy();
    });

    ProfileAvatarTest();
    WalletCardTest();
})