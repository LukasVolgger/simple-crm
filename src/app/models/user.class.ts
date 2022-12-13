export class User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    createdAt: number;

    constructor(obj: any) {
        this.uid = obj ? obj.uid : '';
        this.email = obj ? obj.email : '';
        this.displayName = obj ? obj.displayName : '';
        this.photoURL = obj ? obj.photoURL : '';
        this.emailVerified = obj ? obj.emailVerified : '';
        this.createdAt = obj ? obj.metadata.createdAt : '';
    }

    /**
     * Converts a user object into a JSON
     * @returns JSON
     */
    public userToJSON() {
        return {
            uid: this.uid,
            email: this.email,
            displayName: this.displayName,
            photoURL: this.photoURL,
            emailVerified: this.emailVerified,
            createdAt: this.createdAt,
        }
    }
}