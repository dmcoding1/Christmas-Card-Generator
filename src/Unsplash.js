import Unsplash from 'unsplash-js';
import {apiKey} from './keys';

const unsplash = new Unsplash({ accessKey: apiKey });

export default unsplash;