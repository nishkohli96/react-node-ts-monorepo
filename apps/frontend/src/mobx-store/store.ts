import { configure } from 'mobx';
import Doubler from './doubler.store';

/* Import all stores here */
class RootStore {
	doubler = new Doubler();

	constructor() {
		configure({
			enforceActions: 'never',
		});
	}
}

export default RootStore;
