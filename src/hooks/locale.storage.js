export class LocalStorage {
    ls = localStorage;

    set(name, value) {
        this.ls.setItem(name, JSON.stringify(value));
    }

    get(name) {
        let value = this.ls.getItem(name);

        if(value === "undefined" || !value) value = '{}';

        const res = JSON.parse(value);

        return res;
    }

    delete(name) {
        this.ls.removeItem(name);
    }
}