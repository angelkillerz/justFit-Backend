
const axios = require("axios").default;

const token ="eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwZTFkMjM5MDllNzZmZjRhNzJlZTA4ODUxOWM5M2JiOTg4ZjE4NDUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoic21lYWtvTCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhS3pCem9TWXFpMVJ5SWdHZUMxYlVqWUtiNkVvMUhMRTZ5VmFRVmFnPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2p1c3QtZml0LTU3ZmFiIiwiYXVkIjoianVzdC1maXQtNTdmYWIiLCJhdXRoX3RpbWUiOjE2ODQ2ODIzMDEsInVzZXJfaWQiOiJNMDFhaG1BZUVZWTdpcHpUQWZrWXR6T0RjNHMyIiwic3ViIjoiTTAxYWhtQWVFWVk3aXB6VEFma1l0ek9EYzRzMiIsImlhdCI6MTY4NDY4MjMwMSwiZXhwIjoxNjg0Njg1OTAxLCJlbWFpbCI6InByZXR5Ym95aXpAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTY4NTIyODMyOTkxNTY3MDQ2OTciXSwiZW1haWwiOlsicHJldHlib3lpekBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.OsiFxnqtULHnMs9Y-mRCMc_YXn3fH_iE4FXLXciO0DVx2poIm60iIDInusYupQd3fce6vJro3PgV2gS5LYkk0rEQln3kJjKU-KscsZ5rVtUtPOQFgqylRfOq0shJpEdzFq4XVUQdf5vdJFYYAXKU8zx1F1Gs2OYgIkXOuQzS22VbevbOuXjB4N6qvfMna9uFaU2tr7eU6kDZbiKKFYb9BvLQn7c9gsmyRomTtUEKSGALNWjT3ljk3S7Z6I7mNGI7C1KqYBXhkZ2hk3OGQARNfwL7KZzXg32wXJ-mk7rHhhyrSWuT599hRUn2viCNpQJo908KZrpR0yoePWPjbQCezw" 
// const token = `eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwZTFkMjM5MDllNzZmZjRhNzJlZTA4ODUxOWM5M2JiOTg4ZjE4NDUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vanVzdC1maXQtNTdmYWIiLCJhdWQiOiJqdXN0LWZpdC01N2ZhYiIsImF1dGhfdGltZSI6MTY4NDY2NTE1OSwidXNlcl9pZCI6ImtYZHZPNWlwTzVVUE1jUWhJUk1Wc1NrMGpOZjEiLCJzdWIiOiJrWGR2TzVpcE81VVBNY1FoSVJNVnNTazBqTmYxIiwiaWF0IjoxNjg0NjY1MTU5LCJleHAiOjE2ODQ2Njg3NTksImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.I1UpJFkA37J_SG3ar9zWJKRAIorEoJZMINa-fUDYF3hio7OWpfP40soaAr7YSKzWdAPEN86c9UZ4ESswgv9GHf9b0dGD_dqJuY2i8TQbhbEeLmP6ntteUvz9dRncKQoi4KtytlYtEzvqb6uBoGOL50jyNFtGOT41oEVyF_w8D3Yb1ywRRvAswV9hKaerOwzGWjNRrZhl87sLRPA_qen5VXrmnNcgl5H5aHkHgD5whgQ2UCZVevUX2t29hJG47RmWCTXDrBs9SSvxKbJFwLOrzEbDjv5TBlxPZYKboaA3o-S1jR9KUgpuGse5gm_mvgjnYB73DBaO3wKTSBoLg-i83g`;

const userId = `M01ahmAeEYY7ipzTAfkYtzODc4s2`;
// const userId = `kXdvO5ipO5UPMcQhIRMVsSk0jNf1`;

// const id = `6469e93346c427a8e69a680b`
const id = `6469f38a68cfb1e77e796955`

async function getStats() {
    try {
        const res = await axios.get("http://127.0.0.1:4001/api/stats", {
            headers: {
                "x-access-token": token,
                "x-user-id": userId
            }
        });
        console.log(res.data);
        console.log(res.status);
    } catch (error) {
        console.log(error);
    }
}

async function createUser() {
    const userPayload = {
        username: "test@gmail.com",
        profileImage: "no have",
        firstName: "Lolipop",
    }
    try {
        const res = await axios.post("http://127.0.0.1:4001/api/user", userPayload, {
            headers: {
                "x-access-token": token,
                "x-user-id": userId
            }
        })

        console.log(res.data);
        console.log(res.status);
    } catch (error) {
        console.log(error);
    }
}

async function updateUser() {
    try {
        const userPayload = {
            username: "pretyboyiz@gmail.com",
            profileImage: "555555555555555555555555555555",
            firstName: "Sarun",
            lastName: "Daunghirun",
            height: 200,
            weight: 80
        }

        const res = await axios.put("http://127.0.0.1:4001/api/user/" + id, userPayload, {
            headers: {
                "x-access-token": token,
                "x-user-id": userId
            }
        });

        console.log(res.data);
        console.log(res.status);
    } catch (error) {
        console.log(error);
    }
}

async function getUser() {
    try {
        const res = await axios.get("http://127.0.0.1:4001/api/user", {
            headers: {
                "x-access-token": token,
                "x-user-id": userId
            }
        })
        console.log(res.data);
        console.log(res.status);
    } catch (error) {
        console.log(error);
    }
}

async function getGoalByStatus(status) {
    try {
        const res = await axios.get("http://127.0.0.1:4001/api/goal/" + status, {
            headers: {
                "x-access-token": token,
                "x-user-id": userId
            }
        })
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}


// getGoalByStatus("done");
// getGoalByStatus("none");
// getGoalByStatus("cancel");
// getStats();
// createUser();
// updateUser();
getUser();