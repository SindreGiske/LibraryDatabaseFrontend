export type Loan = {
    id: string;
    author: string;
    title: string;
    username: string;
    borrowTime: string;
    returnTime?: string;
    active?: boolean;
}