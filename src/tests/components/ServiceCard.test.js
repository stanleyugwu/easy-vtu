import ServiceCard from "../../components/ServiceCard";
import {render,fireEvent} from '@testing-library/react-native';

describe('UI Card for individual app service', () => {
    it('given a service name like `Airtime`, renders card with `Airtime` title', () => {
        const service = 'Airtime';
        const {getByTestId} = render(<ServiceCard title={service}/>)
        expect(getByTestId('service-title').children[0]).toBe(service);
    });
    it('given no `title` prop, renders `MORE` as title', () => {
        expect(render(<ServiceCard/>).getByTestId('service-title').children[0]).toBe('MORE')
    });
    it('given a function via `onPress` prop, calls that function when card is pressed', () => {
        const onPressFn = jest.fn();
        const {getByA11yRole} = render(<ServiceCard onPress={onPressFn}/>)
        const touchable = getByA11yRole('button');
        fireEvent(touchable,'onPress');
        expect(onPressFn).toBeCalled();
    })
    it('given resource id of an image via `source` prop, loads that image as service icon', () => {
        const resourceId = require('../../../assets/logo.png');
        const {getByTestId} = render(<ServiceCard source={resourceId}/>);
        const image = getByTestId('service-image');
        expect(image.props.source).toBe(resourceId);
    })
})