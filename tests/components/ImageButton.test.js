import {fireEvent, render} from '@testing-library/react-native';
import ImageButton from '../../components/ImageButton';

describe('<ImageButton/> Component', () => {
    it('should render a card with given label text', () => {
        const {getByA11yLabel} = render(<ImageButton label={"Click Me"} onPress={() => null}/>);
        expect(getByA11yLabel('label text').props.children).toBe('Click Me');
    });

    it('should apply given color to label text', () => {
        const {getByA11yLabel} = render(<ImageButton labelColor={"red"} onPress={() => null} />);
        expect(getByA11yLabel('label text').props.style.color).toBe('red');
    });

    it('should render a local image from a given resource id, to the left of the card', () => {
        const imgId = require('../../../assets/service_icons/airtime.png');
        const {getByA11yRole} = render(<ImageButton imageSrc={imgId} onPress={() => null} />);
        expect(getByA11yRole('imagebutton').props.source).toBe(imgId);
    });

    it('should render an online image from a given uri, to the left of the card', () => {
        const imgUrl = "https://via.placeholder.com/600/92c952";
        const {getByA11yRole} = render(<ImageButton imgSrc={imgUrl} onPress={() => null} />);
        expect(getByA11yRole('imagebutton').props.source.uri).toBe(imgUrl);
    });

    it('should render an icon with given name, to the right of the card', () => {
        const {getByA11yLabel} = render(<ImageButton rightIconName={"apps"} onPress={() => null} />);
        
        // access icon element through parent. direct access attempt fails (WHY!!!)
        expect(getByA11yLabel('label text wrapper').props.children[1].props.name).toBe('apps');
    });

    it('should render a default arrow icon to the right of card, when no icon name is given', () => {
        const {getByA11yLabel} = render(<ImageButton onPress={() => null} />);
        
        // access icon element through parent. direct access attempt fails (WHY!!!)
        expect(getByA11yLabel('label text wrapper').props.children[1].props.name).toBe('chevron-forward-sharp');
    });

    it('should invoke a given callback when the card is pressed', () => {
        const onPressMock = jest.fn();
        const {getByA11yRole} = render(<ImageButton onPress={onPressMock} />);
        fireEvent.press(getByA11yRole('button'));
        expect(onPressMock).toBeCalledTimes(1);
    });

    it('should apply given styles to parent container', () => {
        const {getByTestId} = render(<ImageButton containerStyle={{backgroundColor:"purple"}} onPress={() => null} />);
        expect(getByTestId('inner view wrapper').props.style.backgroundColor).toBe('purple');
    });
});