import {render} from '@testing-library/react-native';
import Services from '../../components/Services';

describe('Services component', () => {
    it('renders 6 cards representing app services', () => {
        const {getAllByTestId,} = render(<Services/>);
        const allTitles = getAllByTestId('service-title');
        expect(allTitles).toHaveLength(6)
    })
})