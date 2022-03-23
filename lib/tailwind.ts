import styles from '../tw-rn-styles.json';
import {create} from 'tailwind-react-native-classnames';
import { TailwindFn } from '../types';

const tw:TailwindFn = create(styles) as TailwindFn;

export default tw