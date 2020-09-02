import firebase from 'firebase';

export class Auth {
    constructor(email, password) {
        if(Auth.isAuth) {
            return Auth.instance;
        }

        this.base = firebase.auth();
        this.email = email;
        this.password = password;

        Auth.instance = this;
    }

    async signup() {
        try {
            const res = await this.base.createUserWithEmailAndPassword(this.email, this.password);
        
            return res;
        }
        catch(err) {
            console.log(err);

            if(err.code) {
                return err;
            }
        }
    }   

    async login() {
        try {
            const res = await this.base.signInWithEmailAndPassword(this.email, this.password);

            return res.user;
        }
        catch(err) {
            console.log(err);

            if(err.code) {
                return err;
            }
        }
    }

    async withToken(token) {
        try {
            const res = await this.base.signInWithCustomToken(token);

            console.log(res);

            return res.user;
        }
        catch(err) {
            console.log(err);

            if(err.code) {
                return err;
            }
        }
    }
}