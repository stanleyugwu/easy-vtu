import {render,fireEvent} from '@testing-library/react-native';
import Drawer from '../../components/Drawer';

const drawerTest = () => {
    describe('Drawer Component', () => {
        it('given an image uri, renders drawer having an avatar with uri', () => {
            const avatarUri = "https://via.placeholder.com/600/92c952";
            const {getByA11yLabel} = render(<Drawer avatarUri={avatarUri}/>);
            const image = getByA11yLabel('profile image');
            expect(image.props.children[1].props.source.uri).toBe(avatarUri);
        });
    
        it('given no image uri, renders a drawer having an avatar with default icon', () => {
            const {getByA11yLabel} = render(<Drawer/>);
            const image = getByA11yLabel('profile image');
            expect(image.props.children.props.source).toBe('account');
        });

        it(`given a callback via onAvatarPress, calls the callback when the avatar image is pressed`, () => {
            const mockFn = jest.fn();
            const {getByA11yLabel} = render(<Drawer onAvatarPress={mockFn}/>);
            const image = getByA11yLabel('profile image');
            fireEvent(image,'onPress');
            expect(mockFn).toBeCalled();
        })
    
        it(`given 'showAvatar' as false renders a drawer with no avatar`, () => {
            const {queryByA11yLabel} = render(<Drawer showAvatar={false}/>);
            const image = queryByA11yLabel('profile image');
            expect(image).toBeFalsy();
        });
    
        it('given a header title, renders the title at the top of the drawer', () => {
            const titleText = "Stanley Ugwu";
            const {getByA11yLabel} = render(<Drawer headerTitle={titleText}/>);
            const title = getByA11yLabel(`account name`);
            expect(title.props.children).toBe(titleText);
        });
    
        it(`given no header title, renders default text at the top of the drawer`, () => {
            const defaultText = "Welcome";
            const {getByA11yLabel} = render(<Drawer/>);
            const title = getByA11yLabel(`account name`);
            expect(title.props.children).toBe(defaultText);
        });
    
        it('given a header subTitle, renders the subTitle under headerTitle', () => {
            const titleText = "Stanley Ugwu";
            const {getByA11yLabel} = render(<Drawer headerSubTitle={titleText}/>);
            const subTitle = getByA11yLabel(`account email`);
            expect(subTitle.props.children).toBe(titleText);
        });
    
        it(`given no header subTitle, renders default text under headerTitle`, () => {
            const defaultText = "easyVtu";
            const {getByA11yLabel} = render(<Drawer/>);
            const subTitle = getByA11yLabel(`account email`);
            expect(subTitle.props.children).toBe(defaultText);
        });
    
    
        it(`given upperItems as an array of objects having 'iconName','onPress','label' key, renders upper the drawer, 'DrawerItem' components`, () => {
            const items = [{iconName:'home',label:'Home Here',onPress:() => null}];
            const {getByA11yLabel} = render(<Drawer upperItems={items}/>);
            expect(getByA11yLabel('Home Here menu link')).toBeTruthy();
        });
    
        it(`given no or invalid upperItems prop, renders 'DrawerItem' component with 'home' label`, () => {
            const {getByA11yLabel} = render(<Drawer/>);
            expect(getByA11yLabel('home menu link')).toBeTruthy();//assert from DrawerItem instilled label
        });
    
    
        it(`given lowerItems as an array of objects having 'iconName','onPress','label' key, renders lower the drawer, 'DrawerItem' components`, () => {
            const items = [{iconName:'home',label:'Home Here',onPress:() => null}];
            const {getByA11yLabel} = render(<Drawer lowerItems={items}/>);
            expect(getByA11yLabel('home menu link')).toBeTruthy();
        });
    })
}

drawerTest();

export default drawerTest