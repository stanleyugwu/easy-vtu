import {render} from '@testing-library/react-native';
import ProfileAvatar from '../../components/ProfileAvatar.js';

describe('Profile Avatar Component', () => {
    const text = 'Hello There!';
    const imageUrl = "https://via.placeholder.com/600/92c952";

    it(`given image uri and '${text}' as props, render avatar image, with '${text}' beside it`, () => {
        const {getByA11yRole, getByA11yLabel} = render(<ProfileAvatar imageUrl={imageUrl} text={text}/>);
        const image = getByA11yLabel('avatar-image');
        const textComp = getByA11yRole('text');
        expect(image.props.children[1].props.source.uri).toBe(imageUrl);
        expect(textComp.children[0]).toBe(text);
    });

    it(`given no image uri, render default icon image, with '${text}' beside it`, () => {
        const {getByA11yRole} = render(<ProfileAvatar text={text}/>);
        const image = getByA11yRole('imagebutton');
        const textComp = getByA11yRole('text');
        expect(image.props.children.props.source).toBe('account');
        expect(textComp.children[0]).toBe(text);
    });

    it(`given no text prop, renders 'Hello, Welcome' as default text`, () => {
        const defaultText = 'Hello, Welcome';
        const {getByA11yRole} = render(<ProfileAvatar imageUrl={imageUrl}/>);
        const image = getByA11yRole('imagebutton');
        const textComp = getByA11yRole('text');
        expect(image.props.children[1].props.source.uri).toBe(imageUrl);
        expect(textComp.children[0]).toBe(defaultText);
    })
})