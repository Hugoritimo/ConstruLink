interface User {
    username: string;
    password: string;
    passwordTemporary: boolean;
}

const users: User[] = [];

export const addUser = (user: User) => {
    users.push(user);
};

export const findUserByUsername = (username: string) => {
    return users.find(user => user.username === username);
};

export const updateUserPassword = (username: string, newPassword: string) => {
    const user = findUserByUsername(username);
    if (user) {
        user.password = newPassword;
        user.passwordTemporary = false;
    }
};
