// class
export default class Login {
    constructor() {
        this.sessions = new Map(); // login hiisen humuusiin medeelel session ruu orno
        this.users = new Map();
    }

    verifyLogin(req, res) {
        const phone = req.body.phone, pass = req.body.password;

        // check
        if (!this.users.has(phone) || this.users.get(phone).password != pass) {
            res.status(403).end();
            return;
        }

        const sid = Math.floor(Math.random() * 100_000_000_000_000);
        this.sessions.set(sid, //Map
            {
                user: phone,
                fullname: this.users.get(phone).fullname,
                logged: Date.now()
            });
        console.log(this.sessions);

        //response
        res.status(200);
        res.cookie("session_id", sid);
        res.send({
            result: "OK",
            username: this.users.get(phone).fullname
        });

    }
}

//class-aas uusgesen object
export const login = new Login();


//     doLogin(email, pass) {

//         if (!this.users.has(email) || this.users.get(email).password != pass)
//             return { statusCode: 403 };

//         const sid = Math.floor(Math.random() * 100_000_000_000_000);
//         this.sessions.set(sid,
//             {
//                 user: email,
//                 fullname: this.users.get(email).fullname,
//                 logged: Date.now()
//             });
//         console.log(this.sessions);
//         return {
//             statusCode: 200,
//             sid: sid,
//             fullname: this.users.get(email).fullname
//         };
//     }


// }
