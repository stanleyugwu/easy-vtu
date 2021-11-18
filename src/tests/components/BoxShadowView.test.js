import { render } from "@testing-library/react-native";
import BoxShadowView from '../../components/BoxShadowView';

describe("<BoxShadow/> Component", () => {
  it("should render a `View` wrapper component with box-shadow", () => {
    const { getByA11yLabel } = render(<BoxShadowView children="HELLO" />);
    expect(getByA11yLabel("BoxShadowView component wrapper").props.style).toContainEqual({
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    });
  });

  it('should render given children', () => {
      const {getByA11yLabel} = render(<BoxShadowView children={'HELLO'}/>);
      expect(getByA11yLabel('BoxShadowView component wrapper').props.children).toBe('HELLO')
  });

  it('should apply given style to its wrapper component', () => {
    const {getByA11yLabel} = render(<BoxShadowView containerStyle={{backgroundColor:"red"}} children="HELLO" />);
    expect(getByA11yLabel("BoxShadowView component wrapper").props.style).toContainEqual({
      backgroundColor:'red'
    })
  });
});
