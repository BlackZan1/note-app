import firebase from 'firebase';

import { randomID } from '../utils/randomID';

export class Auth {
    constructor(email, password) {
        if(Auth.isAuth) {
            return Auth.instance;
        }

        this.base = firebase.auth();
        this.ref = firebase.storage().ref();
        this.email = email;
        this.password = password;

        Auth.instance = this;
    }

    async signup(imgFile) {
        try {
            const res = await this.base.createUserWithEmailAndPassword(this.email, this.password);
        
            console.log(res);

            const res2 = await this.login();

            let imgUrl = 'https://banffventureforum.com/wp-content/uploads/2019/08/No-Image.png';

            if(!!imgFile) {
                const fileDist = this.ref.child(`users/${randomID(10)}`);
                await fileDist.put(imgFile);

                imgUrl = await fileDist.getDownloadURL();
            }

            await this.base.currentUser.updateProfile({
                photoURL: imgUrl
            })

            return res2;
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

            console.log(res)

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