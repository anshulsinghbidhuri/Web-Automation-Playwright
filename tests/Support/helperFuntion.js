
export function genrateRandomEmail() {
   return `${crypto.randomUUID()}@gmail.com`;
}

export function genrateRandomUsername() {
    const randomUsername = Math.random().toString(36).substring(2, 10);
    return randomUsername;
}

export function genrateMobileNumber() {
    const firstDigit = ['7', '8', '9'][
        Math.floor(Math.random() * 3)
    ];
    const remainingDigits = Math.floor(
        100000000 + Math.random() * 900000000
    );
    return firstDigit + remainingDigits;
}
