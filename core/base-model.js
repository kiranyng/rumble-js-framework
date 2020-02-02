import { Observable } from './observe.js';

/**
 * - takes care of doing service calls to load/update/delete items
 * - implements/composed of Observable and triggers change even on all the observers when ever the model changes
 */
export class BaseModel {
    observable = new Observable();

    async load(param){
        throw "load method must be implemented";
    }

    async save(){
        throw "save method must be implemented";
    }

    async delete(){
        throw "delete method must be implemented";
    }

    addObserver(observer){
        this.observable.addObserver(observer);
    }

    removeObserver(observer){
        this.observable.removeObserver(observer);
    }

    triggerChange(){
        this.observable.triggerChange();
    }

    destroy(){
        this.observable.destroy();
    }
}