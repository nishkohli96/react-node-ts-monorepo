import { makeAutoObservable } from 'mobx';

class Doubler {
	/* Prefer initializing the counterValue */
	counterValue = 0;

	constructor() {
		const existingStore = localStorage.getItem('counter');

		if (existingStore) {
			this.counterValue = +existingStore;
		}

		/*  Just write makeAutoObservable(this) if importing makeAutoObservable from mobx.
            It will itself infer the types */
		makeAutoObservable(this);
	}

	get double() {
		return this.counterValue * 2;
	}

	doubleNum() {
		this.counterValue *= 2;
		localStorage.setItem('counter', this.counterValue.toString());
	}

	increment() {
		this.counterValue++;
		localStorage.setItem('counter', this.counterValue.toString());
	}

	/* Can use a fn like this if your observable changes by an API call */
	// async addItem({ _id }) {
	//     try {
	//       const response = await ItemService({ _id });
	//       if (response.success) {
	//         this.itemUpdate = response;
	//       }
	//     } catch (err) {
	//       return;
	//     }
	//   }
}

export default Doubler;
